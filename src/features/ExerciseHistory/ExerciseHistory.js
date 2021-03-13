import react, { useEffect } from 'react';
import styles from './ExerciseHistory.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';


/*  
    # Fetch list of exercise on component mount
    - useEffect for fetching exercise and workout lists in <App /> component,
      store them in global state(Work out and Routines page uses them as well)
    - display exercises in a <select> tag

    # Fetch history of an exercise
    - when selecting the exercise from the dropdown, use its value in the fetch request (onchange)
    - add history to local state
    - take history from state and map for display

    # Load more history
    - load 10 rows initially
    - each button press loads 10 more
    - button press increases LIMIT by 10 in local state (numberOfHistoryRows)
*/


export const ExerciseHistory = () => {
    const activeExercise = useSelector(state => state.exercises.activeExercise);
    const [numberOfHistoryRows, setNumberOfHistoryRows] = useState(10);
    const [exerciseHistory, setExerciseHistory] = useState([]);


    //function to get the history of the exercise
    const fetchExerciseHistory = async () => {
        const baseUrl = "http://localhost:8080/myExercises/";

        const fetchUrl = baseUrl + `${activeExercise.id}` + `/${numberOfHistoryRows}`;

        const exerciseHistoryResults = await fetch(fetchUrl);
        const jsonExerciseHistoryResults = await exerciseHistoryResults.json();

        setExerciseHistory(jsonExerciseHistoryResults);
    };


    //get the history when component is mounted
    useEffect(() => {
        fetchExerciseHistory();
    }, [activeExercise]);


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


            {/* Take the exerciseHistory from local state and map it for display*/}
            <div>
                {
                    exerciseHistory.map(historyItem => (
                        <div className={styles.historyItem}>
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