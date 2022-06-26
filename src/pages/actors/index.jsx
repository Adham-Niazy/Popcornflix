import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Button, Typography, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { useGetActorQuery } from '../../services/TMDB';
import useStyles from './styles';
import ActorMovies from './actorMovies';

function Actors() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const { data, isFetching, error } = useGetActorQuery(id);
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography variant="h5">Error in fetching actor..!</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color="primary">
          Go back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img className={classes.image} src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`} alt={data?.name} />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{data?.name}</Typography>
          <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
          <Typography variant="body1" align="justify" paragraph>{data?.biography || 'Sorry, no biograpghy yet..!'}</Typography>
          <Box marginTop="2rem" display="flex">
            <Button variant="outlined" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
          </Box>
        </Grid>
      </Grid>
      <ActorMovies id={id} />
    </>
  );
}

export default Actors;
