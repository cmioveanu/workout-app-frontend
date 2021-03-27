import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//import components
import { Header } from './features/Header/Header';
import { Exercises } from './features/Exercises/Exercises';
import { ExerciseHistory } from './features/ExerciseHistory/ExerciseHistory';
import { Routines } from './features/Routines/Routines';
import { RoutineHistory } from './features/RoutinesHistory/RoutineHistory';
import { History } from './features/History/History';
import { Workout } from './features/Workout/Workout';
import { WorkoutHistory } from './features/WorkoutHistory/WorkoutHistory';
import { Login } from './features/Login/Login';
import { Register } from './features/Login/Register';


//import action creators
import { getRoutinesList, getRoutinesExercisesList, changeActiveRoutine } from './features/Routines/RoutinesSlice';
import { getExercisesList, changeActiveExercise } from './features/Exercises/ExercisesSlice';


const App = () => {
  const dispatch = useDispatch();


  //get Routines and set first index as active routine when component mounts
  useEffect(() => {
    const getRoutines = async () => {
      const routines = await fetch("http://localhost:8080/myRoutines");
      const jsonRoutines = await routines.json();

      dispatch(getRoutinesList(jsonRoutines));
      dispatch(changeActiveRoutine(jsonRoutines[0]));
    };

    getRoutines();
  }, [dispatch]);


  //get the exercises that belong to routines
  useEffect(() => {
    const getExercisesRoutines = async () => {
      const exercisesRoutines = await fetch("http://localhost:8080/myRoutines/exercises");
      const jsonExercisesRoutines = await exercisesRoutines.json();

      dispatch(getRoutinesExercisesList(jsonExercisesRoutines));
    };

    getExercisesRoutines();
  }, [dispatch])


  //get exercises and set first index as active element when component mounts
  useEffect(() => {
    const getExercises = async () => {
      const exercises = await fetch("http://localhost:8080/myExercises");
      const jsonExercises = await exercises.json();

      dispatch(getExercisesList(jsonExercises));
      dispatch(changeActiveExercise(jsonExercises[0]));
    };

    getExercises();
  }, [dispatch]);


  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="mainContainer">
          <main>
            <Switch>
              <Route exact path="/workout">
                <Workout />
                <WorkoutHistory />
              </Route>
              <Route exact path="/history">
                <History />
              </Route>
              <Route exact path="/exercises">
                <Exercises />
                <ExerciseHistory />
              </Route>
              <Route exact path="/routines">
                <Routines />
                <RoutineHistory />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
