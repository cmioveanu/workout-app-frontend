import react, { useEffect } from 'react';
import styles from './ExerciseHistory.module.css';
import { useState } from 'react';


/*  
    # Fetch list of exercise on component mount
    - useEffect for fetching exercise and workout lists in <App /> component,
      store them in global state(Work out and Routines page uses them as well)
    - display exercises in a <select> tag

    # Fetch history of an exercise
    - when selecting the exercise from the dropdown, use its value in the fetch request (onchange)
    - add history to local state
    - take history from state and map for display

    - exerciseHistory format:
    [
        {
        date: "date",
        timeUnderLoad: 45,
        negatives: 10
        },
    ]

    # Load more history
    - load 10 rows initially
    - each button press loads 10 more
    - button press increases LIMIT by 10 in local state (numberOfHistoryRows)
*/


export const ExerciseHistory = () => {
    const listOfExercises = ["Pushups", "Pullups", "Hanging leg raises", "Nordic curls"];
    const [numberOfHistoryRows, setNumberOfHistoryRows] = useState(10);
    const [exerciseHistory, setExerciseHistory] = useState([
        {
        date: "21 March 2020",
        timeUnderLoad: 45,
        negatives: 10
        },
    ]);

    const baseUrl = "http://localhost:8080/";

    const fetchExerciseHistory = async (selectedExercise) => {
        const fetchUrl = baseUrl + selectedExercise + `number=${numberOfHistoryRows}`;
        const exerciseHistoryResults = await fetch(fetchUrl);
        setExerciseHistory(exerciseHistoryResults);
    };

    return (
        <section>
            <h2>
                <select name="exercise" onchange={() => fetchExerciseHistory(this.value)}>
                    {
                        listOfExercises.map(item => (
                            <option value={item}>{item}</option>
                        ))
                    }
                </select>
            </h2>
            <p>Select a different exercise to see its history</p>

            <div>
                {
                    exerciseHistory.map(historyItem => (
                        <div className={styles.historyItem}>
                            <p className={styles.exerciseDate}>{historyItem.date}</p>
                            <p>Time under load: {historyItem.timeUnderLoad}</p>
                            <p>Negatives: {historyItem.negatives}</p>
                        </div>
                    ))
                }
            </div>
            <button>Load more</button>
        </section>
    );
}