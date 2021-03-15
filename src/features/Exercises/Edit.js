//modal that gets displayed when clicking "Edit" button and gets passed an id prop for an exercise
//this modal can make a PUT request to edit an existing exercise
//or a DELETE request to delete an exercise
import { useSelector, useDispatch } from 'react-redux';
import styles from './Edit.module.css';

import { toggleEditExercisesShow } from './ExercisesSlice';

export const Edit = props => {
    const dispatch = useDispatch();
    const showModal = useSelector(state => state.exercises.editExerciseShow);

    if (!showModal) {
        return null;
    }


    //send a request to edit in database and close modal
    const handleDoneClick = () => {
        dispatch(toggleEditExercisesShow());
    };


    //send a request to delete from database and close modal
    const handleDeleteClick = () => {
        dispatch(toggleEditExercisesShow());
    }

    return (
        <div className={styles.modal}>
            <div className={styles.elementsBackground}>
                <h2>Edit {props.exerciseToEdit.name}:</h2> <br />
                <input type="text" placeholder="enter new name" />
                <div className={styles.buttonsContainer}>
                    <button className={styles.editButton} onClick={handleDoneClick}>Done</button>
                    <button className={styles.deleteButton} onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>
        </div>
    );
}