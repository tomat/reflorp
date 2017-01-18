import React, { PropTypes, Component } from 'react';
import { reflorp, EntityState } from 'react-reflorp';
import { Input, Button } from 'react-bootstrap';
import styles from 'css/CreateNote.scss';

/* eslint-disable react/prefer-stateless-function */
@reflorp((props) => ({
  note: {
    parentId: props.boardId,
    create: true,
  },
}))
export default class CreateNote extends Component {
  static propTypes = {
    note: PropTypes.instanceOf(EntityState),
    boardId: PropTypes.any,
  };

  render() {
    const { note } = this.props;

    return (
      <div className={styles.createNoteContainer}>
        <div className={styles.createNote}>
          <div className={['well', 'reflorp-loader', (note.loading ? 'reflorp-loader-loading' : '')].join(' ')}>
            <form>
              <Input
                onChange={note.handleChange}
                name="summary"
                type="text"
                placeholder="Summary"
                label="Name your note"
                bsSize="large"
                bsStyle={note.rejected ? 'error' : null}
                help={note.rejected && note.error}
              />
              <div className={styles.actions}>
                <Button onClick={note.save} bsSize="large">Add note</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
