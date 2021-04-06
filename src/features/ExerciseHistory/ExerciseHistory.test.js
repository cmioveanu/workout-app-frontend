import { render, screen, waitFor } from '@testing-library/react';

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

    await waitFor(() => {
        const date1 = screen.getByText('29 March 2021');
        const date2 = screen.getByText('29 February 2021');
        expect(date1).toBeInTheDocument();
        expect(date2).toBeInTheDocument();

        const timeUnderLoad = screen.getAllByText('Time under load:');
        const negatives = screen.getAllByText('Negatives:');
        expect(timeUnderLoad.length).toBe(2);
        expect(negatives.length).toBe(2);
    });
});

