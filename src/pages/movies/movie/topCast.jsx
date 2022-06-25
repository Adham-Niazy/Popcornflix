import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import useStyles from './styles';

function TopCast({ data }) {
  const classes = useStyles();
  return (
    <>
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
    </>
  );
}

export default TopCast;
