import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Workout.module.css';

import { changeTUL, addNegatives, startTotalTime, updateTotalTime } from './WorkoutSlice';
import { changeActiveRoutine } from '../Routines/RoutinesSlice';


export const Workout = () => {
    const routinesList = useSelector(state => state.routines.routinesList);
    const workoutExercises = useSelector(state => state.workout.workoutExercises);
    const dispatch = useDispatch();

    const totalWorkTime = useSelector(state => state.workout.totalTime);
    const totalTimerActive = useSelector(state => state.workout.totalTimerActive);


    //selected exercise
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [selectedExercise, setSelectedExercise] = useState({ name: "No exercise available yet." });
    const [negatives, setNegatives] = useState(null);


    //state for timers
    const [timeUnderLoad, setTimeUnderLoad] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    //const [totalWorkTime, setTotalWorkTime] = useState(0);
    //const [totalTimerActive, setTotalTimerActive] = useState(0);


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
                dispatch(updateTotalTime());
            }, 1000);
        }

        return () => clearInterval(totalTimer);
    }, [dispatch, totalTimerActive]);


    /* start timer if not active;
       update time under load for current exercise if active */
    const stopStartTimer = () => {
        //if total workout timer not active yet, start it for the workout
        if (!totalTimerActive) {
            dispatch(startTotalTime());
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
    const addMoreNegatives = () => {
        const values = {
            name: selectedExercise.name,
            negatives: negatives
        }
        dispatch(addNegatives(values));
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
        setExerciseIndex(0);
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
                {routinesList.length === 0 ? 'No workouts available yet.' : null}
                <select className={styles.workoutTitle}>
                    {routinesList.map(routine => (
                        <option 
                        key={routine.id} 
                        value={routine.name} 
                        data-testid="routineTitle"
                        onClick={() => handleRoutineChange(routine)}>{routine.name}</option>
                    ))}
                </select>
            </h2>
            <p className={styles.description}>
                {
                    routinesList.length === 0 ? 'Create a routine to start working out' :
                        'Select a different routine above to change the workout'
                }
            </p>


            {/* Display buttons for active exercise and timer controls if routines exist. */}
            {
                routinesList.length === 0 ? null : <div className={styles.buttonsContainer}>
                    <div id={styles.exerciseSelector}>
                        <button onClick={indexDecrease}>{"<"}</button>
                        <h2>{selectedExercise.name}</h2>
                        <button onClick={indexIncrease}>{">"}</button>
                    </div>

                    <div>
                        <button id={timerActive ? styles.startSetLight : styles.startSetDark} onClick={stopStartTimer}>{timerActive === false ? "Start set" : "Record set"}</button>
                        <button onClick={resetTimer}>Reset set</button>
                    </div>

                    <div className={styles.negatives}>
                        <button onClick={addMoreNegatives}>Add negatives</button>
                        <input type="text" onChange={handleNegativesChange} data-testid="negativesInput"/>
                    </div>
                </div>
            }
        </section>
    );
}