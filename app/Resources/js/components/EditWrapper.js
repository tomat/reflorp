import React, { Component, PropTypes } from 'react';
import { redux, PromiseState } from 'react-reflorp';

@redux((state, props) => {
  const mapping = {};

  mapping[props.entity] = { id: props.id, parentId: props.parentId, edit: true };
  mapping[`${props.entity}Edit`] = { id: props.id, parentId: props.parentId };
  mapping[`${props.entity}EditResponse`] = { id: props.id, parentId: props.parentId };

  return mapping;
})
class EditWrapper extends Component {
  static propTypes = {
    onSave: PropTypes.func,
    children: PropTypes.node,
    parentId: PropTypes.any,
    id: PropTypes.any,
  };

  componentWillMount() {
    const { entity } = this.props;
    const edit = this.props[`${entity}Edit`];

    edit(false);
  }

  componentWillReceiveProps(nextProps) {
    const { onSave, entity } = nextProps;

    const editResponse = nextProps[`${entity}EditResponse`];

    if (editResponse && editResponse.fulfilled) {
      if (onSave) {
        onSave();
      }
    }
  }

  render() {
    const { children, entity } = this.props;

    const editResponse = this.props[`${entity}EditResponse`];
    const data = this.props[entity];
    const edit = this.props[`${entity}Edit`];

    const error = (editResponse && editResponse.rejected ? editResponse.reason.message : '');

    const element = React.cloneElement(React.Children.only(children), {
      data: data.value,
      save: edit,
      saveResponse: editResponse,
      error,
    });

    const responses = [data];
    if (editResponse) {
      responses.push(editResponse);
    }
    const allResponses = PromiseState.all(responses);

    return (
      <div className={['hasLoader', (allResponses && allResponses.pending ? 'loading' : '')].join(' ')}>
        {element}
      </div>
    );
  }
}

export default EditWrapper;
