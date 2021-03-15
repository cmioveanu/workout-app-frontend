import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Routines.module.css';

import { getExercisesList, changeActiveExercise, toggleEditExercisesShow } from './RoutinesSlice';

import { Edit } from './Edit';




export const Routines = () => {
    const dispatch = useDispatch();

    const exercises = useSelector(state => state.exercises.exercisesList);
    const [newExerciseName, setNewExerciseName] = useState("");
    const [exerciseToEdit, setExerciseToEdit] = useState(null);


    //get exercises and set first index as active element when component mounts
    useEffect(() => {
        const getExercises = async () => {
            const exercises = await fetch("http://localhost:8080/myExercises");
            const jsonExercises = await exercises.json();

            dispatch(getExercisesList(jsonExercises));
            dispatch(changeActiveExercise(jsonExercises[0]));
        };

        getExercises();
    }, [dispatch]);


    //change new exercise name when typing
    const handleChange = (event) => {
        setNewExerciseName(event.target.value);
    }


    //add exercise to database when pressing "Create new ex."
    const handleSubmit = (event) => {
        fetch("http://localhost:8080/myExercises", {
            method: 'POST',
            body: JSON.stringify({ "name": newExerciseName }),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(jsonRes => dispatch(getExercisesList(jsonRes)));

        event.preventDefault();
        setNewExerciseName("");
    }


    //change active exercise to show its history
    const handleClick = (newExercise) => {
        dispatch(changeActiveExercise(newExercise));
    }


    //display or hide the modal with the right exercise
    const handleEditClick = (IDOfExerciseToEdit) => {
        setExerciseToEdit(IDOfExerciseToEdit);
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