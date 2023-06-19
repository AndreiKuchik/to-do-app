import { configureStore } from '@reduxjs/toolkit';
import toDoListReducer from '../features/toDosSlice';

export default configureStore({
  reducer: {
    toDoList: toDoListReducer,
  },
});
