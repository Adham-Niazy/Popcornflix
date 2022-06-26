import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetMoviesByActorQuery } from '../../services/TMDB';
import MoviesList from '../../components/MoviesList';

function ActorMovies({ id, page }) {
  const { data, isFetching } = useGetMoviesByActorQuery({ id, page });
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
        <Box margin="2rem 0">
          <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        </Box>
        <MoviesList movies={data} numberOfMovies={12} />
      </>
    )
  );
}

export default ActorMovies;
