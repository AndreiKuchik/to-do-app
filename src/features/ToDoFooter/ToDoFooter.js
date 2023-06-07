import React from "react";
import { useDispatch } from "react-redux";
import { ToDoFiltersPanel } from "./ToDoFiltersPanel";
import { deleteAllCompleted } from "../toDoListSlice";
import styles from "./ToDoFooter.module.css";

export const ToDoFooter = ({toDosAmount}) => {
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
