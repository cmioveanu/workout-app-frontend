import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './RoutineHistory.module.css';


export const RoutineHistory = () => {
    const activeRoutine = useSelector(state => state.routines.activeRoutine);
    const [numberOfHistoryRows, setNumberOfHistoryRows] = useState(10);
    const [routineHistory, setRoutineHistory] = useState([]);


     //get the history of the Routine when component is mounted
    useEffect(() => {
        const fetchRoutineHistory = async () => {
            const baseUrl = "http://localhost:8080/myRoutines/";
    
            const fetchUrl = baseUrl + activeRoutine.id + `/${numberOfHistoryRows}`;
    
            const routineHistoryResults = await fetch(fetchUrl);
            const jsonRoutineHistoryResults = await routineHistoryResults.json();
    
            setRoutineHistory(jsonRoutineHistoryResults);
        };

        fetchRoutineHistory();
    }, [activeRoutine, numberOfHistoryRows]);


    //convert date from database string to a better display format
    const dateConverter = (routineDate) => {
        const monthsArray = [null, "January", "February", "March", "April",
            "May", "June", "July", "August", "September", "November", "December"];

        const year = routineDate.slice(0, 4);
        const day = routineDate.slice(8, 10);

        let month = routineDate.slice(5, 7);
        if (month.charAt(0) === "0") month = month.charAt(1);
        month = monthsArray[month];

        return `${day} ${month} ${year}`;
    }


    //Load more history items when pressing "Load more"
    const loadMoreHistory = () => {
        setNumberOfHistoryRows(previous => previous + 10);
    }


    return (
        <section className={styles.routineHistory}>

            {/* Display the activateRoutine from global state into the section heading */}
            <h2 className={styles.routineHistoryTitle}>{activeRoutine.name}</h2>
            <p className={styles.description}>Click routine history to see past entries</p>


            {/* Take the RoutineHistory from local state and map it for display*/}
            <div>
                {
                    routineHistory.map(historyItem => (
                        <div className={styles.historyItem} key={historyItem.date}>
                            <p className={styles.date}>{dateConverter(historyItem.date)}</p>
                            <p className={styles.timeAndNegative}>Time under load: <span>{historyItem.timeUnderLoad}s</span></p>
                            <p className={styles.timeAndNegative}>Negatives: <span>{historyItem.negatives}</span></p>
                        </div>
                    ))
                }
            </div>
            <button onClick={loadMoreHistory}>Load more</button>
        </section>
    );
}