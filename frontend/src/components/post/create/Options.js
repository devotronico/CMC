import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'fit-content',
    // border: `1px solid ${theme.palette.divider}`,
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    // overflow: 'hidden',
    '& button': {
      margin: theme.spacing(1.5)
    },
    '& svg': {
      margin: theme.spacing(1.5)
    },
    '& hr': {
      margin: theme.spacing(0, 0.5)
    }
  },
  button: {
    color: '#546e7a',
    width: '32px',
    height: '32px',
    padding: '0',
    minWidth: '32px'
  }
}));

export default function Options() {
  const classes = useStyles();

  return (
    <div>
      <Grid container alignItems="center" className={classes.root}>
        <Button className={classes.button}>H1</Button>
        <Button className={classes.button}>H2</Button>
        <Button className={classes.button}>H3</Button>
        <Button className={classes.button}>H4</Button>
        <Button className={classes.button}>H5</Button>
        <Button className={classes.button}>H6</Button>
        <Divider orientation="vertical" flexItem />
        <FormatAlignLeftIcon />
        <FormatAlignCenterIcon />
        <FormatAlignRightIcon />
        <Divider orientation="vertical" flexItem />
        <FormatBoldIcon />
        <FormatItalicIcon />
        <FormatUnderlinedIcon />
      </Grid>
      <Divider />
    </div>
  );
}
