import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../app/store';
import { logIn, logOut } from '../Login/LoginSlice';
import { Header } from './Header';


test('renders logo', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </BrowserRouter>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
});


test('only landing page, login and account links render correctly when logged out', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    const logoLink = links[0];
    const loginLink = links[1];
    const accountLink = links[2];

    expect(links.length).toBe(3);
    expect(logoLink.getAttribute('href')).toBe('/');
    expect(loginLink.getAttribute('href')).toBe('/login');
    expect(accountLink.getAttribute('href')).toBe('/account');
});


test('workout related links are rendered correctly after login', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </BrowserRouter>
    );

    store.dispatch(logIn());

    const links = screen.getAllByRole('link');
    const workOutLink = links[1];
    const historyLink = links[2];
    const exercisesLink = links[3];
    const routinesLink = links[4];
    const howToUseLink = links[5];

    expect(links.length).toBe(8);
    expect(workOutLink.getAttribute('href')).toBe('/workout');
    expect(historyLink.getAttribute('href')).toBe('/history');
    expect(exercisesLink.getAttribute('href')).toBe('/exercises');
    expect(routinesLink.getAttribute('href')).toBe('/routines');
    expect(howToUseLink.getAttribute('href')).toBe('/howtouse');
});


test('log out link renders and works correctly after login', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </BrowserRouter>
    );

    store.dispatch(logIn());

    const links = screen.getAllByRole('link');
    const logOutLink = links[6];
    expect(logOutLink.textContent).toBe('Log out');

    fireEvent.click(logOutLink);

    const newLinks = screen.getAllByRole('link');
    const loginLink = newLinks[1];
    expect(loginLink.textContent).toBe('Login');
});

