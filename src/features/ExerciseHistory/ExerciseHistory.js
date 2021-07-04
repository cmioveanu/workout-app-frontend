import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ExerciseHistory.module.css';

import { dateConverter } from '../../utils/helpers';


export const ExerciseHistory = () => {
    const activeExercise = useSelector(state => state.exercises.activeExercise);
    const [numberOfHistoryRows, setNumberOfHistoryRows] = useState(10);
    const [exerciseHistory, setExerciseHistory] = useState([]);


    //get the history of the exercise when component is mounted
    useEffect(() => {
        const fetchExerciseHistory = async () => {
            const baseUrl = "https://full-stack-e-commerce-backend.herokuapp.com/api/exercises/";
            const fetchUrl = baseUrl + activeExercise.id + `/${numberOfHistoryRows}`;

            const exerciseHistoryResults = await fetch(fetchUrl);
            const jsonExerciseHistoryResults = await exerciseHistoryResults.json();

            setExerciseHistory(jsonExerciseHistoryResults);
        };

        fetchExerciseHistory();

    }, [activeExercise, numberOfHistoryRows]);


    //Load more history items when pressing "Load more"
    const loadMoreHistory = () => {
        setNumberOfHistoryRows(previous => previous + 10);
    }


    return (
        <section className={styles.exerciseHistory}>

            {/* Display the activateExercise from global state into the section heading */}
            <h2 className={styles.exerciseHistoryTitle}>{activeExercise.name}</h2>
            <p className={styles.description}>Click exercise history to see past entries</p>
            <p>{exerciseHistory.length === 0 ? "No history available." : null}</p>

            {/* Take the exerciseHistory from local state and map it for display*/}
            <div>
                {
                    exerciseHistory.map(historyItem => (
                        <div className={styles.historyItem} key={historyItem.date}>
                            <p className={styles.date}>{dateConverter(historyItem.date)}</p>
                            <p className={styles.timeAndNegative}>Time under load: <span>{historyItem.time_under_load}s</span></p>
                            <p className={styles.timeAndNegative}>Negatives: <span>
                                {/* add space when negatives < 10 for display purposes */}
                                {historyItem.negatives < 10 ? <span className={styles.spanPadding}></span> : null}
                                {historyItem.negatives}</span>
                            </p>
                        </div>
                    ))
                }
            </div>
            {exerciseHistory.length > 10 ? <button onClick={loadMoreHistory}>Load more history</button> : null}
        </section>
    );
}