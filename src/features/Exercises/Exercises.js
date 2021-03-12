import react from 'react';
import styles from './Exercises.module.css';

export const Exercises = () => {
    const exercises = ["Pushups", "Pullups", "Hanging leg raises", "Nordic curls"];
    return (
        <section>
            <label for="newExercise">New exercise name:</label>
            <br />
            <input type="text" id="newExercise" placeholder="New exercise name"></input>
            <br />
            <button>Create new exercise</button>

            {
                exercises.map(exercise => (
                    <div className={styles.individualExercises}>
                        <h2>{exercise}</h2>
                        <div>
                            <button>History</button>
                            <button>Edit</button>
                        </div>
                    </div>
                ))
            }

        </section>
    );
}