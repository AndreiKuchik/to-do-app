import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from '../repository/localeStorageRepository';

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
    await repository.reorderList(dragAndDropAction);
    return dragAndDropAction;
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
    const response = await repository.addItem(initialToDo);
    return response;
  },
);

export const deleteAllCompleted = createAsyncThunk(
  'toDoList/deleteAllCompleted',
  async () => {
    await repository.deleteAllCompleted();
  },
);
