import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import {
  Actors,
  MovieInformation,
  MoviesList,
  Profile,
} from '../pages';
import { Navbar } from '.';
import useStyles from './styles';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
