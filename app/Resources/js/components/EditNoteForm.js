import React, { Component, PropTypes } from 'react';
import { Input, Button } from 'react-bootstrap';
import styles from 'css/EditNoteForm.scss';

class EditNoteForm extends Component {
  static propTypes = {
    onCancel: PropTypes.func,
    save: PropTypes.func,
    error: PropTypes.string,
    data: PropTypes.object,
  };

  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { save } = this.props;

    save({ summary: this.refs.summary.getValue() });
  }

  render() {
    const { onCancel, error, data } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Input onFocus={(event) => { const f = event.target; const tempValue = event.target.value; f.value = ''; f.value = tempValue; }} defaultValue={data.summary} autoFocus type="text" placeholder="Summary" label="Name your note" bsSize="large" bsStyle={error ? 'error' : null} help={error} ref="summary" />
        <div className={styles.actions}>
          <Button bsSize="large" onClick={onCancel}>Cancel</Button>
          <Button type="submit" bsSize="large">Save</Button>
        </div>
      </form>
    );
  }
}

export default EditNoteForm;
