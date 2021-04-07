import { render, screen, waitFor } from '@testing-library/react';

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

    await waitFor(() => {
        expect(screen.getByText('Bodyweight Pro')).toBeInTheDocument();
        expect(screen.getByText('29 March 2021')).toBeInTheDocument();
        
        const TUL = screen.getAllByText('Time under load:');
        const negatives = screen.getAllByText('Negatives:');
        expect(TUL.length).toBe(4);
        expect(negatives.length).toBe(4);
    });
});


