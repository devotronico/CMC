import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readUsers } from '../../../redux/users/usersActions';

import { ReactMUIDatatable } from 'react-material-ui-datatable';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import DeleteIcon from '@material-ui/icons/Delete';

const columns = [
  { name: 'name', label: 'Nome' },
  { name: 'email', label: 'Email' },
  { name: 'role', label: 'Ruolo' },
  {
    name: 'active',
    label: 'Attivo'
  }
];

const customCell = ({ value, column, row }) => {
  if (column.name === 'active') {
    return value === true ? 'SI' : 'NO';
  }
  return value;
};

const customToolbarSelectActions = ({
  data,
  selectedData,
  updateSelectedData,
  handleDelete
}) => (
  <React.Fragment>
    <IconButton
      onClick={() => {
        const nextSelectedData = data.reduce((nextSelectedData, row) => {
          if (!selectedData.includes(row)) {
            nextSelectedData.push(row);
          }

          return nextSelectedData;
        }, []);

        updateSelectedData(nextSelectedData);
      }}
    >
      <SwapHorizIcon />
    </IconButton>
    <IconButton
      onClick={() => {
        handleDelete(selectedData);
      }}
    >
      <DeleteIcon />
    </IconButton>
  </React.Fragment>
);

const Users = ({ readUsers, isLoading, users }) => {
  useEffect(() => {
    readUsers();
  }, [readUsers]);

  return isLoading ? (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        ATTENDERE RISPOSTA DEL SERVER
      </Typography>
    </div>
  ) : (
    <div className={'App'}>
      <ReactMUIDatatable
        title={'List'}
        data={users}
        columns={columns}
        customCell={customCell}
        toolbarSelectActions={customToolbarSelectActions}
      />
    </div>
  );
};

Users.propTypes = {
  readUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  users: state.users.users,
  isLoading: state.loader.isLoading
});

export default connect(mapStateToProps, { readUsers })(Users);
