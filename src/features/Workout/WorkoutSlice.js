import { createSlice } from '@reduxjs/toolkit';

export const workoutSlice = createSlice({
    name: "workout",
    initialState: {
        workoutExercises: [],
        totalTime: 0,
        totalTimerActive: false,
        showEditWorkout: false
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
        addNegatives: (state, action) => {
            const negatives = parseInt(action.payload.negatives);
            const exerciseName = action.payload.name;

            const indexOfExercise = state.workoutExercises.findIndex(exercise => exercise.name === exerciseName);
            state.workoutExercises[indexOfExercise].negatives += negatives;
        },
        changeNegatives: (state, action) => {
            const negatives = parseInt(action.payload.negatives);
            const exerciseName = action.payload.name;
            
            const indexOfExercise = state.workoutExercises.findIndex(exercise => exercise.name === exerciseName);
            state.workoutExercises[indexOfExercise].negatives = negatives;
        },
        startTotalTime: (state) => {
            state.totalTimerActive = true;
        },
        stopTotalTime: (state) => {
            state.totalTimerActive = false;
        },
        resetTotalTime: (state) => {
            state.totalTime = 0;
        },
        updateTotalTime: (state) => {
            state.totalTime += 1;
        },
        toggleShowEditWorkout: (state) => {
            state.showEditWorkout = !state.showEditWorkout;
          }
    }
});

export const { getWorkoutExercises, changeTUL, changeNegatives, addNegatives,
    startTotalTime, stopTotalTime, updateTotalTime, resetTotalTime, toggleShowEditWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;