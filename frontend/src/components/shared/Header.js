import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    textAlign: 'left',
    color: 'red',
    marginBottom: 15,
    padding: 10,
    '& span': {
      color: '#546e7a',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.33px'
    },
    '& h3': {
      color: '#263238',
      fontSize: '24px'
    },
    '& h6': {
      color: '#263238',
      lineHeight: '25px'
    }
  }
}));

const Header = ({ section, title, subtitle }) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Typography variant="overline" display="block" gutterBottom>
        {section}
      </Typography>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {subtitle}
      </Typography>
      <Divider />
    </div>
  );
};

Header.propTypes = {
  section: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default Header;
