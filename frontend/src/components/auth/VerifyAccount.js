import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verification } from '../../redux/auth/authActions';

// import Typography from '@material-ui/core/Typography';

const VerifyAccount = ({ verification, history }) => {
  const { hash } = useParams();
  verification(hash, history);
  return (
    <div>
      {/* <Typography variant="h5" gutterBottom>
        Verification
      </Typography> */}
    </div>
  );
};

VerifyAccount.propTypes = {
  verification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { verification })(VerifyAccount);
