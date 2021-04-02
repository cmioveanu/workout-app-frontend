import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { workoutSlice } from '../Workout/WorkoutSlice';

import { HowToUse } from './HowToUse';


test('renders overview', () => {
    render(
        <BrowserRouter>
            <HowToUse />
        </BrowserRouter>
    );

    const overviewHeading = screen.getByRole('heading', { level: 2 });
    expect(overviewHeading).toBeInTheDocument();
});


test('renders step by step instructions', () => {
    render(
        <BrowserRouter>
            <HowToUse />
        </BrowserRouter>
    );

    const instructions = screen.getAllByRole('heading', { level: 3 });

    expect(instructions.length).toBe(3);
    expect(instructions[0].textContent).toBe('Step 1) Add exercises');
    expect(instructions[1].textContent).toBe('Step 2) Create a routine');
    expect(instructions[2].textContent).toBe('Step 3) Work out!');
});


test('links point to the right pages', () => {
    render(
        <BrowserRouter>
            <HowToUse />
        </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    const exercisesLink = links[0];
    const routinesLink = links[1];
    const workoutLink = links[2];

    expect(links.length).toBe(3);
    expect(exercisesLink.getAttribute('href')).toBe('/exercises');
    expect(routinesLink.getAttribute('href')).toBe('/routines');
    expect(workoutLink.getAttribute('href')).toBe('/workout');
});