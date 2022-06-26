import { Box, Typography, Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

function Profile() {
  const { user } = useSelector((state) => state.user);

  const favoriteMovies = [];

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <Box>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" style={{ marginBottom: '1rem' }}>My Profile - {user.username}</Typography>
        <Button variant="outlined" color="error" onClick={logout} style={{ marginBottom: '1rem' }}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {
        !favoriteMovies.length ? (
          <Typography variant="h5">Add favorite or watchlist some movies to see them here!</Typography>
        ) : (
          <Box>
            Favorite Movies
          </Box>
        )
      }
    </Box>
  );
}

export default Profile;
