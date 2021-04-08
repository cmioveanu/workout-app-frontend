import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { changeActiveRoutine } from '../Routines/RoutinesSlice';

import { WorkoutHistory } from './WorkoutHistory';


beforeEach(() => {
    store.dispatch(changeActiveRoutine({
        name: 'Bodyweight Pro',
        id: 19
    }));

    render(
        <Provider store={store}>
            <WorkoutHistory />
        </Provider>
    );
});



test('renders exercises for current workout', async () => {
    const exerciseNames = await screen.findAllByRole('heading', { level: 3 });
    expect(exerciseNames.length).toBe(4);
});


test('renders time under load and negatives for all exercises', () => {
    const TUL = screen.getAllByText('Time under load:');
    const negatives = screen.getAllByText('Negatives:');
    expect(TUL.length).toBe(4);
    expect(negatives.length).toBe(4);
});


test('renders and closes the Edit modal with no changes', () => {
    const editButtons = screen.getAllByText('Edit');
    expect(editButtons.length).toBe(4);

    //open the Edit modal for first exercise('Hanging leg raises)
    const firstEdit = editButtons[0];
    fireEvent.click(firstEdit);

    //cancel button should now appear after opening
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeInTheDocument();

    //cancel button should disappear after closing
    fireEvent.click(cancelButton);
    const cancel = screen.queryByText('Cancel');
    expect(cancel).toBeNull();
});


test('changes time under load and negatives when edited in the modal', () => {
    //open the Edit modal for third exercise('Pullups)
    const editButtons = screen.getAllByText('Edit');
    const firstEdit = editButtons[2];
    fireEvent.click(firstEdit);

    //change the input values
    const time = screen.getByLabelText('Time under load in seconds:');
    const negatives = screen.getByLabelText('Negatives:');
    fireEvent.change(time, { target: { value: 333 } });
    fireEvent.change(negatives, { target: { value: 555 } });

    //close and register the changes
    const done = screen.getByText('Done');
    fireEvent.click(done);

    expect(screen.getByText('333')).toBeInTheDocument();
    expect(screen.getByText('555')).toBeInTheDocument();
});


test('records the workout and resets to 0', async () => {
    //open the Edit modal for third exercise('Pullups)
    const editButtons = screen.getAllByText('Edit');
    const firstEdit = editButtons[2];
    fireEvent.click(firstEdit);

    //change the input values
    const time = screen.getByLabelText('Time under load in seconds:');
    const negatives = screen.getByLabelText('Negatives:');
    fireEvent.change(time, { target: { value: 333 } });
    fireEvent.change(negatives, { target: { value: 555 } });

    //close and register the changes
    const done = screen.getByText('Done');
    fireEvent.click(done);

    //record the workout
    const record = screen.getByText('Record workout');
    fireEvent.click(record);


    const textAlert = screen.getByTestId('workoutAlert');
    await waitFor(() => {
        expect(textAlert.textContent).toBe('Workout recorded!');
    });
});


test('does not record the workout if no exercises changed', async () => {
    const record = screen.getByText('Record workout');
    fireEvent.click(record);

    await waitFor(() => {
        const textAlert = screen.getByTestId('workoutAlert');
        expect(textAlert.textContent).toBe('Workout was not recorded. Try again!');
    });
});