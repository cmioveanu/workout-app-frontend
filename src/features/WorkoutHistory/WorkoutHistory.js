import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './WorkoutHistory.module.css';

import { getWorkoutExercises } from '../Workout/WorkoutSlice';

export const WorkoutHistory = () => {
    const activeRoutine = useSelector(state => state.routines.activeRoutine);
    const workoutExercises = useSelector(state => state.workout.workoutExercises);
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


    return (
        <section className={styles.workoutHistory}>

            {/* Display the activateRoutine from global state into the section heading */}
            <h2 className={styles.workoutHistoryTitle}>{activeRoutine.name}</h2>
            <p className={styles.description}>Select a different routine above to change workout</p>

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


        </section >
    );
}