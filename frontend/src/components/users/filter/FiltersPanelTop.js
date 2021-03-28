import React, { useState } from 'react';

import FilterRole from './FilterRole';
import FilterTags from './FilterTags';
import FilterSlider from './FilterSlider';
import FilterRadio from './FilterRadio';
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
    display: 'block',
    padding: theme.spacing(0),
    '& > *': {
      marginTop: 30
    }
  }
}))(MuiExpansionPanelDetails);

export default function FilterPanelTop({ filters, setFilters }) {
  /// <PANEL>
  const [expanded, setExpanded] = useState('panel1');

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
          Applica i Filtri
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <FilterRole filters={filters} setFilters={setFilters} />
        <FilterTags filters={filters} setFilters={setFilters} />
        <FilterSlider filters={filters} setFilters={setFilters} />
        <FilterRadio filters={filters} setFilters={setFilters} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
