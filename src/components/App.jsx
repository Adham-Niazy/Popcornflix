import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import {
  Actors,
  MovieInformation,
  Movies,
  Profile,
} from '../pages';
import Navbar from './Navbar';
import useStyles from './styles';
import useAlan from './Alan-Ai/Alan';

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const alanBtnContainer = useRef();
  useAlan();

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
          <Route path="/" element={<Movies />} />
          <Route path="/approved" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
}

export default App;
