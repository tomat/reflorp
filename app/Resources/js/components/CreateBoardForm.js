import React, { PropTypes, Component } from 'react';
import { Button, Input } from 'react-bootstrap';
import styles from 'css/CreateBoardForm.scss';

export default class CreateBoardForm extends Component {
  static propTypes = {
    createBoard: PropTypes.func,
    error: PropTypes.string,
  };

  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { createBoard } = this.props;
    const title = this.refs.title.getValue();

    createBoard({ title });
  }

  render() {
    const { error } = this.props;

    return (
      <div className={styles.createBoardForm}>
        <form onSubmit={this.onSubmit}>
          <Input type="text" placeholder="Title" label="Name your board" bsSize="large" bsStyle={error ? 'error' : null} help={error} ref="title" />
          <div className={styles.actions}>
            <Button type="submit" bsSize="large">Create new board</Button>
          </div>
        </form>
      </div>
    );
  }
}
