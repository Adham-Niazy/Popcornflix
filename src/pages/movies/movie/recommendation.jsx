import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import MoviesList from '../../../components/MoviesList';

import { useGetRecommendationsQuery } from '../../../services/TMDB';

function Recommendation({ id }) {
  const { data, isFetching } = useGetRecommendationsQuery({ movieId: id, list: 'recommendations' });
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  return (
    data && (
      <>
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        <MoviesList movies={data} numberOfMovies={12} />
      </>
    )
  );
}

export default Recommendation;
