import React, { PropTypes, Component } from 'react';
import CreateNote from 'components/CreateNote';
import { reflorp, EntityState, EntityListState } from 'react-reflorp';
import Note from 'components/Note';
import LoadMoreButton from 'components/LoadMoreButton';
import Grid from 'components/Grid';
import styles from 'css/ViewBoard.scss';

/* eslint-disable react/prefer-stateless-function */
@reflorp((props) => ({
  board: { id: props.id, load: true },
  notes: {
    load: true,
    parentId: props.id,
    then: (notes) => (notes || null) && notes.sort((note1, note2) => note1.nr > note2.nr),
  },
}))
export default class ViewBoard extends Component {
  static propTypes = {
    id: PropTypes.any,
    board: PropTypes.instanceOf(EntityState),
    notes: PropTypes.instanceOf(EntityListState),
  };

  render() {
    const { board, notes, id } = this.props;

    let note;

    return (
      <div className={[styles.viewBoard, 'reflorp-loader', (notes.pending || board.pending ? 'reflorp-loader-loading' : '')].join(' ')}>
        <If condition={board.fulfilled}>
          <h1>{board.value.title}</h1>
          <If condition={notes.fulfilled}>
            <div className={['container-fluid', styles.notes].join(' ')}>
              <Grid xs={12} sm={6} md={4} lg={2}>
                <For each="note" of={notes.value} index="i">
                  <Note key={note.id} noteId={note.id} boardId={board.value.id} />
                </For>
              </Grid>
            </div>
            <If condition={notes.hasMore}>
              <div key="loadMoreButton" className={['text-center', styles.loadMoreButton].join(' ')}>
                <LoadMoreButton onClick={notes.more} loading={notes.refreshing} />
              </div>
            </If>
            <hr />
            <CreateNote key={`createNote-${notes.value.length}`} boardId={id} />
          </If>
        </If>
        <If condition={board.rejected}>
          <div className="alert alert-danger">
            <span>{board.error}</span>
          </div>
        </If>
      </div>
    );
  }
}
