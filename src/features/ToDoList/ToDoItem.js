import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { deleteToDo, completeToDo } from '../toDoListSlice';

import styles from './ToDoItem.module.css';

const ToDoItem = (props) => {
  const dispatch = useDispatch();

  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            type="checkbox"
            checked={props.isCompleted}
            onChange={() => dispatch(completeToDo(props.id))}
            className={styles.isCompletedCheckBox}
          />
          <div
            className={`${styles.toDoText} ${
              props.isCompleted && styles.crossed
            }`}
          >
            {props.text}
          </div>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => dispatch(deleteToDo(props.id))}
          >
            Delete
          </button>
        </li>
      )}
    </Draggable>
  );
};

ToDoItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default ToDoItem;
