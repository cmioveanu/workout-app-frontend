import { createSlice } from '@reduxjs/toolkit';


export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState: {
    exercisesList: ["Hello state"]
  },
  reducers: {
    getExercisesList: (state, action) => {
      state.exercisesList = action.payload;
    }
  }
});

export const { getExercisesList } = exercisesSlice.actions;

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

export default exercisesSlice.reducer;
