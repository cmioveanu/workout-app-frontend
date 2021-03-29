import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ExerciseHistory.module.css';


export const ExerciseHistory = () => {
    const activeExercise = useSelector(state => state.exercises.activeExercise);
    const [numberOfHistoryRows, setNumberOfHistoryRows] = useState(10);
    const [exerciseHistory, setExerciseHistory] = useState([]);


    //get the history of the exercise when component is mounted
    useEffect(() => {
        const fetchExerciseHistory = async () => {
            const baseUrl = "/api/exercises/";
            const fetchUrl = baseUrl + activeExercise.id + `/${numberOfHistoryRows}`;

            const exerciseHistoryResults = await fetch(fetchUrl);
            const jsonExerciseHistoryResults = await exerciseHistoryResults.json();

            setExerciseHistory(jsonExerciseHistoryResults);
        };

        fetchExerciseHistory();
    }, [activeExercise, numberOfHistoryRows]);


    //convert date from database string to a better display format
    const dateConverter = (exerciseDate) => {
        const monthsArray = [null, "January", "February", "March", "April",
            "May", "June", "July", "August", "September", "November", "December"];

        const year = exerciseDate.slice(0, 4);
        const day = exerciseDate.slice(8, 10);

        let month = exerciseDate.slice(5, 7);
        if (month.charAt(0) === "0") month = month.charAt(1);
        month = monthsArray[month];

        return `${day} ${month} ${year}`;
    }


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
                            <div className={styles.exerciseStats}>
                                <p className={styles.timeAndNegative}>Time under load: <span>{historyItem.time_under_load}s</span></p>
                                <p className={styles.timeAndNegative}>Negatives: <span>
                                    {/* add space when negatives < 10 for display purposes */}
                                    {historyItem.negatives < 10 ? <span className={styles.spanPadding}></span> : null}
                                    {historyItem.negatives}</span>
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
            {exerciseHistory.length > 10 ? <button onClick={loadMoreHistory}>Load more history</button> : null}
        </section>
    );
}