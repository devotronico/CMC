import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
// import {  } from 'react';

import { connect } from 'react-redux';
import { loadUser } from '../../redux/auth/authActions';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './Navbar';

import SidebarDesktopPrivate from './SidebarDesktopPrivate';
import SidebarDesktopPublic from './SidebarDesktopPublic';
import SidebarMobilePrivate from './SidebarMobilePrivate';
import SidebarMobilePublic from './SidebarMobilePublic';

import Content from './Content';
import RoutesPublic from '../router/RoutesPublic';
import RoutesPrivate from '../router/RoutesPrivate';

export const DeviceContext = createContext(null);

const sidebarWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f4f6f8',
    display: 'flex',
    minHeight: '100vh',
  },
  containerInOpenSidebar: {
    height: '100vh',
    overflow: 'hidden',
  },
  desktop: {
    // backgroundColor: 'green',
    padding: theme.spacing(9, 3, 3, 3),
  },
  mobile: {
    // backgroundColor: 'pink',
    padding: theme.spacing(6, 0, 4, 0),
  },
  sidebar: {
    // backgroundColor: 'blue',
    width: sidebarWidth,
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarTop: {
    // backgroundColor: 'green'
  },
  sidebarTopClose: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  sidebarBody: {
    // backgroundColor: "orange",
    overflow: 'hidden auto',
  },
  sidebarBot: {
    // backgroundColor: "pink",
    marginTop: 'auto',
  },
}));

const Container = ({ isLoading, loadUser, auth: { isAuthenticated, user } }) => {
  // console.log('Container');
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const device = matches ? 'desktop' : 'mobile';
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = (isOpen) => (event) => {
    setIsOpen(isOpen);
  };

  useEffect(() => {
    // console.log('Container: loadUser');
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    // console.log('CONTAINER isLoading: ', isLoading);
  }, [isLoading]);

  // if (loading) {
  //   return null;
  // }

  return (
    <div
      id="container"
      className={clsx(classes.root, classes[device], {
        [classes.containerInOpenSidebar]: isOpen,
      })}
    >
      <CssBaseline />
      <NavBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <DeviceContext.Provider value={device}>
        {isAuthenticated ? (
          <Router>
            {matches ? (
              <SidebarDesktopPrivate
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                username={user.username}
                role={user.role}
                sidebar={classes.sidebar}
                sidebarTop={classes.sidebarTop}
                sidebarTopClose={classes.sidebarTopClose}
                sidebarBody={classes.sidebarBody}
                sidebarBot={classes.sidebarBot}
              />
            ) : (
              <SidebarMobilePrivate
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                username={user.username}
                role={user.role}
                sidebar={classes.sidebar}
                sidebarTop={classes.sidebarTop}
                sidebarTopClose={classes.sidebarTopClose}
                sidebarBody={classes.sidebarBody}
                sidebarBot={classes.sidebarBot}
              />
            )}
            <Content isOpen={isOpen} device={device}>
              <RoutesPrivate role={user.role} />
            </Content>
          </Router>
        ) : (
          <Router>
            {matches ? (
              <SidebarDesktopPublic
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                sidebar={classes.sidebar}
                sidebarTop={classes.sidebarTop}
                sidebarTopClose={classes.sidebarTopClose}
                sidebarBody={classes.sidebarBody}
                sidebarBot={classes.sidebarBot}
              />
            ) : (
              <SidebarMobilePublic
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                sidebar={classes.sidebar}
                sidebarTop={classes.sidebarTop}
                sidebarTopClose={classes.sidebarTopClose}
                sidebarBody={classes.sidebarBody}
                sidebarBot={classes.sidebarBot}
              />
            )}
            <Content isOpen={isOpen} device={device}>
              <RoutesPublic />
            </Content>
          </Router>
        )}
      </DeviceContext.Provider>
    </div>
  );
};

Container.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Container);
