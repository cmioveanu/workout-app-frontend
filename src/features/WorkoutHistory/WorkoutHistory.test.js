import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../app/store';
import { getWorkoutExercises, stopTotalTime, toggleShowEditWorkout } from '../Workout/WorkoutSlice';

import { WorkoutHistory } from './WorkoutHistory';

import { exercises, routinesExList } from '../../mocks/testData';


test('renders exercises for current workout', () => {

});


test('renders time under load and negatives for all exercises', () => {

});


test('renders and closes the Edit modal with no changes', () => {

});


test('changes time under load and negatives when edited in the modal', () => {

});


test('records the workout and resets to 0', () => {

});