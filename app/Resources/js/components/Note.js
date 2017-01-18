import React, { Component, PropTypes } from 'react';
import { ReactPageClick } from 'react-page-click';
import { Button, Glyphicon } from 'react-bootstrap';
import { reflorp, EntityState } from 'react-reflorp';
import EditNoteForm from 'components/EditNoteForm';
import styles from 'css/Note.scss';

@reflorp(({ noteId, boardId }) => ({
  note: { id: noteId, parentId: boardId },
}))
class Note extends Component {
  static propTypes = {
    note: PropTypes.instanceOf(EntityState),
    board: PropTypes.instanceOf(EntityState),
    className: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {
      edit: false,
      height: 'auto',
    };
  }

  onEditEnable = () => {
    if (!this.state.edit) {
      this.setState({
        edit: true,
        height: `${this.refs.container.scrollHeight}px`,
      });
    }
  };

  onEditDisable = () => {
    this.setState({
      edit: false,
      height: 'auto',
    });
  };

  render() {
    const { note, className } = this.props;
    const { edit, height } = this.state;

    return (
      <div ref="container" style={{ height }} className={`${className} ${[(edit ? styles.edit : ''), styles.noteContainer].join(' ')}`}>
        <ReactPageClick notify={this.onEditDisable}>
          <div ref="note" className={[styles.note, 'well well-sm', (edit ? 'well-active' : '')].join(' ')} onClick={this.onEditEnable}>
            <div className={['reflorp-loader', (note.loading ? 'reflorp-loader-loading' : '')].join(' ')}>
              <If condition={edit}>
                <EditNoteForm note={note} onClose={this.onEditDisable} />
              <Else />
                <div>
                  <div className={styles.hoverActions}>
                    <Button onClick={(e) => { e.stopPropagation(); note.del(); }}><Glyphicon glyph="remove" /></Button>
                  </div>
                  <span className={styles.nr}>
                    {note.value.nr}
                  </span>
                  <hr />
                  <h3>{note.value.summary}</h3>
                </div>
              </If>
            </div>
          </div>
        </ReactPageClick>
      </div>
    );
  }
}

export default Note;
