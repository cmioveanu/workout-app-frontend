import react from 'react';
import styles from './Exercises.module.css';

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
    return (
        <section className={styles.exercises}>
            <div className={styles.createNew}>
                <label for="newExercise">New exercise name:</label>
                <br />
                <input type="text" id="newExercise"></input>
                <br />
                <button>Create new exercise</button>
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