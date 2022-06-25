import React from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';

import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';

import { useGetMovieQuery } from '../../../services/TMDB';

import useStyles from './styles';
import MovieDetails from './details';
import TopCast from './topCast';
import ActionsGroup from './actionsGroup';

function MovieInformation() {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <Link to="/">
          Something has gone wrong - Go back
        </Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <MovieDetails data={data} />
        <TopCast data={data} />
        <ActionsGroup data={data} />
      </Grid>
    </Grid>
  );
}

export default MovieInformation;
