import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MoviesList } from '../../components';

function Movies() {
  const { data, error, isFetching } = useGetMoviesQuery();
  // Loading State
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  // Empty State
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4"> No movies that match that name. <br /> Please search for something else. </Typography>
      </Box>
    );
  }
  // Error State
  if (error) return 'An error has occured.';
  return (
    <div>
      <MoviesList movies={data} />
    </div>
  );
}

export default Movies;
