import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import styles from './ToDoFiltersPanel.module.css';
import { changeFilter } from '../../toDosSlice';
import Filters from '../../../common/toDoFiltersEnum';

const ToDoFiltersPanel = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        type="button"
        className={styles.filterButton}
        onClick={() => dispatch(changeFilter(Filters.All))}
      >
        All
      </button>
      <button
        type="button"
        role="active-filter-button"
        className={styles.filterButton}
        onClick={() => dispatch(changeFilter(Filters.Active))}
      >
        Active
      </button>
      <button
        type="button"
        role="completed-filter-button"
        className={styles.filterButton}
        onClick={() => dispatch(changeFilter(Filters.Completed))}
      >
        Completed
      </button>
    </div>
  );
};

export default ToDoFiltersPanel;
