import { useDispatch } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import ToDoFiltersPanel from './ToDoFiltersPanel';
import { deleteAllCompleted } from '../toDoListSlice';
import styles from './ToDoFooter.module.css';

const ToDoFooter = ({ toDosAmount }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.footer}>
      <span>{toDosAmount} Item left</span>
      <ToDoFiltersPanel />
      <button
        className={styles.completeAllButton}
        type="button"
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
