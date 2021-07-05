import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { Account } from './features/Account/Account';
import { HowToUse } from './features/HowToUse/HowToUse';
import { LandingPage } from './features/LandingPage/LandingPage';


//import action creators
import { getRoutinesList, getRoutinesExercisesList, changeActiveRoutine } from './features/Routines/RoutinesSlice';
import { getExercisesList, changeActiveExercise } from './features/Exercises/ExercisesSlice';
import { logIn } from './features/Login/LoginSlice';


const App = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.login.loggedIn);

  useEffect(() => {
    //if user is logged in on the server, set the state as logged in
    fetch('api/account/checkLoginStatus').then(res => {
        if (res.status === 200 || res.status === 304) {
            dispatch(logIn());
        }
    });
}, [dispatch]);


  //get Routines and set first index as active routine when component mounts
  useEffect(() => {
    const getRoutines = async () => {
      const routines = await fetch("api/routines");
      const jsonRoutines = await routines.json();

      dispatch(getRoutinesList(jsonRoutines));
      dispatch(changeActiveRoutine(jsonRoutines[0]));
    };

    if (loggedIn) {
      getRoutines();
    }
  }, [dispatch, loggedIn]);


  //get the exercises that belong to routines
  useEffect(() => {
    const getExercisesRoutines = async () => {
      const exercisesRoutines = await fetch("api/routines/exercises");
      const jsonExercisesRoutines = await exercisesRoutines.json();

      dispatch(getRoutinesExercisesList(jsonExercisesRoutines));
    };

    if (loggedIn) {
      getExercisesRoutines();
    }
  }, [dispatch, loggedIn]);


  //get exercises and set first index as active element when component mounts
  useEffect(() => {
    const getExercises = async () => {
      const exercises = await fetch("api/exercises");
      const jsonExercises = await exercises.json();

      dispatch(getExercisesList(jsonExercises));
      dispatch(changeActiveExercise(jsonExercises[0]));
    };

    if (loggedIn) {
      getExercises();
    }
  }, [dispatch, loggedIn]);


  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="mainContainer">
          <main>
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>

              <Route exact path="/workout">
                {!loggedIn ? <Redirect to="/login" /> :
                  <Fragment>
                    <Workout />
                    <WorkoutHistory />
                  </Fragment>
                }
              </Route>

              <Route exact path="/history">
                {!loggedIn ? <Redirect to="/login" /> : <History />}
              </Route>

              <Route exact path="/exercises">
                {!loggedIn ? <Redirect to="/login" /> :
                  <Fragment>
                    <Exercises />
                    <ExerciseHistory />
                  </Fragment>
                }
              </Route>

              <Route exact path="/routines">
                {!loggedIn ? <Redirect to="/login" /> :
                  <Fragment>
                    <Routines />
                    <RoutineHistory />
                  </Fragment>
                }
              </Route>

              <Route exact path="/howtouse">
                {!loggedIn ? <Redirect to="/login" /> : <HowToUse />}
              </Route>

              <Route exact path="/login">
                <Login />
              </Route>

              <Route exact path="/register">
                <Register />
              </Route>

              <Route exact path="/account">
                {!loggedIn ? <Redirect to="/login" /> : <Account />}
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
