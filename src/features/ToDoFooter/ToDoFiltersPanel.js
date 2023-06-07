import React from "react";
import styles from "./ToDoFiltersPanel.module.css";
import { changeFilter } from "../toDoListSlice";
import { Filters } from "../../app/filtersEnum";
import { useDispatch } from "react-redux";

export const ToDoFiltersPanel = () => {
  const dispatch = useDispatch();

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
