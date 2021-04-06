import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { getExercisesList, changeActiveExercise } from '../Exercises/ExercisesSlice';

import { Exercises } from './Exercises';


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


test('displays edit component when clicking edit', () => {
    const editButtons = screen.getAllByText('Edit');
    const secondEdit = editButtons[1];

    fireEvent.click(secondEdit);

    const doneButton = screen.getByText('Done');
    const deleteButton = screen.getByText('Delete exercise');

    expect(doneButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
});
