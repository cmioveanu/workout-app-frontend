import { createSlice } from '@reduxjs/toolkit';

export const workoutSlice = createSlice({
    name: "workout",
    initialState: {
        workoutExercises: [],
        totalTime: 0,
        totalTimerActive: false,
    },
    reducers: {
        getWorkoutExercises: (state, action) => {
            state.workoutExercises = action.payload;
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
            state.workoutExercises[indexOfExercise].negatives += negatives;
        },
        startTotalTime: (state) => {
            state.totalTimerActive = true;
        },
        stopTotalTime: (state) => {
            state.totalTimerActive = false;
        },
        updateTotalTime: (state) => {
            state.totalTime += 1;
        }
    }
});

export const { getWorkoutExercises, changeTUL, changeNegatives,
    startTotalTime, stopTotalTime, updateTotalTime } = workoutSlice.actions;
export default workoutSlice.reducer;