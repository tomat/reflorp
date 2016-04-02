import React, { Component, PropTypes } from 'react';
import PageClick from 'react-page-click';
import { redux, PromiseState } from 'react-reflorp';
import { Button, Glyphicon } from 'react-bootstrap';
import EditNoteForm from 'components/EditNoteForm';
import EditWrapper from 'components/EditWrapper';
import styles from 'css/Note.scss';

@redux((state, props) => ({
  noteDelete: { id: props.note.id, parentId: props.board.id },
  noteDeleteResponse: { id: props.note.id, parentId: props.board.id },
}))
class Note extends Component {
  static propTypes = {
    note: PropTypes.object,
    board: PropTypes.object,
    className: PropTypes.string,
    noteDelete: PropTypes.func,
    noteDeleteResponse: PropTypes.instanceOf(PromiseState),
  };

  constructor() {
    super();

    this.state = {
      edit: false,
      height: 'auto',
    };
    this.onEditEnable = this.onEditEnable.bind(this);
    this.onEditDisable = this.onEditDisable.bind(this);
  }

  onEditEnable() {
    if (!this.state.edit) {
      this.setState({
        edit: true,
        height: `${this.refs.container.scrollHeight}px`,
      });
    }
  }

  onEditDisable() {
    this.setState({
      edit: false,
      height: 'auto',
    });
  }

  render() {
    const { note, board, className, noteDelete, noteDeleteResponse } = this.props;
    const { edit, height } = this.state;

    let element;

    if (edit) {
      element = (
        <EditWrapper key="edit" entity="note" id={note.id} parentId={board.id} onSave={this.onEditDisable}>
          <EditNoteForm onCancel={this.onEditDisable} />
        </EditWrapper>
      );
    } else {
      element = (
        <div key="read">
          <div className={styles.hoverActions}>
            <Button onClick={(e) => { e.stopPropagation(); noteDelete(); }}><Glyphicon glyph="remove" /></Button>
          </div>
          <span className={styles.nr}>
            {note.nr}
          </span>
          <hr />
          <h3>{note.summary}</h3>
        </div>
      );
    }

    return (
      <div ref="container" style={{ height }} className={`${className} hasLoader ${[(edit ? styles.edit : ''), styles.noteContainer, (noteDeleteResponse && noteDeleteResponse.pending ? 'loading' : '')].join(' ')}`}>
        <PageClick onClick={this.onEditDisable}>
          <div ref="note" className={[styles.note, 'well well-sm', (edit ? 'well-active' : '')].join(' ')} onClick={this.onEditEnable}>
            {element}
          </div>
        </PageClick>
      </div>
    );
  }
}

export default Note;
