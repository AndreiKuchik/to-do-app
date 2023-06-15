import Filters from '../core/filtersEnum';

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

export const selectToDoListAmount = (state) => {
  switch (state.toDoList.filter) {
    case Filters.Active:
      return state.toDoList.toDoList.filter((todo) => !todo.isCompleted).length;
    case Filters.Completed:
      return state.toDoList.toDoList.filter((todo) => todo.isCompleted).length;
    default:
      return state.toDoList.toDoList.length;
  }
};
