import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Edit.module.css';

import { toggleShowEditWorkout, changeTUL, changeNegatives } from '../Workout/WorkoutSlice';

export const Edit = props => {
    const showModal = useSelector(state => state.workout.showEditWorkout);
    const exercise = props.exerciseToEdit;
    const dispatch = useDispatch();

    const [timeUnderLoad, setTimeUnderLoad] = useState(0);
    const [negatives, setNegatives] = useState(0);


    //only show this component when the edit button was pressed
    if (!showModal) {
        return null;
    }


    //update time under load or negatives in local state, on change
    const handleTULChange = (event) => setTimeUnderLoad(event.target.value);
    const handleNegativesChange = (event) => setNegatives(event.target.value);


    //send values to global state on "Done" click
    const handleDoneClick = () => {
        dispatch(changeTUL({
            name: exercise.name,
            timeUnderLoad: timeUnderLoad
        }));

        dispatch(changeNegatives({
            name: exercise.name,
            negatives: negatives
        }));

        dispatch(toggleShowEditWorkout());
    }


    return (
        <div className={styles.modal}>
            <div className={styles.elementsBackground}>
                <h2>{props.exerciseToEdit.name}:</h2> <br />
                <label htmlFor="timeUnderLoad">Time under load in seconds:</label>
                <input type="text" id="timeUnderLoad" placeholder={exercise.timeUnderLoad}
                    onChange={handleTULChange} />

                <label htmlFor="negatives">Negatives:</label>
                <input type="text" id="negatives" placeholder={exercise.negatives}
                    onChange={handleNegativesChange} />

                <div className={styles.buttonsContainer}>
                    <button className={styles.editButton} onClick={handleDoneClick}>Done</button>
                    <button className={styles.cancelbutton} onClick={() => dispatch(toggleShowEditWorkout())}>Cancel</button>
                </div>
            </div>
        </div>
    );
}