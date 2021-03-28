import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from '../features/Exercises/ExercisesSlice';
import routinesReducer from '../features/Routines/RoutinesSlice';
import workoutReducer from '../features/Workout/WorkoutSlice';
import loginReducer from '../features/Login/LoginSlice';

export default configureStore({
  reducer: {
    exercises: exercisesReducer,
    routines: routinesReducer,
    workout: workoutReducer,
    login: loginReducer
  },
});
