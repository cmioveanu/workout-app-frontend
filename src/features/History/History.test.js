import { render, screen, waitFor } from '@testing-library/react';

import { History } from './History';


test('renders name and date', async () => {
    render(<History />);

    await waitFor(() => {
        expect(screen.getByText("Bodyweight Pro")).toBeInTheDocument();
        expect(screen.getByText("29 March 2021")).toBeInTheDocument();
    });
});


test('renders exercise history', () => {

});