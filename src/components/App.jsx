import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();

  function getFavicon() {
    return document.getElementById('favicon');
  }

  if (theme.palette.mode === 'dark' && getFavicon().href.includes('favicon-light')) {
    getFavicon().href = getFavicon().href.replace('favicon-light', 'favicon');
  } else if (theme.palette.mode !== 'dark' && !getFavicon().href.includes('favicon-light')) {
    getFavicon().href = getFavicon().href.replace('favicon', 'favicon-light');
  }

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
