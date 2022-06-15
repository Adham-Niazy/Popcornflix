import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';

import useStyles from './styles';
import darkLogo from '../../assets/Logo/Popcornflix.png';
import LightLogo from '../../assets/Logo/Popcornflix (1).png';

// Mock Data
import { categories, mockCategories } from './mockData';

function Sidebar({ setMobileOpen }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Link to="/" className={classes.imageLink}>
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
            <ListItem onClick={() => { }} button>
              {/* <ListItemIcon>
                <img src={darkLogo} className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {mockCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => { }} button>
              {/* <ListItemIcon>
                <img src={darkLogo} className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}

export default Sidebar;
