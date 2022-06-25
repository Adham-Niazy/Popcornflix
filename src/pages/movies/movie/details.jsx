import React from 'react';
import { Typography, Grid, Box, Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import genreIcons from '../../../assets/genres';
import { selectGenreOrCategory } from '../../../features/currentGenreOrCategory';
import useStyles from './styles';

function MovieDetails({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <>
      <Typography variant="h3" gutterBottom>
        {data?.title} ({data.release_date.split('-')[0]})
      </Typography>
      <Typography variant="h5" gutterBottom>
        {data?.tagline}
      </Typography>
      <Grid item display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center">
        <Box display="flex" align="center">
          <Rating readOnly value={data.vote_average / 2} />
          <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
            {data?.vote_average} / 10
          </Typography>
        </Box>
        <Typography variant="h6" align="center" gutterBottom>
          {data?.runtime} min {data?.spoken_languages.length > 0 ? `/ ${data?.spoken_languages[0].name}` : ''}
        </Typography>
      </Grid>
      <Grid item className={classes.genresContainer}>
        {data?.genres?.map((genre) => (
          <Link key={genre.name} className={classes.links} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))} style={{ marginRight: '20px' }}>
            <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
            <Typography color="textPrimary" variant="subtitle1">{genre.name}</Typography>
          </Link>
        ))}
      </Grid>
      <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
        Overview
      </Typography>
      <Typography style={{ marginBottom: '2rem' }}>
        {data?.overview}
      </Typography>
    </>
  );
}

export default MovieDetails;
