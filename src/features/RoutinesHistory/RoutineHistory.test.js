import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { changeActiveRoutine } from '../Routines/RoutinesSlice';

import { RoutineHistory } from '../RoutinesHistory/RoutineHistory';


test('renders history for active routine', async () => {
    store.dispatch(changeActiveRoutine({
        name: 'Bodyweight Pro',
        id: 19
    }));

    render(
        <Provider store={store}>
            <RoutineHistory />
        </Provider>
    );

    const routine = await screen.findByText('Bodyweight Pro')
    const date = await screen.findByText('29 March 2021');
    expect(routine).toBeInTheDocument();
    expect(date).toBeInTheDocument();

    const TUL = await screen.findAllByText('Time under load:');
    const negatives = await screen.findAllByText('Negatives:');
    expect(TUL.length).toBe(4);
    expect(negatives.length).toBe(4);
});


