import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { getRoutinesList, getRoutinesExercisesList } from '../Routines/RoutinesSlice';
import { getWorkoutExercises } from '../Workout/WorkoutSlice';

import { Workout } from './Workout';
import { WorkoutHistory } from '../WorkoutHistory/WorkoutHistory';

import { workoutExercises, routinesList, routinesExList } from '../../mocks/testData';


beforeEach(() => {
    store.dispatch(getWorkoutExercises(workoutExercises));
    store.dispatch(getRoutinesList(routinesList));
    store.dispatch(getRoutinesExercisesList(routinesExList));

    render(
        <Provider store={store}>
            <Workout />
        </Provider>
    );
});


test('renders routine name and workout exercises', () => {
    expect(screen.getByText('Bodyweight Pro')).toBeInTheDocument();
    expect(screen.getByText('Hanging Leg Raises')).toBeInTheDocument();
});


test('renders buttons', () => {
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('Start set')).toBeInTheDocument();
    expect(screen.getByText('Reset set')).toBeInTheDocument();
    expect(screen.getByText('Add negatives')).toBeInTheDocument();
});


test('renders "Record set" button after pressing start set', () => {
    const start = screen.getByText('Start set');
    fireEvent.click(start);

    expect(screen.getByText('Record set')).toBeInTheDocument();
});


test('starts exercise and total timers; resets exercise timer', async () => {
    const start = screen.getByText('Start set');
    fireEvent.click(start);

    //neither of the timers is at 0 anymore
    await waitFor(() => expect(screen.queryByText('0')).toBeNull());

    const reset = screen.getByText('Reset set');
    fireEvent.click(reset);

    //only one timer at 0, the exercise timer
    expect(screen.getAllByText('0').length).toBe(1);
});


test('records time under load', async () => {
    //expect 1 to not be in the document yet
    await waitFor(() => expect(screen.queryByText('1')).toBeNull());


    //start timer and wait until it's at 1 second or more
    const start = screen.getByText('Start set');
    fireEvent.click(start);
    await waitFor(() => expect(screen.queryByText('0')).toBeNull());

    //render the workout history component
    render(
        <Provider store={store}>
            <WorkoutHistory />
        </Provider>
    );

    const record = screen.getByText('Record set');
    fireEvent.click(record);

    expect(screen.getByText('1')).toBeInTheDocument();
});


test('adds negatives to an exercise', () => {
    const negatives = screen.getByText('Add negatives');
    const input = screen.getByTestId('negativesInput');

    fireEvent.change(input, { target: { value: 22 } });
    fireEvent.click(negatives);

    //render the workout history component
    render(
        <Provider store={store}>
            <WorkoutHistory />
        </Provider>
    );

    expect(screen.getByText('22')).toBeInTheDocument();
});


test('changes active exercise', () => {
    const right = screen.getByText('>');
    const left = screen.getByText('<');

    fireEvent.click(right);
    expect(screen.getByText('One leg squats')).toBeInTheDocument();

    fireEvent.click(left);
    fireEvent.click(left);
    expect(screen.getByText('Pushups')).toBeInTheDocument();
});


test('renders all routines in dropdown', () => {
    //const routines = screen.getAllByTestId('routineTitle');

    const routine1 = screen.getByText('Bodyweight Full');
    const routine2 = screen.getByText('Bodyweight Pro');
    //expect(routines.length).toBe(2);
    
    expect(routine1.selected).toBeTruthy();
    expect(routine2.selected).toBeFalsy();
});