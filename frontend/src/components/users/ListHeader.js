import React from 'react';
import Search from './filter/Search';
import MyDialog from './create/MyDialog';
import Filter from './filter/Filter';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  header: {
    // backgroundColor: 'red',
    padding: 10
  },
  title: {
    '& span': {
      color: '#546e7a',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.33px'
    },
    '& h3': {
      color: '#263238',
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '28px',
      letterSpacing: -0.06,
      marginBottom: 0
    }
  }
}));

export default function UsersListHeader({ jsonRows, setRows }) {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Grid container spacing={2} justify="space-between" alignItems="flex-end">
        <Grid item>
          <div className={classes.title}>
            <Typography variant="overline" display="block" gutterBottom>
              SEZIONE
            </Typography>
            <Typography variant="h3" gutterBottom>
              Tabella e filtro
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <MyDialog />
          {/* <Button variant="contained" color="primary">
            Add Resource
          </Button> */}
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="space-between" alignItems="flex-end">
        <Grid item>
          <Search jsonRows={jsonRows} setRows={setRows} />
        </Grid>
        <Grid item>
          <Filter jsonRows={jsonRows} setRows={setRows} />
        </Grid>
      </Grid>
    </div>
  );
}
