/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import repository from '../repository/localeStorageRepository';
import Filters from '../core/filtersEnum';
import Statuses from '../core/statusesEnum';

const initialState = {
  toDoList: [],
  status: 'idle',
  filter: Filters.All,
};

export const fetchToDoList = createAsyncThunk(
  'toDoList/fetchList',
  async () => {
    const response = await repository.getAll();
    return response;
  },
);

export const reorderList = createAsyncThunk(
  'toDoList/reorderList',
  async (dragAndDropAction) => {
    const response = await repository.reorderList(dragAndDropAction);
    return response;
  },
);

export const deleteToDo = createAsyncThunk(
  'toDoList/deleteItem',
  async (id) => {
    const response = await repository.delete(id);
    return response;
  },
);

export const completeToDo = createAsyncThunk(
  'toDoList/compliteToDo',
  async (id) => {
    const response = await repository.complete(id);
    return response;
  },
);

export const addNewToDo = createAsyncThunk(
  'toDoList/addNeToDo',
  async (initialToDo) => {
    const item = {
      toDo: initialToDo,
      id: uuid(),
      isCompleted: false,
    };
    const response = await repository.addItem(item);
    return response;
  },
);

export const deleteAllCompleted = createAsyncThunk(
  'toDoList/deleteAllCompleted',
  async () => {
    await repository.deleteAllCompleted();
  },
);

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
      state.toDoList = action.payload;
    },
  },
});

export const { changeFilter } = toDoListSlice.actions;

export default toDoListSlice.reducer;

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
