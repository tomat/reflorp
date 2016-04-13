import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const LoadMoreButton = ({ onClick, loading }) => (
  <div className={['reflorp-loader', 'reflorp-loader-sm', (loading ? 'reflorp-loader-loading' : '')].join(' ')} style={{ display: 'inline-block' }}>
    <Button bsStyle="primary" bsSize="large" onClick={onClick}>Load more</Button>
  </div>
);

LoadMoreButton.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default LoadMoreButton;
