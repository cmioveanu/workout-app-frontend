import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Account } from './Account';


beforeEach(() => {
    render(<Account />);
});


//used in tests for the email changing process
const emailChecks = (testPass, testEmail, confirmTestEmail) => {
    const password = screen.getByLabelText('Enter your password:');
    const email = screen.getByLabelText('New email address:');
    const emailConfirm = screen.getByLabelText('Confirm new email address:');
    const emailChange = screen.getByText('Change email address');

    fireEvent.change(password, { target: { value: testPass } });
    fireEvent.change(email, { target: { value: testEmail } });
    fireEvent.change(emailConfirm, { target: { value: confirmTestEmail } });
    fireEvent.click(emailChange);
}


//used in tests for the password changing process
const passwordChecks = (oldPass, newPass, newPassConfirm) => {
    const oldPassword = screen.getByLabelText('Enter old password:');
    const newPassword = screen.getByLabelText('New password:');
    const passwordConfirm = screen.getByLabelText('Confirm new password:');
    const passwordChange = screen.getByText('Change password');

    fireEvent.change(oldPassword, { target: { value: oldPass } });
    fireEvent.change(newPassword, { target: { value: newPass } });
    fireEvent.change(passwordConfirm, { target: { value: newPassConfirm } });
    fireEvent.click(passwordChange);
}


test('changes email when password correct', async () => {
    emailChecks('testPassword', 'test1@gmail.com', 'test1@gmail.com');

    await waitFor(() => {
        const textAlert = screen.getByText('Email changed.');
        expect(textAlert).toBeInTheDocument();
    });
});


test('displays error if password is wrong for email change', async () => {
    emailChecks('wrongPassword', 'test1@gmail.com', 'test1@gmail.com');

    await waitFor(() => {
        const textAlert = screen.getByText('Unable to change email. Please try again!');
        expect(textAlert).toBeInTheDocument();
    });
});


test('displays error if emails don\'t match', () => {
    emailChecks('testPassword', 'test1@gmail.com', 'wrongEmail@gmail.com');

    const textAlert = screen.getByText('Emails don\'t match. Try again!');
    expect(textAlert).toBeInTheDocument();
});


test('changes password when old password is correct', async () => {
    passwordChecks('testPassword', 'newPassword', 'newPassword');

    await waitFor(() => {
        const textAlert = screen.getByText('Password changed.');
        expect(textAlert).toBeInTheDocument();
    });
});


test('displays error if old password is wrong for password change', async () => {
    passwordChecks('wrongPassword', 'newPassword', 'newPassword');

    await waitFor(() => {
        const textAlert = screen.getByText('Unable to change password. Please try again!');
        expect(textAlert).toBeInTheDocument();
    });
});


test('displays error if passwords don\'t match', () => {
    passwordChecks('testPassword', 'newPassword', 'wrongPassword');

    const textAlert = screen.getByText('Passwords don\'t match. Try again!');
    expect(textAlert).toBeInTheDocument();
});
