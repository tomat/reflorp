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

  save() {
    const { note, onClose } = this.props;

    note.save(onClose);
  }

  render() {
    const { onClose, note } = this.props;

    return (
      <form>
        <Input
          onFocus={(event) => { const f = event.target; const tempValue = event.target.value; f.value = ''; f.value = tempValue; }}
          defaultValue={note.data.value.summary}
          autoFocus
          type="text"
          placeholder="Summary"
          label="Name your note"
          bsSize="large"
          bsStyle={note.getError() ? 'error' : null}
          help={note.getError()}
          ref="summary"
          name="summary"
          onChange={note.handleChange}
        />
        <div className={styles.actions}>
          <Button onClick={onClose} bsSize="large">Cancel</Button>
          <Button onClick={() => this.save()} bsSize="large">Save</Button>
        </div>
      </form>
    );
  }
}

export default EditNoteForm;
