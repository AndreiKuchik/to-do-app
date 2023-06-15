import React from 'react';
import { useAppDispatch } from '../../core/hooks';
import styles from './ToDoFiltersPanel.module.css';
import { changeFilter } from '../toDosSlice';
import Filters from '../../core/filtersEnum';

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
        className={styles.filterButton}
        onClick={() => dispatch(changeFilter(Filters.Active))}
      >
        Active
      </button>
      <button
        type="button"
        className={styles.filterButton}
        onClick={() => dispatch(changeFilter(Filters.Completed))}
      >
        Completed
      </button>
    </div>
  );
};

export default ToDoFiltersPanel;
