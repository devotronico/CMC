import React from 'react';

import UpdateName from './UpdateName';
import UpdateRole from './UpdateRole';
import UpdateAge from './UpdateAge';
import UpdateOnline from './UpdateOnline';
import UpdateDate from './UpdateDate';
import UpdateDatetime from './UpdateDatetime';
import UpdateClose from './UpdateClose';
// import DeleteRows from './DeleteRows';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: 'orange',
    padding: 4,
    flexGrow: 1,
    overflow: 'hidden'
  },
  grid: {
    // backgroundColor: 'red',
    padding: 4,
    overflow: 'hidden'
  },
  center: {
    // backgroundColor: 'salmon',
    height: 75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function UpdateGrid({ values, handleChange, handleUpdate }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
        className={classes.grid}
      >
        <Grid item xs={12} sm={6} md={3} lg={2} className={classes.center}>
          <UpdateName
            name={values.name}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} className={classes.center}>
          <UpdateRole
            role={values.role}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} className={classes.center}>
          <UpdateAge
            age={values.age}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} className={classes.center}>
          <UpdateOnline
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} className={classes.center}>
          <UpdateDatetime
            register_at={values.register_at}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />
          {/* <UpdateDate
            register_at={values.register_at}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2} className={classes.center}>
          <UpdateClose handleUpdate={handleUpdate} />
        </Grid>
      </Grid>
    </div>
  );
}
