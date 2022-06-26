import React, { useState } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';

import { useGetMovieQuery } from '../../../services/TMDB';
import useStyles from './styles';
import MovieDetails from './details';
import TopCast from './topCast';
import ActionsGroup from './actionsGroup';
import Recommendation from './recommendation';
import Trailer from './trailer';

function MovieInformation() {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const [open, setOpen] = useState(false);

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
      <Grid item sm={12} lg={4} style={{ marginBottom: '30px' }}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <MovieDetails data={data} />
        <TopCast data={data} />
        <ActionsGroup data={data} setOpen={setOpen} />
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Recommendation id={id} />
      </Box>
      <Trailer data={data} open={open} setOpen={setOpen} />
    </Grid>
  );
}

export default MovieInformation;
