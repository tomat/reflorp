import React, { Component, PropTypes } from 'react';
import { redux, PromiseState } from 'react-reflorp';

@redux((state, props) => {
  const mapping = {};

  mapping[props.entity] = { id: props.id, parentId: props.parentId, edit: true };
  mapping[`${props.entity}Edit`] = { id: props.id, parentId: props.parentId };
  mapping[`${props.entity}EditResponse`] = { id: props.id, parentId: props.parentId };
  mapping[`${props.entity}Delete`] = { id: props.id, parentId: props.parentId };
  mapping[`${props.entity}DeleteResponse`] = { id: props.id, parentId: props.parentId };

  return mapping;
})
class EntityWrapper extends Component {
  static propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    children: PropTypes.node,
    parentId: PropTypes.any,
    id: PropTypes.any,
  };

  constructor() {
    super();

    this.state = {
      edited: false,
      deleted: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { onEdit, onDelete, entity } = nextProps;
    const { edited, deleted } = this.state;

    const editResponse = nextProps[`${entity}EditResponse`];
    const deleteResponse = nextProps[`${entity}DeleteResponse`];

    if (editResponse) {
      if (editResponse.fulfilled) {
        if (onEdit && !edited) {
          this.setState({
            edited: true,
          }, onEdit);
        }
      } else {
        this.setState({
          edited: false,
        });
      }
    }

    if (deleteResponse) {
      if (deleteResponse.fulfilled) {
        if (onDelete && !deleted) {
          this.setState({
            deleted: true,
          }, onDelete);
        }
      } else {
        this.setState({
          deleted: false,
        });
      }
    }
  }

  render() {
    const { children, entity } = this.props;

    const editResponse = this.props[`${entity}EditResponse`];
    const deleteResponse = this.props[`${entity}DeleteResponse`];
    const data = this.props[entity];
    const edit = this.props[`${entity}Edit`];
    const doDelete = this.props[`${entity}Delete`];

    const responses = [data];
    if (editResponse) {
      responses.push(editResponse);
    }
    if (deleteResponse) {
      responses.push(deleteResponse);
    }
    const allResponses = PromiseState.all(responses);

    const error = (allResponses && allResponses.rejected ? allResponses.reason.message : '');

    const element = React.cloneElement(React.Children.only(children), {
      data: data.value,
      doEdit: edit,
      editResponse,
      doDelete,
      deleteResponse,
      error,
    });

    return (
      <div className={['hasLoader', (allResponses && allResponses.pending ? 'loading' : '')].join(' ')}>
        {element}
      </div>
    );
  }
}

export default EntityWrapper;
