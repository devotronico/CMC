import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {},
  title: {
    color: '#263238',
    fontSize: '16px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '20px',
    letterSpacing: '-0.05px'
  }
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function FilterPanel() {
  const classes = useStyles();

  /// <PANEL>
  const [expanded, setExpanded] = useState(false);

  const handlePanel = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  /// </PANEL>

  /// <SELECT>
  const [role, setRole] = useState('');

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSelectRole = event => {
    setRole(event.target.value);
  };
  /// </SELECT>

  return (
    <div>
      <ExpansionPanel
        square
        expanded={expanded === 'panel1'}
        onChange={handlePanel('panel1')}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography className={classes.title}>Applica Filtri</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
              Ruolo
            </InputLabel>
            <Select
              native
              value={role}
              onChange={handleSelectRole}
              labelWidth={labelWidth}
              inputProps={{
                name: 'role',
                id: 'role'
              }}
            >
              <option value="" />
              <option value="system">System</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Select>
          </FormControl>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Typography>Lorem Ipsum</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
