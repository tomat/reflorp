import React, { Component, PropTypes } from 'react';
import { Input, Button } from 'react-bootstrap';
import { EntityState } from 'react-reflorp';
import styles from 'css/EditNoteForm.scss';

class EditNoteForm extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    note: PropTypes.instanceOf(EntityState),
  };

  componentWillMount() {
    this.props.note.reset();
  }

  render() {
    const { onClose, note } = this.props;

    return (
      <form>
        <Input
          onFocus={(event) => { const f = event.target; const tempValue = event.target.value; f.value = ''; f.value = tempValue; }}
          defaultValue={note.value.summary}
          autoFocus
          type="text"
          placeholder="Summary"
          label="Name your note"
          bsSize="large"
          bsStyle={note.draft.rejected ? 'error' : null}
          help={note.draft.rejected && note.draft.reason}
          ref="summary"
          name="summary"
          onChange={note.handleChange}
        />
        <div className={styles.actions}>
          <Button onClick={onClose} bsSize="large">Cancel</Button>
          <Button onClick={() => note.save(onClose)} bsSize="large">Save</Button>
        </div>
      </form>
    );
  }
}

export default EditNoteForm;
