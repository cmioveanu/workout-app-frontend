//modal that gets displayed when clicking "Edit" button and gets passed an id prop for an Routine
//this modal can make a PUT request to edit an existing Routine
//or a DELETE request to delete an Routine
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Edit.module.css';

import { getRoutinesList, toggleEditRoutinesShow } from './RoutinesSlice';

export const Edit = props => {
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.routines.editRoutineShow);
    const [newRoutineName, setNewRoutineName] = useState("");

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


    //send a request to delete from database and close modal
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

    return (
        <div className={styles.modal}>
            <div className={styles.elementsBackground}>
                <h2>Edit {props.routineToEdit.name}:</h2> <br />
                <input type="text" placeholder="enter new name" onChange={handleNameChange} />
                <div className={styles.buttonsContainer}>
                    <button className={styles.editButton} onClick={handleDoneClick}>Done</button>
                    <button className={styles.deleteButton} onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>
        </div>
    );
}