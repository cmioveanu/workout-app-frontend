import { createSlice } from '@reduxjs/toolkit';



export const routinesSlice = createSlice({
  name: 'routines',
  initialState: {
    routinesList: [],
    routinesExercisesList: [],
    activeRoutine: { name: "No routine available", id: 0 },
    editRoutineShow: false,
  },
  reducers: {
    getRoutinesList: (state, action) => {
      state.routinesList = action.payload;
    },
    getRoutinesExercisesList: (state, action) => {
      state.routinesExercisesList = action.payload;
    },
    changeActiveRoutine: (state, action) => {
      state.activeRoutine = action.payload;
    },
    toggleEditRoutinesShow: (state, action) => {
      state.editRoutineShow = !state.editRoutineShow;
    }
  }
});

export const { getRoutinesList, getRoutinesExercisesList, changeActiveRoutine, toggleEditRoutinesShow } = routinesSlice.actions;
export default routinesSlice.reducer;
