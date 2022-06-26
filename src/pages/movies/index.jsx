import React, { useState } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MoviesList from '../../components/MoviesList';

function Movies() {
  const [page] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 16 : 18;

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
        <Typography variant="h4"> No movies that match that name..🙄🔎</Typography>
      </Box>
    );
  }
  // Error State
  if (error) return 'An error has occured.';
  return (
    <div>
      <MoviesList movies={data} numberOfMovies={numberOfMovies} />
    </div>
  );
}

export default Movies;
