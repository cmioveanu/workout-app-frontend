import { render, screen, waitFor } from '@testing-library/react';
import { History } from './History';


test('renders all history', async () => {
    render(<History />);

    await waitFor(() => {
        const numberOfDates = screen.getAllByRole('heading', { level: 3 });
        const numberOfTitles = screen.getAllByRole('heading', { level: 2 });
        expect(numberOfDates.length).toBe(2);
        expect(numberOfTitles.length).toBe(2);
    });
});


test('renders names and dates', async () => {
    render(<History />);

    await waitFor(() => {
        expect(screen.getByText("Bodyweight Pro")).toBeInTheDocument();
        expect(screen.getByText("29 March 2021")).toBeInTheDocument();
        expect(screen.getByText("Machines Full")).toBeInTheDocument();
        expect(screen.getByText("29 April 2021")).toBeInTheDocument();
    });
});


test('renders exercise history', async () => {
    render(<History />);

    await waitFor(() => {
        const numberOfTUL = screen.getAllByText("Time under load:");
        const negatives = screen.getAllByText("Negatives:");

        expect(numberOfTUL.length).toBe(2);
        expect(negatives.length).toBe(2);

        expect(screen.getByText("Crunches")).toBeInTheDocument();
        expect(screen.getByText("Pushups")).toBeInTheDocument();
    });
});