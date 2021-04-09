import { render, screen } from '@testing-library/react';
import { History } from './History';


test('renders all history', async () => {
    render(<History />);

    const numberOfDates = await screen.findAllByRole('heading', { level: 3 });
    const numberOfTitles = await screen.findAllByRole('heading', { level: 2 });
    expect(numberOfDates.length).toBe(2);
    expect(numberOfTitles.length).toBe(2);
});


test('renders names and dates', async () => {
    render(<History />);

    const firstRoutine = await screen.findByText("Bodyweight Pro");
    const firstDate = await screen.findByText("29 March 2021");
    const secondRoutine = await screen.findByText("Machines Full");
    const secondDate = await screen.findByText("29 April 2021");

    expect(firstRoutine).toBeInTheDocument();
    expect(firstDate).toBeInTheDocument();
    expect(secondRoutine).toBeInTheDocument();
    expect(secondDate).toBeInTheDocument();
});


test('renders individual exercise history', async () => {
    render(<History />);

    const numberOfTUL = await screen.findAllByText("Time under load:");
    const negatives = await screen.findAllByText("Negatives:");

    expect(numberOfTUL.length).toBe(2);
    expect(negatives.length).toBe(2);

    const crunches = await screen.findByText("Crunches");
    const pushups = await screen.findByText("Pushups");
    expect(crunches).toBeInTheDocument();
    expect(pushups).toBeInTheDocument();
});