import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from '../features/Exercises/ExercisesSlice';
import routinesReducer from '../features/Routines/RoutinesSlice';
import workoutReducer from '../features/Workout/WorkoutSlice';

export default configureStore({
  reducer: {
    exercises: exercisesReducer,
    routines: routinesReducer,
    workout: workoutReducer
  },
});
