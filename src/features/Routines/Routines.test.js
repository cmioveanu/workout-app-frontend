import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { changeActiveRoutine, getRoutinesList, getRoutinesExercisesList, toggleEditRoutinesShow } from '../Routines/RoutinesSlice';
import { getExercisesList } from '../Exercises/ExercisesSlice';

import { Routines } from './Routines';
import { RoutineHistory } from '../RoutinesHistory/RoutineHistory';


const mockExercises = [
    {
        id: 85,
        name: "Crunches",
        user_id: 10
    },

    {
        id: 79,
        name: "Hanging leg raises",
        user_id: 10
    },

    {
        id: 81,
        name: "One leg squats",
        user_id: 10
    }
];


const mockRoutinesList = [
    {
        name: 'Bodyweight Full',
        id: 11
    },
    {
        name: 'Bodyweight Pro',
        id: 19
    }
];

const mockRoutinesExList = [
    {
        routine_id: 19,
        exercise_id: 69,
        id: 69,
        name: 'Pushups'
    },
    {
        routine_id: 11,
        exercise_id: 69,
        id: 69,
        name: 'Pushups'
    },
    {
        routine_id: 19,
        exercise_id: 70,
        id: 70,
        name: 'Pullups'
    },
    {
        routine_id: 11,
        exercise_id: 70,
        id: 70,
        name: 'Pullups'
    },
    {
        routine_id: 19,
        exercise_id: 81,
        id: 81,
        name: 'One leg squats'
    },
    {
        routine_id: 11,
        exercise_id: 80,
        id: 80,
        name: 'Hanging Leg Raises'
    },
    {
        routine_id: 19,
        exercise_id: 80,
        id: 80,
        name: 'Hanging Leg Raises'
    }
];


beforeEach(() => {
    store.dispatch(getExercisesList(mockExercises));
    store.dispatch(getRoutinesList(mockRoutinesList));
    store.dispatch(getRoutinesExercisesList(mockRoutinesExList));
    store.dispatch(changeActiveRoutine(mockRoutinesList[1]));

    render(
        <Provider store={store}>
            <Routines />
        </Provider>
    );
});


test('renders routines', () => {
    const routineNames = screen.getAllByRole('heading', { level: 2 });
    expect(routineNames.length).toBe(2);

    expect(screen.getByText('Bodyweight Full')).toBeInTheDocument();
    expect(screen.getByText('Bodyweight Pro')).toBeInTheDocument();
});


test('renders history and edit buttons for all routines', () => {
    const historyButtons = screen.getAllByText('History');
    const editButtons = screen.getAllByText('Edit');

    expect(historyButtons.length).toBe(2);
    expect(editButtons.length).toBe(2);
});


test('creates new routines', async () => {
    const inputBox = screen.getByLabelText('New routine name:');
    const createButton = screen.getByText('Create new routine');

    fireEvent.change(inputBox, { target: { value: 'Machines full' } });
    expect(inputBox.value).toBe('Machines full');

    fireEvent.click(createButton);

    await waitFor(() => {
        expect(screen.getByText('Machines full')).toBeInTheDocument();
    })
});


test('displays and hides Edit component with no name change', () => {
    //open Edit component modal
    const editButtons = screen.getAllByText('Edit');
    const secondEdit = editButtons[1];
    fireEvent.click(secondEdit);

    const doneButton = screen.getByText('Done');
    const deleteButton = screen.getByText('Delete routine');

    expect(doneButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    //hide the Edit component modal again
    fireEvent.click(doneButton);

    const newDone = screen.queryByText('Done');
    const newDelete = screen.queryByText('Delete exercise');
    expect(newDone).toBeNull();
    expect(newDelete).toBeNull();
});


test('edits routine name when new name typed in', async () => {
    //open Edit component modal
    const editButtons = screen.getAllByText('Edit');
    const secondEdit = editButtons[1];
    fireEvent.click(secondEdit);

    //edit routine name
    const input = screen.getByPlaceholderText('enter new name for this routine');
    const doneButton = screen.getByText('Done');
    fireEvent.change(input, { target: { value: 'Bodyweight Legend' } });
    fireEvent.click(doneButton);

    await waitFor(() => {
        const newRoutineName = screen.getByText('Bodyweight Legend');
        expect(newRoutineName).toBeInTheDocument();
    });
});


test('deletes routine on Delete button click', async () => {
    //exercise exists before deletion
    const routine = screen.getByText('Bodyweight Pro');
    expect(routine).toBeInTheDocument();

    //open Edit component modal
    const editButtons = screen.getAllByText('Edit');
    const secondEdit = editButtons[1];
    fireEvent.click(secondEdit);

    const deleteButton = screen.getByText('Delete routine');
    fireEvent.click(deleteButton);

    //exercise is deleted
    await waitFor(() => {
        const deletedRoutine = screen.queryByText('Bodyweight Pro');
        expect(deletedRoutine).toBeNull();
    });
});


test('selects exercise and adds exercise to routine', async () => {
    //open Edit component modal
    const editButtons = screen.getAllByText('Edit');
    const firstEdit = editButtons[0];
    fireEvent.click(firstEdit);

    const addExercise = screen.getByText('Add Exercise');
    fireEvent.click(addExercise);

    //close the modal
    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    await waitFor(() => {
        expect(screen.getByText('Crunches')).toBeInTheDocument();
    });
});


test('removes exercise from routine', async () => {
    //two 'Pushups' instances before deleting one
    const oldPushups = screen.getAllByText('Pushups');
    expect(oldPushups.length).toBe(2);

    //open Edit component modal
    const editButtons = screen.getAllByText('Edit');
    const firstEdit = editButtons[0];
    fireEvent.click(firstEdit);

    //remove first exercise in the list
    const removeList = screen.getAllByText('Remove');
    const firstRemove = removeList[0];
    fireEvent.click(firstRemove);

    //close the modal
    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    await waitFor(() => {
        const pushups = screen.getAllByText('Pushups');
        expect(pushups.length).toBe(1);
    });
});





test('changes active routine for routine history component', () => {
    render(
        <Provider store={store}>
            <RoutineHistory />
        </Provider>
    );

    //Hanging leg raises should show up only once
    const oldBodyFull = screen.getAllByText('Bodyweight Full');
    expect(oldBodyFull.length).toBe(1);

    const historyButtons = screen.getAllByText('History');
    const firstHistory = historyButtons[0];

    fireEvent.click(firstHistory);

    //Hanging leg raises should show up twice now
    const bodyFull = screen.getAllByText('Bodyweight Full');
    expect(bodyFull.length).toBe(2);
});