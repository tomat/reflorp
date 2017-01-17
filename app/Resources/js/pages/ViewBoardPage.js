import React, { PropTypes, Component } from 'react';
import ViewBoard from 'components/ViewBoard';

/* eslint-disable react/prefer-stateless-function */
export default class ViewBoardPage extends Component {
  static propTypes = {
    params: PropTypes.object,
  };

  render() {
    const { params } = this.props;

    return (
      <ViewBoard id={params.id} />
    );
  }
}
