import { createSlice } from '@reduxjs/toolkit';



export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercisesList: [],
    activeExercise: { name: "No exercise available", id: 0 },
    editExerciseShow: false,
  },
  reducers: {
    getExercisesList: (state, action) => {
      state.exercisesList = action.payload
    },
    changeActiveExercise: (state, action) => {
      state.activeExercise = action.payload;
    },
    toggleEditExercisesShow: (state, action) => {
      state.editExerciseShow = !state.editExerciseShow;
    }
  }
});


export const { getExercisesList, changeActiveExercise, toggleEditExercisesShow } = exercisesSlice.actions;
export default exercisesSlice.reducer;
