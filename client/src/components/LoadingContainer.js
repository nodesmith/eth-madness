import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import ViewEntry from './ViewEntry';

/**
 * Simple spinner, triggers a passed load action.
 */
const LoadingContainer = (props) => {
  const { isLoading, realProps, loadAction } = props;
  if (isLoading) {
    // Trigger the load action, this shouldn't trigger one if one is already in progress
    loadAction();
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (<ViewEntry {...realProps} />);
}

LoadingContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadAction: PropTypes.func.isRequired,
  realProps: PropTypes.object.isRequired,
};

export default (LoadingContainer);