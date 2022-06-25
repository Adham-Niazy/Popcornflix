import React from 'react';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove } from '@mui/icons-material';

import useStyles from './styles';

function ActionsGroup({ data, setOpen }) {
  const classes = useStyles();
  const isMovieFavorited = true;
  const isMovieWatchlisted = true;
  const addToFavorite = () => {

  };
  const addToWatchlist = () => {

  };
  return (
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
            {data?.videos?.results?.length && (
              <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>
                Trailer
              </Button>
            )}
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} justifyContent="end" className={classes.buttonsContainer}>
          <ButtonGroup size="medium" variant="outlined">
            <Button onClick={addToFavorite}>
              {!isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
            </Button>
            <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
              {isMovieWatchlisted ? 'Watchlisted' : 'Watchlist'}
            </Button>
          </ButtonGroup>
        </Grid>
      </div>
    </Grid>
  );
}

export default ActionsGroup;
