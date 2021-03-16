import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from '../features/Exercises/ExercisesSlice';
import routinesReducer from '../features/Routines/RoutinesSlice';

export default configureStore({
  reducer: {
    exercises: exercisesReducer,
    routines: routinesReducer
  },
});
