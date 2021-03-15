import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Header } from './features/Header/Header';
import { Exercises } from './features/Exercises/Exercises';
import { ExerciseHistory } from './features/ExerciseHistory/ExerciseHistory';
import { Routines } from './features/Routines/Routines';
import { RoutineHistory } from './features/RoutinesHistory/RoutineHistory';

function App() {
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
