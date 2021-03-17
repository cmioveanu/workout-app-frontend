//modal that gets displayed when clicking "Edit" button and gets passed an id prop for an Routine
//this modal can make a PUT request to edit an existing Routine
//or a DELETE request to delete an Routine
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Edit.module.css';

import { getRoutinesList, getRoutinesExercisesList, toggleEditRoutinesShow } from './RoutinesSlice';

export const Edit = props => {
    const dispatch = useDispatch();

    const showModal = useSelector(state => state.routines.editRoutineShow);
    const exercisesRoutines = useSelector(state => state.routines.routinesExercisesList);
    const exercises = useSelector(state => state.exercises.exercisesList);

    const [newRoutineName, setNewRoutineName] = useState("");
    const [selectedExercise, setSelectedExercise] = useState(exercises[0].id);

    if (!showModal) {
        return null;
    }


    //send a request to edit in database and close modal
    const handleDoneClick = async () => {
        const baseUrl = "http://localhost:8080/myRoutines/";
        const fetchUrl = baseUrl + props.routineToEdit.id;

        const fetchOptions = {
            method: 'PUT',
            body: JSON.stringify({ "newName": newRoutineName }),
            headers: {
                "content-type": "application/json"
            }
        };

        if (newRoutineName !== "") {
            const RoutinesList = await fetch(fetchUrl, fetchOptions);
            const jsonRoutinesList = await RoutinesList.json();
            dispatch(getRoutinesList(jsonRoutinesList));
        }

        dispatch(toggleEditRoutinesShow());
    };


    //send a request to delete routine from database and close modal
    const handleDeleteClick = async () => {
        const baseUrl = "http://localhost:8080/myRoutines/";
        const fetchUrl = baseUrl + props.routineToEdit.id;

        const fetchOptions = {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            }
        };

        const RoutinesList = await fetch(fetchUrl, fetchOptions);
        const jsonRoutinesList = await RoutinesList.json();
        dispatch(getRoutinesList(jsonRoutinesList));


        dispatch(toggleEditRoutinesShow());
    }


    //update new Routine name as you type
    const handleNameChange = (event) => {
        setNewRoutineName(event.target.value);
    }


    //display exercises for current routine to be edited
    const displayExercises = () => {
        return exercisesRoutines.filter(exercise => exercise.routine_id === props.routineToEdit.id);
    }


    //remove exercise from this routine
    const removeExercise = async (exerciseID) => {
        const baseUrl = "http://localhost:8080/myRoutines/";
        const fetchUrl = baseUrl + props.routineToEdit.id + "/" + exerciseID;

        const fetchOptions = {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            }
        };

        const routinesExercisesList = await fetch(fetchUrl, fetchOptions);
        const jsonRoutinesExercisesList = await routinesExercisesList.json();
        dispatch(getRoutinesExercisesList(jsonRoutinesExercisesList));
    }


    //add exercise to this routine
    const handleAddOnChange = async (exerciseID) => {
        const baseUrl = "http://localhost:8080/myRoutines/";
        const fetchUrl = baseUrl + props.routineToEdit.id + "/" + exerciseID;

        const fetchOptions = {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            }
        };

        const routinesExercisesList = await fetch(fetchUrl, fetchOptions);
        const jsonRoutinesExercisesList = await routinesExercisesList.json();
        dispatch(getRoutinesExercisesList(jsonRoutinesExercisesList));
    }


    //change selected exercise in state
    const handleSelectChange = (exerciseID) => {
        setSelectedExercise(exerciseID);
    }


    return (
        <div className={styles.modal}>
            <div className={styles.elementsBackground}>
                <h2>Edit {props.routineToEdit.name}:</h2> <br />
                <input type="text" placeholder="enter new name for routine" onChange={handleNameChange} />



                {/* For current routine, display the corresponding exercises. */}
                {
                    displayExercises().map(exercise => (
                        <div className={styles.individualExContainer}>
                            <p key={exercise.id} className={styles.individualExercises}>{exercise.name}</p>
                            <button onClick={() => removeExercise(exercise.id)}>Remove</button>
                        </div>
                    ))
                }

                <div className={styles.dropDown}>
                    {/* Drop-down with all the exercises this user has created */}
                    <select>
                        {exercises.map(exercise => (
                            <option value={exercise.name}
                                key={exercise.id}
                                onClick={() => handleSelectChange(exercise.id)}>{exercise.name}</option>
                        ))}
                    </select>
                    <button onClick={() => handleAddOnChange(selectedExercise)}>Add Exercise</button>
                </div>

                <div className={styles.buttonsContainer}>
                    <button className={styles.editButton} onClick={handleDoneClick}>Done</button>
                    <button className={styles.deleteButton} onClick={handleDeleteClick}>Delete routine</button>
                </div>


            </div>
        </div>
    );
}