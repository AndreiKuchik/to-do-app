/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import Filters from '../common/toDoFiltersEnum';
import Statuses from '../common/requestStatusesEnum';
import {
  fetchToDoList,
  deleteToDo,
  completeToDo,
  addNewToDo,
  deleteAllCompleted,
  reorderList,
} from './toDosActions';

const initialState = {
  toDoList: [],
  status: Statuses.Idle,
  filter: Filters.All,
};

const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchToDoList.fulfilled]: (state, action) => {
      state.status = Statuses.Succeeded;
      state.toDoList = state.toDoList.concat(action.payload);
    },
    [fetchToDoList.pending]: (state) => {
      state.status = Statuses.Loading;
    },
    [deleteToDo.fulfilled]: (state, action) => {
      state.toDoList = state.toDoList.filter(
        (obj) => obj.id !== action.payload,
      );
    },
    [completeToDo.fulfilled]: (state, action) => {
      const index = state.toDoList.findIndex(
        (item) => item.id === action.payload,
      );
      if (index !== -1) {
        state.toDoList[index].isCompleted = !state.toDoList[index].isCompleted;
      }
    },
    [addNewToDo.fulfilled]: (state, action) => {
      state.toDoList.push(action.payload);
    },
    [deleteAllCompleted.fulfilled]: (state) => {
      state.toDoList = state.toDoList.filter((todo) => !todo.isCompleted);
    },
    [reorderList.fulfilled]: (state, action) => {
      const updatedList = [...state.toDoList];
      const [reorderedItem] = updatedList.splice(
        state.toDoList.findIndex(
          (item) => item.id === action.payload.dragElementId,
        ),
        1,
      );
      updatedList.splice(
        state.toDoList.findIndex(
          (item) => item.id === action.payload.dropElementId,
        ),
        0,
        reorderedItem,
      );
      state.toDoList = updatedList;
    },
  },
});

export const { changeFilter } = toDoListSlice.actions;

export default toDoListSlice.reducer;
