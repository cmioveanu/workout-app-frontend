import { useEffect, useState } from 'react';
import styles from './History.module.css';

import { dateConverter } from '../../utils/helpers';


export const History = () => {
    const [numberOfHistoryRows, setNumberOfHistoryRows] = useState(10);
    const [routineHistory, setRoutineHistory] = useState([]);
    const [datesNamesHistory, setDatesNamesHistory] = useState([]);


    //get the history of the Routine when component is mounted
    useEffect(() => {
        const fetchRoutineHistory = async () => {
            const baseUrl = "http://localhost:8080/myRoutines/";

            const fetchUrl = baseUrl + "history/" + numberOfHistoryRows;

            const routineHistoryResults = await fetch(fetchUrl);
            const jsonRoutineHistoryResults = await routineHistoryResults.json();

            setRoutineHistory(jsonRoutineHistoryResults);
        };

        fetchRoutineHistory();
    }, [numberOfHistoryRows]);


    //extract the workout dates and names into a separate array for sorting/grouping
    useEffect(() => {

        //make a list of all dates
        let dates = routineHistory.map(routine => routine.date);

        //filter out duplicates
        let filteredRoutineDatesNames = routineHistory.filter(({ date }, index) => !dates.includes(date, index + 1))

        setDatesNamesHistory(filteredRoutineDatesNames);
    }, [routineHistory]);


    //Load more history items when pressing "Load more"
    const loadMoreHistory = () => {
        setNumberOfHistoryRows(previous => previous + 10);
    }


    //filter history exercises by date
    const displayRoutineExercises = (workoutDate) => {
        return routineHistory.filter(exercise => exercise.date === workoutDate);
    }

    console.log(routineHistory);
    //remove dates that don't have any exercises corresponding


    return (
        <section className={styles.routineHistory}>

            <p>{routineHistory.length === 0 ? "No history available." : null}</p>
            {
                datesNamesHistory.map(dateName => (
                    /* Take the RoutineHistory from local state and map it for display*/
                    <div key={datesNamesHistory.indexOf(dateName)}>
                        <h3 className={styles.historyDate}>{dateConverter(dateName.date)}</h3>
                        <h2 className={styles.historyName}>{dateName.name}</h2>
                        {
                            //Filter exercises by date and display
                            displayRoutineExercises(dateName.date).map(historyItem => (
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
            {datesNamesHistory.length > 10 ? <button onClick={loadMoreHistory}>Load more history</button> : null}
        </section >
    );
}