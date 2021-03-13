import react, { useEffect } from 'react';
import styles from './Exercises.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getExercisesList } from './ExercisesSlice';

/*
    # Create new exercise
        - Add exercise in state and database
    # History button
        - onclick change (global) state for ExerciseHistory component 
    # Edit button 
        - will allow you to change the name of the exercise in the app and in the database
*/


export const Exercises = () => {
    //const exercises = ["Pushups", "Pullups", "Hanging leg raises", "Nordic curls"];
    const dispatch = useDispatch();
    const exercises = useSelector(state => state.exercises.exercisesList);
    const [exerciseName, setExerciseName] = useState("");

    const getExercises = async () => {
        const exercises = await fetch("http://localhost:8080/myExercises");
        const jsonExercises = await exercises.json();

        dispatch(getExercisesList(jsonExercises));
    }

    useEffect(() => {
        getExercises();
    }, []);

    const handleChange = (event) => {
        setExerciseName(event.target.value);
    }

    const handleSubmit = (event) => {
        fetch("http://localhost:8080/myExercises", {
            method: 'POST',
            body: JSON.stringify({ "name": exerciseName }),
            headers: {
                "content-type": "application/json"
        }})
        .then(res => res.json())
        .then(jsonRes => dispatch(getExercisesList(jsonRes)));
        
        event.preventDefault();

        setExerciseName("");
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
                            <button className={styles.historyButton}>History</button>
                            <button className={styles.editButton}>Edit</button>
                        </div>
                    </div>
                ))
            }

        </section>
    );
}