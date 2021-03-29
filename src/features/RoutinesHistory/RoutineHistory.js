import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './RoutineHistory.module.css';

import { dateConverter } from '../../utils/helpers';


export const RoutineHistory = () => {
    const activeRoutine = useSelector(state => state.routines.activeRoutine);

    const [numberOfHistoryRows, setNumberOfHistoryRows] = useState(10);
    const [routineHistory, setRoutineHistory] = useState([]);
    const [datesHistory, setDatesHistory] = useState([]);


    //get the history of the Routine when component is mounted
    useEffect(() => {
        const fetchRoutineHistory = async () => {
            const baseUrl = "api/routines/";
            const fetchUrl = baseUrl + activeRoutine.id + `/${numberOfHistoryRows}`;

            const routineHistoryResults = await fetch(fetchUrl);
            const jsonRoutineHistoryResults = await routineHistoryResults.json();

            setRoutineHistory(jsonRoutineHistoryResults);
        };

        fetchRoutineHistory();
    }, [activeRoutine, numberOfHistoryRows]);


    //extract the workout dates into a separate array for sorting
    useEffect(() => {
        setDatesHistory([]);
        routineHistory.forEach(routine => {
            if (routine.name === activeRoutine.name) {
                setDatesHistory(oldHistory => [...oldHistory, routine.date]);
            }
        });

        //remove duplicates from dates array
        setDatesHistory(dates => [...new Set(dates)]);
    }, [routineHistory, activeRoutine]);


    //Load more history items when pressing "Load more"
    const loadMoreHistory = () => {
        setNumberOfHistoryRows(previous => previous + 10);
    }


    //filter history exercises by date
    const displayRoutineExercises = (workoutDate) => {
        return routineHistory.filter(exercise => exercise.date === workoutDate);
    }


    return (
        <section className={styles.routineHistory}>

            {/* Display the activateRoutine from global state into the section heading */}
            <h2 className={styles.routineHistoryTitle}>{activeRoutine.name}</h2>
            <p className={styles.description}>Click routine history to see past entries</p>
            <p>{datesHistory.length === 0 ? "No history available." : null}</p>
            {
                datesHistory.map(date => (
                    /* Take the RoutineHistory from local state and map it for display*/
                    <div key={datesHistory.indexOf(date)}>
                        <h2 className={styles.historyDate}>{dateConverter(date)}</h2>
                        {
                            //Filter exercises buy date and display
                            displayRoutineExercises(date).map(historyItem => (
                                <div className={styles.historyItem} key={historyItem.date + historyItem.exercise}>
                                    <p className={styles.exercise}>{historyItem.exercise}</p>

                                    <div className={styles.exerciseStats}>
                                        <p className={styles.timeAndNegative}>Time under load: <span>
                                            {historyItem.time_under_load}s</span>
                                        </p>

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
                ))
            }
            {datesHistory.length > 10 ? <button onClick={loadMoreHistory}>Load more history</button> : null}
        </section >
    );
}