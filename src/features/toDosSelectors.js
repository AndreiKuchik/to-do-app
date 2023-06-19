import { createSelector } from '@reduxjs/toolkit';
import Filters from '../common/toDoFiltersEnum';

export const selectToDoList = (state) => {
  switch (state.toDoList.filter) {
    case Filters.Active:
      return state.toDoList.toDoList.filter((todo) => !todo.isCompleted);
    case Filters.Completed:
      return state.toDoList.toDoList.filter((todo) => todo.isCompleted);
    default:
      return state.toDoList.toDoList;
  }
};

export const selectToDoListAmount = createSelector(
  (state) => selectToDoList(state),
  (toDoList) => toDoList.length,
);
