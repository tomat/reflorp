import React, { PropTypes, Component } from 'react';
import CreateBoardForm from 'components/CreateBoardForm';
import { redux, PromiseState } from 'react-reflorp';

/* eslint-disable react/prefer-stateless-function */
@redux(() => ({
  boardCreate: true,
  boardCreateResponse: true,
}))
export default class CreateBoard extends Component {
  static propTypes = {
    boardCreate: PropTypes.func.isRequired,
    boardCreateResponse: PropTypes.instanceOf(PromiseState),
  };

  render() {
    const { boardCreate, boardCreateResponse } = this.props;

    let loading = false;
    let error = '';
    if (boardCreateResponse) {
      if (boardCreateResponse.pending) {
        loading = true;
      }
      if (boardCreateResponse.rejected) {
        error = boardCreateResponse.reason.message;
      }
    }

    return (
      <div className={['hasLoader', (loading ? 'loading' : '')].join(' ')}>
        <CreateBoardForm createBoard={boardCreate} error={error} />
      </div>
    );
  }
}
