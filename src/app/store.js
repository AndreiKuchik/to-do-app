import { configureStore } from '@reduxjs/toolkit'

import toDoListReducer from '../features/toDoListSlice'

export default configureStore({
  reducer: {
    toDoList: toDoListReducer
  },
})
