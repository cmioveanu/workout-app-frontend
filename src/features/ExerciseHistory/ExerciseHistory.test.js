import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { changeActiveExercise } from '../Exercises/ExercisesSlice';

import { ExerciseHistory } from './ExerciseHistory';


test('renders history of the active exercise', async () => {
    store.dispatch(changeActiveExercise({
        id: 80,
        name: "Crunches",
        user_id: 10
    }));

    render(
        <Provider store={store}>
            <ExerciseHistory />
        </Provider>
    );

    const date1 = await screen.findByText('29 March 2021');
    const date2 = await screen.findByText('29 February 2021');
    expect(date1).toBeInTheDocument();
    expect(date2).toBeInTheDocument();

    const timeUnderLoad = await screen.findAllByText('Time under load:');
    const negatives = await screen.findAllByText('Negatives:');
    expect(timeUnderLoad.length).toBe(2);
    expect(negatives.length).toBe(2);
});

