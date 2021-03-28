import React, { useState } from 'react';

import FilterTextfield from './FilterTextfield';
import FilterToggle from './FilterToggle';
import FilterDate from './FilterDate';

import { withStyles } from '@material-ui/core/styles';

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none'
  }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    padding: 0,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 0,
    '&$expanded': {
      minHeight: 0
    },
    '& > div': {
      padding: 0,
      margin: 0
    },
    '& > div > h5': {
      // backgroundColor: "yellow",
      color: '#263238',
      fontSize: '16px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '600',
      lineHeight: '20px',
      letterSpacing: '-0.05px'
    }
  },
  content: {
    '&$expanded': {
      margin: 0
    }
  },
  expanded: { margin: 0 }
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    // backgroundColor: "yellow",
    display: 'block',
    padding: theme.spacing(0),
    '& > *': {
      // backgroundColor: "red",
      marginTop: 30
    }
  }
}))(MuiExpansionPanelDetails);

export default function FilterPanelBottom({ filters, setFilters }) {
  /// <PANEL>
  const [expanded, setExpanded] = useState(false);

  const handlePanel = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  /// </PANEL>

  return (
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
        <Typography variant="h5" gutterBottom>
          Altri Filtri
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FilterTextfield filters={filters} setFilters={setFilters} />
        <FilterToggle filters={filters} setFilters={setFilters} />
        <FilterDate filters={filters} setFilters={setFilters} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
