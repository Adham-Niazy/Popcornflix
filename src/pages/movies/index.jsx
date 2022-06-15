import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';

function MoviesList() {
  const { data } = useGetMoviesQuery();
  console.log(data);
  return (
    <div>
      <MoviesList />
    </div>
  );
}

export default MoviesList;
