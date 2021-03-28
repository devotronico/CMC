/* eslint-disable import/first */
import React, { useState, useEffect, useContext } from 'react';
import { DeviceContext } from '../../layout/Container';
import * as utils from '../../utils/filters';

console.log(utils.filters());

import FiltersPanelTop from './FiltersPanelTop';
import FiltersPanelBottom from './FiltersPanelBottom';
import FilterButtons from './FilterButtons';

import { makeStyles } from '@material-ui/core/styles';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  desktop: {
    width: 520,
    maxWidth: '100%'
  },
  mobile: {
    width: '100%'
  },
  sideList: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    padding: '16px 8px'
  },
  panels: {
    flexGrow: 1,
    padding: '0 24px'
  },
  panel: {
    padding: '16px 0'
  }
}));

export default function Filter({ jsonRows, setRows }) {
  const device = useContext(DeviceContext);
  // console.log('DEVICE', device);

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const toggleDrawer = open => event => {
    // if (
    //   event &&
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }

    setIsOpen(open);
  };

  useEffect(() => {
    console.log('FILTERS', filters);
  }, [filters]);

  const handleClickFilterButton = e => {
    let rows = JSON.parse(jsonRows);
    console.log('ROWS 1', rows);

    if (Object.keys(filters).length === 0) {
      console.log('TEST');
      return setRows(rows);
    }

    rows = filters.role ? utils.filterByRole(rows, filters.role) : rows;

    rows =
      filters.tags && filters.tags.length
        ? utils.filterByTags(rows, filters.tags)
        : rows;

    rows = filters.ages ? utils.filterByAges(rows, filters.ages) : rows;

    rows = filters.status ? utils.filterByStatus(rows, filters.status) : rows;

    rows =
      filters.hasOwnProperty('isAuthenticated') &&
      filters.isAuthenticated !== -1
        ? utils.filterByOnlineState(rows, filters.isAuthenticated)
        : rows;

    rows =
      filters.register_at && filters.register_at.length
        ? utils.filterByDate(rows, filters.register_at)
        : rows;
    setRows(rows);
    console.log('ROWS 2', rows);
  };
  /// </TEST>

  const sideList = () => (
    <div
      role="presentation"
      // onKeyDown={toggleDrawer(false)}
      className={classes.sideList}
    >
      <div className={classes.button}>
        <Button onClick={toggleDrawer(false)} startIcon={<CloseIcon />}>
          close
        </Button>
      </div>

      <div className={classes.panels}>
        <div className={classes.panel}>
          <FiltersPanelTop filters={filters} setFilters={setFilters} />
        </div>
        <div className={classes.panel}>
          <FiltersPanelBottom filters={filters} setFilters={setFilters} />
        </div>
      </div>
      <FilterButtons
        handleClickFilterButton={handleClickFilterButton}
        setFilters={setFilters}
        setIsOpen={setIsOpen}
      />
    </div>
  );

  return (
    <div id="filter">
      <Button
        id="btn-filter"
        variant="outlined"
        color="primary"
        startIcon={<FilterListIcon />}
        onClick={toggleDrawer(true)}
      >
        Show filters
      </Button>

      <SwipeableDrawer
        classes={{
          paper: classes[device]
        }}
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList()}
      </SwipeableDrawer>
    </div>
  );
}
