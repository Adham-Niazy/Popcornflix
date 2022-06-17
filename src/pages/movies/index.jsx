import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MoviesList from '../../components/MoviesList';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const temp = false;
  if (temp) {
    setPage(2);
  }

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
      <MoviesList movies={data} />
    </div>
  );
}

export default Movies;
