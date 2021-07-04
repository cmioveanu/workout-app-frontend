import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Edit.module.css';

import { getExercisesList, toggleEditExercisesShow } from './ExercisesSlice';

export const Edit = props => {
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.exercises.editExerciseShow);
    const [newExerciseName, setNewExerciseName] = useState("");

    const baseUrl = "https://full-stack-e-commerce-backend.herokuapp.com/api/exercises/";

    if (!showModal) {
        return null;
    }


    //send a request to edit in database and close modal
    const handleDoneClick = async () => {
        const fetchUrl = baseUrl + props.exerciseToEdit.id;

        const fetchOptions = {
            method: 'PUT',
            body: JSON.stringify({ "newName": newExerciseName }),
            headers: {
                "content-type": "application/json"
            }
        };

        if (newExerciseName !== "") {
            const exercisesList = await fetch(fetchUrl, fetchOptions);
            const jsonExercisesList = await exercisesList.json();
            dispatch(getExercisesList(jsonExercisesList));
        }

        dispatch(toggleEditExercisesShow());
    };


    //send a request to delete from database and close modal
    const handleDeleteClick = async () => {
        const fetchUrl = baseUrl + props.exerciseToEdit.id;

        const fetchOptions = {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            }
        };

        const exercisesList = await fetch(fetchUrl, fetchOptions);
        const jsonExercisesList = await exercisesList.json();
        dispatch(getExercisesList(jsonExercisesList));


        dispatch(toggleEditExercisesShow());
    }


    //update new exercise name as you type
    const handleNameChange = (event) => {
        setNewExerciseName(event.target.value);
    }

    return (
        <div className={styles.modal}>
            <div className={styles.elementsBackground}>
                <h2>{props.exerciseToEdit.name}:</h2> <br />
                <input type="text" placeholder="enter new name" onChange={handleNameChange} />
                <div className={styles.buttonsContainer}>
                    <button className={styles.editButton} onClick={handleDoneClick}>Done</button>
                    <button className={styles.deleteButton} onClick={handleDeleteClick}>Delete exercise</button>
                </div>
            </div>
        </div>
    );
}