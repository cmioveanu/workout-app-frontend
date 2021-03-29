import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './WorkoutHistory.module.css';

import { getWorkoutExercises, stopTotalTime, toggleShowEditWorkout } from '../Workout/WorkoutSlice';
import { Edit } from './Edit';

export const WorkoutHistory = () => {
    const activeRoutine = useSelector(state => state.routines.activeRoutine);
    const workoutExercises = useSelector(state => state.workout.workoutExercises);
    const totalWorkTime = useSelector(state => state.workout.totalTime);
    const [exerciseToEdit, setExerciseToEdit] = useState(null);
    const dispatch = useDispatch();

    const baseUrl = "api/workout/";


    //get the exercises for currently selected Routine
    useEffect(() => {
        const fetchWorkoutExercises = async () => {
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

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(workoutDetails),
            headers: {
                "content-type": "application/json"
            }
        };

        fetch(baseUrl, fetchOptions);
    }


    //open edit modal
    const handleEditClick = (exercise) => {
        setExerciseToEdit(exercise);
        dispatch(toggleShowEditWorkout());
    }


    return (
        <section className={styles.workoutHistory}>

            {
                /* If no exercises in the routine, display a warning */
                workoutExercises.length === 0 ? 'No exercises available yet.' : null
            }
            {
                workoutExercises.map(exercise => (
                    <div key={exercise.id}>
                        <h3>{exercise.name}</h3>
                        <div className={styles.exerciseStatsContainer}>
                            <div>
                                <p>Time under load: <span>{exercise.timeUnderLoad}</span></p>
                                <p>Negatives: <span>{exercise.negatives}</span></p>
                            </div>
                            <button onClick={() => handleEditClick(exercise)}>Edit</button>
                        </div>
                    </div>
                ))
            }

            <button id={styles.completeButton} onClick={recordWorkout}>Record workout</button>

            {/* Edit component as modal, with the ID of the Routine
                that needs to be edited/deleted in the database */}
            <Edit exerciseToEdit={exerciseToEdit} />
        </section >
    );
}