import React from 'react';
import logo from '../../images/logo.svg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Menu as MenuIcon } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  }
}));

function Navbar({ isOpen, toggleSidebar }) {
  const classes = useStyles();

  return (
    <AppBar
      id="navbar"
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isOpen
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open sidebar"
          onClick={toggleSidebar(true)}
          edge="start"
          className={clsx(classes.menuButton, isOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <a href="/">
          <img
            src={logo}
            style={{ width: '50px', margin: 'auto', display: 'block' }}
            alt="Logo"
          />
        </a>
        <Typography variant="h6" noWrap>
          Gestionale
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
