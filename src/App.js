import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {BrowserRouter} from 'react-router-dom';

import { Header } from './features/Header/Header';
import { Exercises } from './features/Exercises/Exercises';
import { ExerciseHistory } from './features/ExerciseHistory/ExerciseHistory';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <main>
        <Exercises />
        <ExerciseHistory />
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
