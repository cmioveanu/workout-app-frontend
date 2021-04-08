import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { logOut } from './LoginSlice';

import { Login } from './Login';
import { Header } from '../Header/Header';


test('logs in if username and password valid', async () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Header />
                <Login />
            </Provider>
        </BrowserRouter>
    );

    //if links are not displayed, user is not logged in
    const beforeWorkoutLink = screen.queryByText('Work out');
    const beforeExerciseLink = screen.queryByText('Exercises');
    expect(beforeWorkoutLink).toBeNull();
    expect(beforeExerciseLink).toBeNull();

    //log in
    const username = screen.getByLabelText('Username:');
    const password = screen.getByLabelText('Password:');
    const login = screen.getByRole('button');

    fireEvent.change(username, { target: { value: 'TestUser' } });
    fireEvent.change(password, { target: { value: 'TestPassword' } });
    fireEvent.click(login);

    //expecting links to be displayed, because user is now logged in
    await waitFor(() => {
        const workoutLink = screen.getByText('Work out');
        const exerciseLink = screen.getByText('Exercises');
        expect(workoutLink).toBeInTheDocument();
        expect(exerciseLink).toBeInTheDocument();
    })

    //log back out after testing
    store.dispatch(logOut());
});


test('links correctly to Register page', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Login />
            </Provider>
        </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/register');
});

