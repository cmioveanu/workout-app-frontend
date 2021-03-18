import { createSlice } from '@reduxjs/toolkit';

export const workoutSlice = createSlice({
    name: "workout",
    initialState: {
        workoutExercises: []
    },
    reducers: {
        getWorkoutExercises: (state, action) => {
            const exercisesArray = action.payload;
            
            const exercisesWithStats = exercisesArray.map(exercise => ({
                name: exercise.name,
                id: exercise.exercises_routines_id,
                timeUnderLoad: 0,
                negatives: 0
            }));
            state.workoutExercises = exercisesWithStats;
        },
        changeTUL: (state, action) => {
            const timeUnderLoad = action.payload.timeUnderLoad;
            const exerciseName = action.payload.name;
            
            const indexOfExercise = state.workoutExercises.findIndex(exercise => exercise.name === exerciseName);
            state.workoutExercises[indexOfExercise].timeUnderLoad = timeUnderLoad;
        },
        changeNegatives: (state, action) => {
            const negatives = action.payload.negatives;
            const exerciseName = action.payload.name;
            
            const indexOfExercise = state.workoutExercises.findIndex(exercise => exercise.name === exerciseName);
            state.workoutExercises[indexOfExercise].negatives = negatives;
        }
    }
});

export const { getWorkoutExercises, changeTUL, changeNegatives } = workoutSlice.actions;
export default workoutSlice.reducer;