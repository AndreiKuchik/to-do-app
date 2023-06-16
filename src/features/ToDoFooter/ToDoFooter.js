import React from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from '../../core/hooks';
import ToDoFiltersPanel from './ToDoFilterPanel/ToDoFiltersPanel';
import { deleteAllCompleted } from '../toDosSlice';
import { selectToDoListAmount } from '../toDosSelectors';
import styles from './ToDoFooter.module.css';

const ToDoFooter = () => {
  const dispatch = useAppDispatch();
  const toDoListLenght = useAppSelector(selectToDoListAmount);

  return (
    <div className={styles.footer}>
      <span role ='to-do-item-amount'>{toDoListLenght} Item left</span>
      <ToDoFiltersPanel />
      <button
        className={styles.completeAllButton}
        type="button"
        role="clear-completed-button"
        onClick={() => dispatch(deleteAllCompleted())}
      >
        Clear Completed
      </button>
    </div>
  );
};

ToDoFooter.propTypes = {
  toDosAmount: PropTypes.number,
};

export default ToDoFooter;
