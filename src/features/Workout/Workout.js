import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Workout.module.css';

import { changeTUL, changeNegatives } from './WorkoutSlice';

export const Workout = () => {
    
    const [timeUnderLoad, setTimeUnderLoad] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    let totalWorkoutTime = 0;
    let timer;


    //initiate or clear the timer based on active status
    useEffect(() => {
        if (timerActive) {
            timer = setInterval(() => {
                setTimeUnderLoad(value => value + 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [timerActive]);


    /* start timer if not active;
       update time under load for current exercise if active */
    const stopStartTimer = () => {
        if(!timerActive) {
            setTimerActive(true);
        } else {
            setTimerActive(false);
            //fetch POST to add the time
            //reset timer to 0 for next exercise
            //go to next exercise in the list
        }
    }


    //reset the time under load to 0 and stop the timer
    const resetTimer = () => {
        setTimerActive(false);
        setTimeUnderLoad(0);
        setTimerActive(false);
    }





    return (
        <section className={styles.workoutHistory}>

            <div className={styles.timerContainer}>
                <p>{timeUnderLoad}</p>
                <p>Total workout time:</p>
                <p></p>
            </div>
            <div>
                <button onClick={stopStartTimer}>Start set</button>
                <button onClick={resetTimer}>Reset set</button>
                <button>Add negative</button>
            </div>


        </section>
    );
}