import React from 'react';
import PropTypes from 'prop-types';
import { deleteToDo, completeToDo } from '../toDoListSlice';
import { useAppDispatch } from '../../core/hooks';

import styles from './ToDoItem.module.css';

const ToDoItem = (props) => {
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <input
        role="todo-item-checkbox"
        type="checkbox"
        checked={props.isCompleted}
        onChange={() => dispatch(completeToDo(props.id))}
        className={styles.isCompletedCheckBox}
      />
      <div
        role="todo-item-text"
        className={`${styles.toDoText} ${props.isCompleted && styles.crossed}`}
      >
        {props.text}
      </div>
      <button
        type="button"
        role="todo-item-delete-button"
        className={styles.deleteButton}
        onClick={() => dispatch(deleteToDo(props.id))}
      >
        Delete
      </button>
    </React.Fragment>
  );
};

ToDoItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default ToDoItem;
