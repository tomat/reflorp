import React, { Component, PropTypes } from 'react';
import PageClick from 'react-page-click';
import EditNoteForm from 'components/EditNoteForm';
import EntityWrapper from 'components/EntityWrapper';
import { Button, Glyphicon } from 'react-bootstrap';
import styles from 'css/Note.scss';

class Note extends Component {
  static propTypes = {
    note: PropTypes.object,
    board: PropTypes.object,
    className: PropTypes.string,
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
    const { note, board, className } = this.props;
    const { edit, height } = this.state;

    const LocalNote = ({ doDelete, data }) => (
      <div>
        <div className={styles.hoverActions}>
          <Button onClick={(e) => { e.stopPropagation(); doDelete(); }}><Glyphicon glyph="remove" /></Button>
        </div>
        <span className={styles.nr}>
          {data.nr}
        </span>
        <hr />
        <h3>{data.summary}</h3>
      </div>
    );

    return (
      <div ref="container" style={{ height }} className={`${className} hasLoader ${[(edit ? styles.edit : ''), styles.noteContainer, (noteDeleteResponse && noteDeleteResponse.pending ? 'loading' : '')].join(' ')}`}>
        <PageClick onClick={this.onEditDisable}>
          <div ref="note" className={[styles.note, 'well well-sm', (edit ? 'well-active' : '')].join(' ')} onClick={this.onEditEnable}>
            <EntityWrapper key="edit" entity="note" id={note.id} parentId={board.id} onEdit={this.onEditDisable}>
              <If condition={edit}>
                <EditNoteForm onCancel={this.onEditDisable} />
              <Else />
                <LocalNote />
              </If>
            </EntityWrapper>
          </div>
        </PageClick>
      </div>
    );
  }
}

export default Note;
