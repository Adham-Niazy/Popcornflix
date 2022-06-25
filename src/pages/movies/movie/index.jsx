import React from 'react';
import { Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import axios from 'axios';

import { useGetMovieQuery } from '../../../services/TMDB';
import { selectGenreOrCategory } from '../../../features/currentGenreOrCategory';
import useStyles from './styles';
import genreIcons from '../../../assets/genres';

function MovieInformation() {
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const dispatch = useDispatch();
  const isMovieFavorited = true;
  const isMovieWatchlisted = true;

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

  const addToFavorite = () => {

  };
  const addToWatchlist = () => {

  };
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction="column" lg={7}>
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
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data.credits?.cast?.map((character, i) => (character.profile_path && (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
            </Grid>
          ))).slice(0, 12)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                {data?.homepage && (
                  <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                    Website
                  </Button>
                )}
                {data?.imdb_id && (
                  <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                    IMDB
                  </Button>
                )}
                <Button onClick={() => { }} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} justifyContent="end" className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={addToFavorite} endIcon={!isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  {isMovieWatchlisted ? 'Watchlisted' : 'Watchlist'}
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieInformation;
