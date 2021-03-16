import { createSlice } from '@reduxjs/toolkit';



export const routinesSlice = createSlice({
  name: 'routines',
  initialState: {
    routinesList: [],
    activeRoutine: { name: "N/A", id: 0 },
    editRoutineShow: false,
  },
  reducers: {
    getRoutinesList: (state, action) => {
      state.routinesList = action.payload
    },
    changeActiveRoutine: (state, action) => {
      state.activeRoutine = action.payload;
    },
    toggleEditRoutinesShow: (state, action) => {
      state.editRoutineShow = !state.editRoutineShow;
    }
  }
});

export const { getRoutinesList, changeActiveRoutine, toggleEditRoutinesShow } = routinesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

/*
export const getExercisesListAsync = () => dispatch => {
  fetch("http://localhost:8080/myExercises")
    .then(res => res.json())
    .then(jsonRes => dispatch(getExercisesList(jsonRes)));
};
*/

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectExercises = state => state.exercises.exercisesList;

export default routinesSlice.reducer;
