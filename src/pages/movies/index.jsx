import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MoviesList from '../../components/MoviesList';
import { Pagination, FeaturedMovie } from '../../components';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 17 : 19;

  useEffect(() => {
    setPage(1);
    return () => {
      setPage(1);
    };
  }, [genreIdOrCategoryName, searchQuery]);

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
      <FeaturedMovie movie={data.results[0]} />
      <MoviesList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination page={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
}

export default Movies;
