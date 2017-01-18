import React, { PropTypes, Component } from 'react';
import { reflorp, EntityState } from 'react-reflorp';
import { Button, Input } from 'react-bootstrap';
import history from '../router/myHistory';
import styles from './css/CreateBoard.scss';

/* eslint-disable react/prefer-stateless-function */
@reflorp(() => ({
  board: {
    create: true,
    onCreate: (board) => {
      history.push(`/board/${board.value.id}`);
    },
  },
}))
export default class CreateBoard extends Component {
  static propTypes = {
    board: PropTypes.instanceOf(EntityState),
  };

  render() {
    const { board } = this.props;

    return (
      <div className={[styles.createBoardForm, 'reflorp-loader', (board.loading ? 'reflorp-loader-loading' : '')].join(' ')}>
        <form>
          <Input onChange={board.handleChange} type="text" name="title" placeholder="Title" label="Name your board" bsSize="large" bsStyle={board.rejected ? 'error' : null} help={board.rejected && board.error} ref="title" />
          <div className={styles.actions}>
            <Button bsSize="large" disabled={board.loading} onClick={board.save}>Create new board</Button>
          </div>
        </form>
      </div>
    );
  }
}
