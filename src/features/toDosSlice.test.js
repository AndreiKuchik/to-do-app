import {
  fetchToDoList,
  deleteToDo,
  completeToDo,
  addNewToDo,
  deleteAllCompleted,
  reorderList,
} from './toDosActions';
import reducer from './toDosSlice';
import Filters from '../common/toDoFiltersEnum';
import Statuses from '../common/requestStatusesEnum';

describe('toDoListSlice', () => {
  const initialState = {
    toDoList: [],
    status: Statuses.Idle,
    filter: Filters.All,
  };

  it('initial state changes to loading status when fetchList is pending', () => {
    const action = { type: fetchToDoList.pending.type };
    const state = reducer(initialState, action);
    expect(state.status).toEqual(Statuses.Loading);
  });

  it('state status changes when fetchList is fulfilled successfully', () => {
    const action = { type: fetchToDoList.fulfilled.type };
    const state = reducer(initialState, action);
    expect(state.status).toEqual(Statuses.Succeeded);
  });

  it('todo item deletes from store when deleteToDo is fulfilled successfully', () => {
    initialState.toDoList = [
      {
        id: '1',
        toDo: 'ToDo1',
        isCompleted: false,
      },
      {
        id: '2',
        toDo: 'ToDo2',
        isCompleted: true,
      },
      {
        id: '3',
        toDo: 'ToDo3',
        isCompleted: true,
      },
    ];
    const idToDoItemToDelete = '1';
    const action = {
      type: deleteToDo.fulfilled.type,
      payload: idToDoItemToDelete,
    };
    const state = reducer(initialState, action);
    expect(
      state.toDoList.findIndex((item) => item.id === idToDoItemToDelete),
    ).toEqual(-1);
  });

  it('todo item becomes completed when completeToDo is fulfilled successfully', () => {
    initialState.toDoList = [
      {
        id: '1',
        toDo: 'ToDo1',
        isCompleted: false,
      },
      {
        id: '2',
        toDo: 'ToDo2',
        isCompleted: false,
      },
      {
        id: '3',
        toDo: 'ToDo3',
        isCompleted: false,
      },
    ];
    const idToDoItemToComplete = '1';
    const action = {
      type: completeToDo.fulfilled.type,
      payload: idToDoItemToComplete,
    };
    const state = reducer(initialState, action);

    const index = state.toDoList.findIndex(
      (item) => item.id === action.payload,
    );
    expect(state.toDoList[index].isCompleted).toEqual(true);
  });

  it('todo item adds to store when addNewToDo is fulfilled successfully', () => {
    initialState.toDoList = [
      {
        id: '1',
        toDo: 'ToDo1',
        isCompleted: false,
      },
      {
        id: '2',
        toDo: 'ToDo2',
        isCompleted: false,
      },
    ];
    const toDoItemToAdd = {
      id: '3',
      toDo: 'ToDo3',
      isCompleted: false,
    };
    const action = {
      type: addNewToDo.fulfilled.type,
      payload: toDoItemToAdd,
    };

    const state = reducer(initialState, action);

    const index = state.toDoList.findIndex(
      (item) => item.id === action.payload.id,
    );
    expect(state.toDoList[index]).toEqual(toDoItemToAdd);
  });

  it('all completed todos delete when deleteAllCompleted is fulfilled successfully', () => {
    initialState.toDoList = [
      {
        id: '1',
        toDo: 'ToDo1',
        isCompleted: false,
      },
      {
        id: '2',
        toDo: 'ToDo2',
        isCompleted: true,
      },
      {
        id: '3',
        toDo: 'ToDo3',
        isCompleted: true,
      },
    ];
    const action = {
      type: deleteAllCompleted.fulfilled.type,
    };
    const state = reducer(initialState, action);
    expect(state.toDoList.findIndex((item) => item.id === '2')).toEqual(-1);
    expect(state.toDoList.findIndex((item) => item.id === '3')).toEqual(-1);
  });

  it('todo item reorders when reorderList is fulfilled successfully', () => {
    const dragElementId = '3';
    const dropElementId = '1';

    initialState.toDoList = [
      {
        id: '1',
        toDo: 'ToDo1',
        isCompleted: false,
      },
      {
        id: '2',
        toDo: 'ToDo2',
        isCompleted: true,
      },
      {
        id: '3',
        toDo: 'ToDo3',
        isCompleted: true,
      },
    ];
    const action = {
      type: reorderList.fulfilled.type,
      payload: {
        dragElementId,
        dropElementId,
      },
    };

    const dragElement = initialState.toDoList[
      initialState.toDoList.findIndex((item) => item.id === dragElementId)
    ];
    const dropElementIndex = initialState.toDoList.findIndex(
      (item) => item.id === dropElementId,
    );

    const state = reducer(initialState, action);

    const dragElementIndexAfterDrop = state.toDoList.findIndex(
      (item) => item.id === dragElementId,
    );

    expect(dragElementIndexAfterDrop).toEqual(dropElementIndex);
    expect(state.toDoList[dragElementIndexAfterDrop]).toEqual(dragElement);
  });
});
