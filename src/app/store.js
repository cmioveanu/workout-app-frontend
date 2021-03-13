import { configureStore } from '@reduxjs/toolkit';
import exercisesReducer from '../features/Exercises/ExercisesSlice';

export default configureStore({
  reducer: {
    exercises: exercisesReducer,
  },
});
