import react, { useEffect } from 'react';
import styles from './Exercises.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getExercisesList } from './ExercisesSlice';
import { changeActiveExercise } from './ExercisesSlice';

/*
    # Create new exercise
        - Add exercise in state and database
    # History button
        - onclick change (global) state for ExerciseHistory component 
    # Edit button 
        - will allow you to change the name of the exercise in the app and in the database
*/


export const Exercises = () => {
    const dispatch = useDispatch();

    const exercises = useSelector(state => state.exercises.exercisesList);
    const [exerciseName, setExerciseName] = useState("");

    //get exercises and set first index as active element when component mounts
    const getExercises = async () => {
        const exercises = await fetch("http://localhost:8080/myExercises");
        const jsonExercises = await exercises.json();

        dispatch(getExercisesList(jsonExercises));
        dispatch(changeActiveExercise(jsonExercises[0]));
    }

    useEffect(() => {
        getExercises();
    }, []);


    //change input when typing
    const handleChange = (event) => {
        setExerciseName(event.target.value);
    }


    //add exercise to database when pressing "Create new ex."
    const handleSubmit = (event) => {
        fetch("http://localhost:8080/myExercises", {
            method: 'POST',
            body: JSON.stringify({ "name": exerciseName }),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(jsonRes => dispatch(getExercisesList(jsonRes)));

        event.preventDefault();
        setExerciseName("");
    }


    //change active exercise to show its history
    const handleClick = (newExercise) => {
        dispatch(changeActiveExercise(newExercise));
    }



    return (
        <section className={styles.exercises}>
            <div className={styles.createNew}>
                <form onSubmit={handleSubmit}>
                    <label for="newExercise">New exercise name:</label>
                    <br />
                    <input type="text" value={exerciseName} onChange={handleChange} id="newExercise" />
                    <br />
                    <input type="submit" value="Create new exercise" className={styles.submitButton} />
                </form>
            </div>

            {
                exercises.map(exercise => (
                    <div className={styles.individualExercises}>
                        <h2>{exercise.name}</h2>
                        <div>
                            <button className={styles.historyButton}
                                onClick={() => handleClick(exercise)}>History</button>
                            <button className={styles.editButton}>Edit</button>
                        </div>
                    </div>
                ))
            }

        </section>
    );
}