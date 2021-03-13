import react, { useEffect } from 'react';
import styles from './ExerciseHistory.module.css';
import { useState } from 'react';
import {useSelector} from 'react-redux';


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
    //const listOfExercises = ["Pushups", "Pullups", "Hanging leg raises", "Nordic curls"];

    const listOfExercises = useSelector(state => state.exercises.exercisesList);

    const [numberOfHistoryRows, setNumberOfHistoryRows] = useState(10);
    const [exerciseHistory, setExerciseHistory] = useState([]);

    const baseUrl = "http://localhost:8080/myExercises/";

    const fetchExerciseHistory = async (event) => {
        const exerciseName = event.target.value;
        const exerciseId = listOfExercises.find(exercise => exercise.name === exerciseName).id;

        const fetchUrl = baseUrl + `${exerciseId}` + `/${numberOfHistoryRows}`;

        const exerciseHistoryResults = await fetch(fetchUrl);
        const jsonExerciseHistoryResults = await exerciseHistoryResults.json();
        console.log(jsonExerciseHistoryResults);
        setExerciseHistory(jsonExerciseHistoryResults);
    };



    return (
        <section className={styles.exerciseHistory}>
            <select name="exercise" onChange={fetchExerciseHistory}>
                {
                    listOfExercises.map(item => (
                        <option value={item.name}>{item.name}</option>
                    ))
                }
            </select>
            <p className={styles.description}>Select a different exercise to see its history</p>

            <div>
                {
                    exerciseHistory.map(historyItem => (
                        <div className={styles.historyItem}>
                            <p className={styles.date}>{historyItem.date}</p>
                            <p className={styles.timeAndNegative}>Time under load: <span>{historyItem.timeUnderLoad}s</span></p>
                            <p className={styles.timeAndNegative}>Negatives: <span>{historyItem.negatives}</span></p>
                        </div>
                    ))
                }
            </div>
            <button>Load more</button>
        </section>
    );
}