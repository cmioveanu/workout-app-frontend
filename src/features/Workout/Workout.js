import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Workout.module.css';

import { changeTUL, changeNegatives } from './WorkoutSlice';
import { changeActiveRoutine } from '../Routines/RoutinesSlice';


export const Workout = () => {
    const routinesList = useSelector(state => state.routines.routinesList);
    const workoutExercises = useSelector(state => state.workout.workoutExercises);
    const dispatch = useDispatch();


    //selected exercise
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [selectedExercise, setSelectedExercise] = useState({ name: "" });
    const [negatives, setNegatives] = useState(null);


    //state for timers
    const [timeUnderLoad, setTimeUnderLoad] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [totalWorkTime, setTotalWorkTime] = useState(0);
    const [totalTimerActive, setTotalTimerActive] = useState(0);


    useEffect(() => {
        if (workoutExercises.length > 0) {
            setSelectedExercise(workoutExercises[exerciseIndex]);
        }
    }, [workoutExercises, exerciseIndex]);


    //initiate or clear the timer based on active status
    useEffect(() => {
        let timer;

        if (timerActive) {
            timer = setInterval(() => {
                setTimeUnderLoad(value => value + 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [timerActive]);


    //initiate or clear the total timer based on active status
    useEffect(() => {
        let totalTimer;

        if (totalTimerActive) {
            totalTimer = setInterval(() => {
                setTotalWorkTime(value => value + 1);
            }, 1000);
        }

        return () => clearInterval(totalTimer);
    }, [totalTimerActive]);


    /* start timer if not active;
       update time under load for current exercise if active */
    const stopStartTimer = () => {
        //if total workout timer not active yet, start it for the workout
        if (!totalTimerActive) {
            setTotalTimerActive(true);
        }

        //if exercise timer inactive, start it. If active, record the value and reset exercise timer
        if (!timerActive) {
            setTimerActive(true);
        } else {
            setTimerActive(false);

            const values = {
                name: selectedExercise.name,
                timeUnderLoad: timeUnderLoad
            }
            dispatch(changeTUL(values));

            setTimeUnderLoad(0);
        }
    }


    //reset the time under load to 0 and stop the timer
    const resetTimer = () => {
        setTimerActive(false);
        setTimeUnderLoad(0);
    }


    //update negatives when editing input
    const handleNegativesChange = (event) => {
        setNegatives(parseInt(event.target.value));
    }


    //add negatives to the selected exercise
    const addNegatives = () => {
        const values = {
            name: selectedExercise.name,
            negatives: negatives
        }
        dispatch(changeNegatives(values));
    }


    //increment selected exercise index
    const indexIncrease = () => {
        if (exerciseIndex < workoutExercises.length - 1) {
            setExerciseIndex(index => index + 1);
        } else {
            setExerciseIndex(0);
        }

        setSelectedExercise(workoutExercises[exerciseIndex]);
    }


    //decrement selected exercise index
    const indexDecrease = () => {
        if (exerciseIndex === 0) {
            setExerciseIndex(workoutExercises.length - 1);
        } else {
            setExerciseIndex(index => index - 1);
        }

        setSelectedExercise(workoutExercises[exerciseIndex]);
    }


    //change active routine when selecting a different routine
    const handleRoutineChange = (newRoutine) => {
        dispatch(changeActiveRoutine(newRoutine));
    }


    return (
        <section className={styles.workoutHistory}>

            <div className={styles.timerContainer}>
                <time className={styles.timeUnderLoad}>{timeUnderLoad}<span>s</span></time>
                <p>Total workout time:</p>
                <time>{totalWorkTime}</time>
            </div>

             {/* Display the activateRoutine from global state into the section heading */}
             <h2>
                <select className={styles.workoutHistoryTitle}>
                    {routinesList.map(routine => (
                        <option key={routine.id} value={routine.name} onClick={() => handleRoutineChange(routine)}>{routine.name}</option>
                    ))}
                </select>
            </h2>
            <p className={styles.description}>Select a different routine above to change the workout</p>
            
            <div className={styles.buttonsContainer}>
                <div id={styles.exerciseSelector}>
                    <button onClick={indexIncrease}>{"<"}</button>
                    <h2>{selectedExercise.name}</h2>
                    <button onClick={indexDecrease}>{">"}</button>
                </div>
                <div>
                    <button id={timerActive ? styles.startSetLight : styles.startSetDark} onClick={stopStartTimer}>{timerActive === false ? "Start set" : "Record set"}</button>
                    <button onClick={resetTimer}>Reset set</button>
                </div>
                <div className={styles.negatives}>
                    <button onClick={addNegatives}>Add negatives</button>
                    <input type="text" onChange={handleNegativesChange} />
                </div>
            </div>


        </section>
    );
}