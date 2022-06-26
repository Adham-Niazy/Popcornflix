import React from 'react';
import { Box, CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import genreIcons from '../../assets/genres';
import darkLogo from '../../assets/Logo/Popcornflix.png';
import LightLogo from '../../assets/Logo/Popcornflix (1).png';
import { useGetGenresQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

// Mock Data
import { categories } from './staticData';

function Sidebar({ setMobileOpen }) {
  const classes = useStyles();
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const dispatch = useDispatch();
  return (
    <>
      <Link to="/" className={classes.imageLink} onClick={() => setMobileOpen(false)}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? LightLogo : darkLogo}
          alt="Popcornflix Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem
              onClick={() => {
                dispatch(selectGenreOrCategory(value));
                setMobileOpen(false);
              }}
              button
              selected={genreIdOrCategoryName === value}
            >
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (data?.genres?.map(({ id, name }) => (
          <Link key={id} className={classes.links} to="/">
            <ListItem
              onClick={() => {
                dispatch(selectGenreOrCategory(id));
                setMobileOpen(false);
              }}
              button
              selected={genreIdOrCategoryName === id}
            >
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        )))}
      </List>
    </>
  );
}

export default Sidebar;
