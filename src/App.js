import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Header } from './features/Header/Header';
import { Exercises } from './features/Exercises/Exercises';
import { ExerciseHistory } from './features/ExerciseHistory/ExerciseHistory';
import { Routines } from './features/Routines/Routines';
import { RoutineHistory } from './features/RoutinesHistory/RoutineHistory';

import { getExercisesList, changeActiveExercise } from './features/Exercises/ExercisesSlice';

function App() {
  const dispatch = useDispatch();

  /* Get exercises and set first index as active element when app mounts. 
     This needs to be done in the App component
     because both exercises and routines pages depend on it.
  */
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
              <Route exact path="/exercises">
                <Exercises />
                <ExerciseHistory />
              </Route>
              <Route exact path="/routines">
                <Routines />
                <RoutineHistory />
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
