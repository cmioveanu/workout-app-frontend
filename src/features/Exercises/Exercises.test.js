import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { getExercisesList, changeActiveExercise } from '../Exercises/ExercisesSlice';

import { Exercises } from './Exercises';
import { ExerciseHistory } from '../ExerciseHistory/ExerciseHistory';


//add mock exercises and active exercise to the store, then render component
beforeEach(() => {
    const mockExercises = [
        {
            id: 80,
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

    store.dispatch(getExercisesList(mockExercises));
    store.dispatch(changeActiveExercise(mockExercises[0]));

    render(
        <Provider store={store}>
            <Exercises />
        </Provider>
    );
});


test('renders exercises', () => {
    const exercises = screen.getAllByRole('heading', { level: 2 });

    expect(exercises.length).toBe(3);
    expect(screen.getByText('Crunches')).toBeInTheDocument();
    expect(screen.getByText('Hanging leg raises')).toBeInTheDocument();
    expect(screen.getByText('One leg squats')).toBeInTheDocument();
});


test('renders history and edit buttons for all exercises', async () => {
    const historyButtons = screen.getAllByText('History');
    const editButtons = screen.getAllByText('Edit');

    expect(historyButtons.length).toBe(3);
    expect(editButtons.length).toBe(3);
});


test('creates new exercise', async () => {
    const inputBox = screen.getByLabelText('New exercise name:');
    const createButton = screen.getByText('Create new exercise');

    fireEvent.change(inputBox, { target: { value: 'Chinups' } });
    expect(inputBox.value).toBe('Chinups');

    fireEvent.click(createButton);

    await waitFor(() => {
        expect(screen.getByText('Chinups')).toBeInTheDocument();
    })
});


test('changes active exercise when clicking history', () => {
    const historyButtons = screen.getAllByText('History');
    const secondHistory = historyButtons[1];

    fireEvent.click(secondHistory);

    const activeExercise = store.getState().exercises.activeExercise;
    expect(activeExercise.name).toBe('Hanging leg raises');
});


test('displays and hides Edit component with no name change', () => {
    //open Edit component modal
    const editButtons = screen.getAllByText('Edit');
    const secondEdit = editButtons[1];
    fireEvent.click(secondEdit);

    const doneButton = screen.getByText('Done');
    const deleteButton = screen.getByText('Delete exercise');

    expect(doneButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    //hide the Edit component modal again
    fireEvent.click(doneButton);

    const newDone = screen.queryByText('Done');
    const newDelete = screen.queryByText('Delete exercise');
    expect(newDone).toBeNull();
    expect(newDelete).toBeNull();
});


test('edits exercise name when new name typed in', async () => {
    //open Edit component modal
    const editButtons = screen.getAllByText('Edit');
    const secondEdit = editButtons[1];
    fireEvent.click(secondEdit);

    //edit exercise name
    const input = screen.getByPlaceholderText('enter new name');
    const doneButton = screen.getByText('Done');
    fireEvent.change(input, { target: { value: 'Wide Pullups' } });
    fireEvent.click(doneButton);

    await waitFor(() => {
        const newExerciseName = screen.getByText('Wide Pullups');
        expect(newExerciseName).toBeInTheDocument();
    });
});


test('deletes exercise on Delete button click', async () => {
    //exercise exists before deletion
    const exercise = screen.getByText('Hanging leg raises');
    expect(exercise).toBeInTheDocument();

    //open Edit component modal
    const editButtons = screen.getAllByText('Edit');
    const secondEdit = editButtons[1];
    fireEvent.click(secondEdit);

    const deleteButton = screen.getByText('Delete exercise');
    fireEvent.click(deleteButton);

    //exercise is deleted
    await waitFor(() => {
        const deletedExercise = screen.queryByText('Hanging leg raises');
        expect(deletedExercise).toBeNull();
    });
});


test('changes active exercise for history component', () => {
    render(
        <Provider store={store}>
            <ExerciseHistory />
        </Provider>
    );

    //Hanging leg raises should show up only once
    const oldLegRaises = screen.getAllByText('Hanging leg raises');
    expect(oldLegRaises.length).toBe(1);

    const historyButtons = screen.getAllByText('History');
    const secondHistory = historyButtons[1];

    fireEvent.click(secondHistory);

    //Hanging leg raises should show up twice now
    const legRaises = screen.getAllByText('Hanging leg raises');
    expect(legRaises.length).toBe(2);
});