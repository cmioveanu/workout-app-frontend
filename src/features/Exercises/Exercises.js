import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Exercises.module.css';

import { getExercisesList, changeActiveExercise, toggleEditExercisesShow } from './ExercisesSlice';

import { Edit } from './Edit';


export const Exercises = () => {
    const dispatch = useDispatch();

    const exercises = useSelector(state => state.exercises.exercisesList);
    const [newExerciseName, setNewExerciseName] = useState("");
    const [exerciseToEdit, setExerciseToEdit] = useState(null);


    //change new exercise name when typing
    const handleChange = (event) => {
        setNewExerciseName(event.target.value);
    }


    //add exercise to database when pressing "Create new ex."
    const handleSubmit = (event) => {
        fetch("https://hit-workout-app-backend.herokuapp.com/api/exercises", {
            method: 'POST',
            body: JSON.stringify({ "name": newExerciseName }),
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json())
          .then(jsonRes => dispatch(getExercisesList(jsonRes)));

        event.preventDefault();
        setNewExerciseName("");
    }


    //change active exercise to show its history
    const handleClick = (newExercise) => {
        dispatch(changeActiveExercise(newExercise));
    }


    //display or hide the modal with the right exercise
    const handleEditClick = (exerciseForEdit) => {
        setExerciseToEdit(exerciseForEdit);
        dispatch(toggleEditExercisesShow());
    }


    return (
        <section className={styles.exercises}>
            <div className={styles.createNew}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="newExercise">New exercise name:</label>
                    <br />
                    <input type="text" value={newExerciseName} onChange={handleChange} id="newExercise" />
                    <br />
                    <input type="submit" value="Create new exercise" className={styles.submitButton} />
                </form>
            </div>



            {   /* Map exercises from global state for display */
                exercises.map(exercise => (
                    <div key={exercise.id}>
                        <div className={styles.individualExercises}>
                            <h2>{exercise.name}</h2>
                            <div>
                                <button className={styles.historyButton}
                                    onClick={() => handleClick(exercise)}>History</button>
                                <button className={styles.editButton} onClick={() => handleEditClick(exercise)}>Edit</button>
                            </div>
                        </div>
                    </div>
                ))
            }


            {/* Edid component as modal, with the ID of the exercise
                that needs to be edited/deleted in the database */}
            <Edit exerciseToEdit={exerciseToEdit} />

        </section>
    );
}