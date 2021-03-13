import react from 'react';
import styles from './Exercises.module.css';
import { useState } from 'react';

/*
    # Create new exercise
        - Add exercise in state and database
    # History button
        - onclick change (global) state for ExerciseHistory component 
    # Edit button 
        - will allow you to change the name of the exercise in the app and in the database
*/


export const Exercises = () => {
    const exercises = ["Pushups", "Pullups", "Hanging leg raises", "Nordic curls"];
    const [exerciseName, setExerciseName] = useState("");

    const handleChange = (event) => {
        setExerciseName(event.target.value);
        console.log(exerciseName);
    }

    const handleSubmit = (event) => {
        fetch("http://localhost:8080/myExercises", {
            method: 'POST',
            body: JSON.stringify({"name": exerciseName}),
            headers: {
                "content-type": "application/json"
            }
        });
        event.preventDefault();
    }



    return (
        <section className={styles.exercises}>
            <div className={styles.createNew}>
                <form onSubmit={handleSubmit}>
                    <label for="newExercise">New exercise name:</label>
                    <br />
                    <input type="text" value={exerciseName} onChange={handleChange} id="newExercise"/>
                    <br />
                    <input type="submit" value="Create new exercise" className={styles.submitButton}/>
                </form>
            </div>

            {
                exercises.map(exercise => (
                    <div className={styles.individualExercises}>
                        <h2>{exercise}</h2>
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