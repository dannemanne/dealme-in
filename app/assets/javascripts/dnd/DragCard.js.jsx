export default {

  source: {
    beginDrag(props) {
      return {
        id: props.id,
        index: props.index,
        fit_group_id: props.fit_group.id
      };
    }
  },

  target: {
    hover(props, monitor, component) {
      const dragIndex = monitor.getItem().index;
      const dragFitGroupId = monitor.getItem().fit_group_id;
      const hoverIndex = props.index;
      const hoverFitGroupId = props.fit_group.id;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex && dragFitGroupId === hoverFitGroupId) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.movePom(dragIndex, dragFitGroupId, hoverIndex, hoverFitGroupId);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
      monitor.getItem().fit_group_id = hoverFitGroupId;
    },

    drop(props, monitor, component) {
      props.updatePomsOrder();
    }
  }
}
