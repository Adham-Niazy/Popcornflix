import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { Sidebar, Search } from '..';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { setUserData } from '../../features/auth';

function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  const REQUEST_TOKEN = localStorage.getItem('request_token');
  const SESSION_ID = localStorage.getItem('session_id');

  const loginUser = useCallback(async () => {
    if (REQUEST_TOKEN) {
      if (SESSION_ID) {
        const { data: userData } = await moviesApi.get(`/account?session_id=${SESSION_ID}`);
        dispatch(setUserData(userData));
      } else {
        const sessionId = await createSessionId();
        const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
        dispatch(setUserData(userData));
      }
    }
  }, [REQUEST_TOKEN]);

  useEffect(() => {
    loginUser();
  }, [loginUser]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => { setMobileOpen(true); }}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={() => { }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button color="inherit" component={Link} to={`/profile/${user.id}`} className={classes.linkButton} onClick={() => { }}>
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar style={{ width: 30, height: 30 }} alt="Profile" src="https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg" />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              classes={{ paper: classes.drawerPaper }}
              onClose={() => { setMobileOpen((prev) => !prev); }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
