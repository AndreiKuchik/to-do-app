import React from 'react';
import PropTypes from 'prop-types';
import { deleteToDo, completeToDo } from '../../toDosActions';
import { useAppDispatch } from '../../../app/hooks';

import styles from './ToDoItem.module.css';
import Checkbox from '../../../components/Checkbox';

const ToDoItem = ({ id, text, isCompleted }) => {
  const dispatch = useAppDispatch();
  const checkboxHandler = () => dispatch(completeToDo(id));

  return (
    <React.Fragment>
      <Checkbox
        role="todo-item-checkbox"
        isChecked={isCompleted}
        onCheckBoxChange={checkboxHandler}
        styles={styles.toDoCheckbox}
      />
      <div
        role="todo-item-text"
        className={`${styles.toDoText} ${isCompleted && styles.crossed}`}
      >
        {text}
      </div>
      <button
        type="button"
        role="todo-item-delete-button"
        className={styles.deleteButton}
        onClick={() => dispatch(deleteToDo(id))}
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
