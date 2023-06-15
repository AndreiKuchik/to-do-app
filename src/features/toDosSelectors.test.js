import { selectToDoList, selectToDoListAmount } from './toDosSelectors';
import Filters from '../core/filtersEnum';

describe('toDosSelectors', () => {
  const state = {
    toDoList: {
      toDoList: [
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
      ],
    },
  };

  it('should return correct toDoList when search filter is `All`', () => {
    expect(selectToDoList(state)).toEqual(state.toDoList.toDoList);
  });

  it('should return correct toDoList when search filter is `Active`', () => {
    state.toDoList.filter = Filters.Active;
    const expectedResult = [
      {
        id: '1',
        toDo: 'ToDo1',
        isCompleted: false,
      },
    ];

    expect(selectToDoList(state)).toEqual(expectedResult);
  });

  it('should return correct toDoList when search filter is `Completed`', () => {
    state.toDoList.filter = Filters.Completed;

    const expectedResult = [
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

    expect(selectToDoList(state)).toEqual(expectedResult);
  });

  it('should return correct toDoList lenght when search filter is `All`', () => {
    state.toDoList.filter = Filters.All;

    expect(selectToDoListAmount(state)).toEqual(state.toDoList.toDoList.length);
  });

  it('should return correct toDoList when search filter is `Active`', () => {
    state.toDoList.filter = Filters.Active;

    expect(selectToDoListAmount(state)).toEqual(1);
  });

  it('should return correct toDoList when search filter is `Completed`', () => {
    state.toDoList.filter = Filters.Completed;

    expect(selectToDoListAmount(state)).toEqual(2);
  });
});
