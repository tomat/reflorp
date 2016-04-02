import React, { PropTypes, Component } from 'react';
import { Button, Input } from 'react-bootstrap';
import styles from 'css/CreateNoteForm.scss';

export default class CreateNoteForm extends Component {
  static propTypes = {
    createNote: PropTypes.func,
    boardId: PropTypes.any,
    error: PropTypes.string,
  };

  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { createNote, boardId } = this.props;
    const summary = this.refs.summary.getValue();

    createNote({ summary }, boardId);
  }

  render() {
    const { error } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Input type="text" placeholder="Summary" label="Name your note" bsSize="large" bsStyle={error ? 'error' : null} help={error} ref="summary" />
        <div className={styles.actions}>
          <Button bsSize="large" type="submit">Add note</Button>
        </div>
      </form>
    );
  }
}
