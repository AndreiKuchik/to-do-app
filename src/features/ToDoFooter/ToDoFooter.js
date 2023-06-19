import React from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ToDoFiltersPanel from './ToDoFilterPanel/ToDoFiltersPanel';
import { deleteAllCompleted } from '../toDosActions';
import { selectToDoListAmount } from '../toDosSelectors';
import styles from './ToDoFooter.module.css';

const ToDoFooter = () => {
  const dispatch = useAppDispatch();
  const toDosCount = useAppSelector(selectToDoListAmount);

  return (
    <div className={styles.footer}>
      <span role="to-do-item-amount">{toDosCount} Item left</span>
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
