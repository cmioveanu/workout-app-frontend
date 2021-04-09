import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../../app/store';

import { Register } from './Register';


beforeEach(() => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Register />
            </Provider>
        </BrowserRouter>
    );
});


test('registers new user if username available and passwords match', async () => {
    const username = screen.getByLabelText('Username:');
    const password = screen.getByLabelText('Password:');
    const confirmPassword = screen.getByLabelText('Confirm Password:');
    const registerButton = screen.getByRole('button');

    fireEvent.change(username, { target: { value: 'TestUser' } });
    fireEvent.change(password, { target: { value: 'TestPassword' } });
    fireEvent.change(confirmPassword, { target: { value: 'TestPassword' } });
    fireEvent.click(registerButton);

    const userCreated = await screen.findByText('User created, you can log in now.');
    expect(userCreated).toBeInTheDocument();
});


test("renders error if passwords don't match", () => {
    const username = screen.getByLabelText('Username:');
    const password = screen.getByLabelText('Password:');
    const confirmPassword = screen.getByLabelText('Confirm Password:');
    const registerButton = screen.getByRole('button');

    fireEvent.change(username, { target: { value: 'TestUser' } });
    fireEvent.change(password, { target: { value: 'TestPassword' } });
    fireEvent.change(confirmPassword, { target: { value: 'BadPassword' } });
    fireEvent.click(registerButton);

    const error = screen.getByText("Password fields don't match. Try again.");
    expect(error).toBeInTheDocument();
});


test('renders error if username already exists', async () => {
    const username = screen.getByLabelText('Username:');
    const password = screen.getByLabelText('Password:');
    const confirmPassword = screen.getByLabelText('Confirm Password:');
    const registerButton = screen.getByRole('button');

    fireEvent.change(username, { target: { value: 'test1' } });
    fireEvent.change(password, { target: { value: 'TestPassword' } });
    fireEvent.change(confirmPassword, { target: { value: 'TestPassword' } });
    fireEvent.click(registerButton);

    const error = await screen.findByText('Email already exists. Please log in.');
    expect(error).toBeInTheDocument();
});


test('links correctly to Login page', () => {
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/login');
});