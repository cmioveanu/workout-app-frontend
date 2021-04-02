//import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { LandingPage } from './LandingPage';


test('renders image, heading and buttons', () => {
    render(
        <BrowserRouter>
            <LandingPage />
        </BrowserRouter>
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    const loginButton = buttons[0];
    const registerButton = buttons[1];
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
});


test('buttons have correct links', () => {
    render(
        <BrowserRouter>
            <LandingPage />
        </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    const loginButtonLink = links[0];
    const registerButtonLink = links[1];

    expect(loginButtonLink.getAttribute('href')).toBe('/login');
    expect(registerButtonLink.getAttribute('href')).toBe('/register');
});