import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './WorkoutHistory.module.css';

import { getWorkoutExercises, stopTotalTime } from '../Workout/WorkoutSlice';


export const WorkoutHistory = () => {
    const activeRoutine = useSelector(state => state.routines.activeRoutine);
    const workoutExercises = useSelector(state => state.workout.workoutExercises);
    const totalWorkTime = useSelector(state => state.workout.totalTime);
    const dispatch = useDispatch();


    //get the exercises for currently selected Routine
    useEffect(() => {
        const fetchWorkoutExercises = async () => {
            const baseUrl = "http://localhost:8080/myWorkout/";

            const fetchUrl = baseUrl + activeRoutine.id;

            const workoutExercisesResults = await fetch(fetchUrl);
            const jsonworkoutExercisesResults = await workoutExercisesResults.json();

            const exercisesWithStats = jsonworkoutExercisesResults.map(exercise => ({
                name: exercise.name,
                id: exercise.exercises_routines_id,
                timeUnderLoad: 0,
                negatives: 0
            }));

            dispatch(getWorkoutExercises(exercisesWithStats));
        };

        fetchWorkoutExercises();
    }, [activeRoutine, dispatch]);


    //record the workout in the database
    const recordWorkout = () => {
        dispatch(stopTotalTime(0));

        const workoutDetails = {
            totalWorkoutTime: totalWorkTime,
            exercises: workoutExercises,
        }

        console.log(workoutDetails);
        
        const fetchUrl = "http://localhost:8080/myWorkout/";
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(workoutDetails),
            headers: {
                "content-type": "application/json"
            }
        };

        fetch(fetchUrl, fetchOptions);
    }


    return (
        <section className={styles.workoutHistory}>
            {
                workoutExercises.map(exercise => (
                    <div key={exercise.id}>
                        <h3>{exercise.name}</h3>
                        <div className={styles.exerciseStatsContainer}>
                            <div>
                                <p>Time under load: <span>{exercise.timeUnderLoad}</span></p>
                                <p>Negatives: <span>{exercise.negatives}</span></p>
                            </div>
                            <button>Edit</button>
                        </div>
                    </div>
                ))
            }

            <button id={styles.completeButton} onClick={recordWorkout}>Finish workout</button>
        </section >
    );  
}