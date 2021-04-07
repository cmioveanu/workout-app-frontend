import { render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { changeActiveRoutine } from '../Routines/RoutinesSlice';

import { RoutineHistory } from '../RoutinesHistory/RoutineHistory';


beforeEach(() => {
    const mockRoutines = [];
});


test('renders routines', () => {

});

test('renders history and edit buttons for all routines', () => {

});


test('creates new routines', () => {

});


test('displays and hides Edit component with no name change', () => {

});


test('edits routine name when new name typed in', () => {

});


test('deletes routine on Delete button click', () => {

});


test('changes active routine for routine history component', () => {

});