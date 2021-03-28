import React, { useEffect } from 'react';

import { Provider } from 'react-redux'; // redux
import store from './redux/store'; // redux
// import { loadUser } from './redux/auth/authActions';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Container from './components/layout/Content';

import { BrowserRouter as Router } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // console.log('store', store.getState());
  return (
    <div className={classes.root}>
      <Provider store={store}>
        <CssBaseline />
        <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <Router>
          <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
          <Container open={open} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
