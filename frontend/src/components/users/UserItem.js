import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({ user }) => {
  return (
    <li style={{ listStyleType: 'none' }}>
      <a href={`${user._id}`}>
        <p>
          {user.username} - {user.email}
        </p>
      </a>
    </li>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;
