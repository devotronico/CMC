import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const ProfileStats = ({
  card,
  isAuthenticated,
  user: {
    name,
    email,
    token,
    id,
    avatar,
    role,
    isActive,
    isFake,
    login_at,
    logout_at,
    register_at
  }
}) => {
  return (
    <Card className={card}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem href="#simple-list">
          <ListItemText primary={`Nome: ${name} `} />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary={`Email: ${email} `} />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary={`Token: ${token} `} />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText
            primary={`Autenticato: ${isAuthenticated ? 'SI' : 'NO'} `}
          />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary={`Id: ${id} `} />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary="Avatar" />
          <ListItemAvatar>
            <Avatar alt={name} src={avatar} variant="square" />
          </ListItemAvatar>
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary={`Ruolo: ${role} `} />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary={`Attivo: ${isActive ? 'SI' : 'NO'} `} />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary={`Utente finto: ${isFake ? 'SI' : 'NO'} `} />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary={`Data ultimo Login: ${login_at} `} />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary={`Data ultimo Logout: ${logout_at} `} />
        </ListItem>
        <ListItem href="#simple-list">
          <ListItemText primary={`Data Iscrizione: ${register_at} `} />
        </ListItem>
      </List>
    </Card>
  );
};

ProfileStats.propTypes = {
  card: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

export default ProfileStats;
