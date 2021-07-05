import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Routines.module.css';

import { getRoutinesList, changeActiveRoutine, toggleEditRoutinesShow } from './RoutinesSlice';

import { Edit } from './Edit';




export const Routines = () => {
    const dispatch = useDispatch();

    const routines = useSelector(state => state.routines.routinesList);
    const exercisesRoutines = useSelector(state => state.routines.routinesExercisesList);

    const [newRoutineName, setNewRoutineName] = useState("");
    const [routineToEdit, setRoutineToEdit] = useState({ name: 'Default', id: 1 });


    //change new Routine name when typing
    const handleChange = (event) => {
        setNewRoutineName(event.target.value);
    }


    //add Routine to database when pressing "Create new routine"
    const handleSubmit = (event) => {
        fetch("api/routines", {
            method: 'POST',
            body: JSON.stringify({ "name": newRoutineName }),
            headers: {
                "content-type": "application/json"
            },
            credentials: 'include'

        })
            .then(res => res.json())
            .then(jsonRes => dispatch(getRoutinesList(jsonRes)));

        event.preventDefault();
        setNewRoutineName("");
    }


    //change active Routine to show its history
    const handleClick = (newRoutine) => {
        dispatch(changeActiveRoutine(newRoutine));
    }


    //display or hide the modal with the right Routine
    const handleEditClick = (routineForEdit) => {
        setRoutineToEdit(routineForEdit);
        dispatch(toggleEditRoutinesShow());
    }


    //display exercises for each routine
    const displayExercises = (routineID) => {
        return exercisesRoutines.filter(exercise => exercise.routine_id === routineID);
    }


    return (
        <section className={styles.routines}>
            <div className={styles.createNew}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="newRoutine">New routine name:</label>
                    <br />
                    <input type="text" value={newRoutineName} onChange={handleChange} id="newRoutine" />
                    <br />
                    <input type="submit" value="Create new routine" className={styles.submitButton} />
                </form>
            </div>



            {   /* Map Routines from global state for display */
                routines.map(routine => (
                    <div key={routine.id} className={styles.routineContainer}>
                        <div className={styles.individualRoutines}>
                            <h2>{routine.name}</h2>
                            <div>
                                <button className={styles.historyButton}
                                    onClick={() => handleClick(routine)}>History</button>
                                <button className={styles.editButton} onClick={() => handleEditClick(routine)}>Edit</button>
                            </div>
                        </div>

                        {/* For each routine, display the corresponding exercises.
                            Filter by routine ID */}
                        {displayExercises(routine.id).map(exercise => (
                            <p key={exercise.id} className={styles.individualExercises}>{exercise.name}</p>
                        ))}
                    </div>
                ))
            }


            {/* Edid component as modal, with the ID of the Routine
                that needs to be edited/deleted in the database */}
            <Edit routineToEdit={routineToEdit} />

        </section>
    );
}