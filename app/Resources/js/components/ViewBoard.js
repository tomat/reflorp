import React, { PropTypes, Component } from 'react';
import CreateNote from 'components/CreateNote';
import { redux, PromiseState } from 'react-reflorp';
import Note from 'components/Note';
import LoadMoreButton from 'components/LoadMoreButton';
import Grid from 'components/Grid';
import styles from 'css/ViewBoard.scss';

/* eslint-disable react/prefer-stateless-function */
@redux((state, props) => ({
  board: props.id,
  notes: {
    parentId: props.id,
    then: (notes) => (notes || null) && notes.sort((note1, note2) => note1.nr > note2.nr),
  },
  notesLoadMore: { parentId: props.id },
}))
export default class ViewBoard extends Component {
  static propTypes = {
    id: PropTypes.any,
    board: PropTypes.instanceOf(PromiseState).isRequired,
    notes: PropTypes.instanceOf(PromiseState).isRequired,
    notesLoadMore: PropTypes.func,
  };

  render() {
    const { board, notes, id, notesLoadMore } = this.props;

    const view = PromiseState.all([board, notes]);

    let note;

    return (
      <div className={[styles.viewBoard, 'hasLoader', (view.pending ? 'loading' : '')].join(' ')}>
        <Choose>
          <When condition={view.fulfilled}>
            <h1>{board.value.title}</h1>
            <div className={['container-fluid', styles.notes].join(' ')}>
              <Grid xs={12} sm={6} md={4} lg={2}>
                <For each="note" of={notes.value} index="i">
                  <Note key={note.id} note={note} board={board.value} />
                </For>
              </Grid>
            </div>
            <If condition={board.value.notesCount > notes.value.length}>
              <div key="loadMoreButton" className={['text-center', styles.loadMoreButton].join(' ')}>
                <LoadMoreButton onClick={notesLoadMore} loading={view.refreshing} />
              </div>
            </If>
            <hr />
            <CreateNote key={`createNote-${notes.value.length}`} boardId={id} />
          </When>
          <When condition={view.rejected}>
            <div className="alert alert-danger">
              <span>{view.reason}</span>
            </div>
          </When>
        </Choose>
      </div>
    );
  }
}
