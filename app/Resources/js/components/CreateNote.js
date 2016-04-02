import React, { PropTypes, Component } from 'react';
import CreateNoteForm from 'components/CreateNoteForm';
import { redux, PromiseState } from 'react-reflorp';
import styles from 'css/CreateNote.scss';

/* eslint-disable react/prefer-stateless-function */
@redux((state, props) => ({
  noteCreate: { parentId: props.boardId },
  noteCreateResponse: { parentId: props.boardId },
}))
export default class CreateNote extends Component {
  static propTypes = {
    noteCreate: PropTypes.func.isRequired,
    noteCreateResponse: PropTypes.instanceOf(PromiseState),
    boardId: PropTypes.any,
  };

  render() {
    const { noteCreate, noteCreateResponse, boardId } = this.props;

    let loading = false;
    let error = '';
    if (noteCreateResponse) {
      if (noteCreateResponse.pending) {
        loading = true;
      }
      if (noteCreateResponse.rejected) {
        error = noteCreateResponse.reason.message;
      }
    }

    return (
      <div className={styles.createNoteContainer}>
        <div className={styles.createNote}>
          <div className={['well', 'hasLoader', (loading ? 'loading' : '')].join(' ')}>
            <CreateNoteForm createNote={noteCreate} boardId={boardId} error={error} />
          </div>
        </div>
      </div>
    );
  }
}
