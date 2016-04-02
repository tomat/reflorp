import React, { PropTypes, Component } from 'react';
import ViewBoard from 'components/ViewBoard';
import { refetch } from 'react-reflorp';

/* eslint-disable react/prefer-stateless-function */
@refetch(({ params }) => ({
  board: { id: params.id },
  notes: { parentId: params.id },
}))
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
