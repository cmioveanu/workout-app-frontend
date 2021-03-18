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

//import actions
import { getExercisesList, changeActiveExercise } from './features/Exercises/ExercisesSlice';


const App = () => {
  const dispatch = useDispatch();

  /* Get exercises and set first index as active exercise when app mounts. 
     This needs to be done in the App component
     because both Exercises and Routines/Edit components depend on it.
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
            </Switch>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
