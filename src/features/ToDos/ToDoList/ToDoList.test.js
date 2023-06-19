import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ToDoList from './ToDoList';
import Filters from '../../../common/toDoFiltersEnum';
import Statuses from '../../../common/requestStatusesEnum';

const mockStore = configureStore([]);

describe('Test TodoList component', () => {
  let store;

  it('displays correctly when toDoList is empty', () => {
    // Arrange
    store = mockStore({
      toDoList: {
        toDoList: [],
        status: Statuses.Succeeded,
        filter: Filters.All,
      },
    });

    // Act
    const { container } = render(
      <Provider store={store}>
        <ToDoList />
      </Provider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });

  it('displays correctly when there are items in toDoList', () => {
    // Arrange
    store = mockStore({
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
        ],
        status: Statuses.Succeeded,
        filter: Filters.All,
      },
    });

    // Act
    const { container } = render(
      <Provider store={store}>
        <ToDoList />
      </Provider>,
    );

    // Assert
    expect(container).toMatchSnapshot();
  });

  it('displays correct number of ToDoItems in ToDoList', () => {
    // Arrange
    store = mockStore({
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
        status: Statuses.Succeeded,
        filter: Filters.All,
      },
    });

    // Act
    render(
      <Provider store={store}>
        <ToDoList />
      </Provider>,
    );

    // Assert
    const todoItemsList = screen.getAllByRole('todo-item-checkbox');
    expect(todoItemsList.length).toBe(3);
  });

  it('should show empty list message when todos list is empty', () => {
    // Arrange
    store = mockStore({
      toDoList: {
        toDoList: [],
        status: Statuses.Succeeded,
        filter: Filters.All,
      },
    });

    // Act
    render(
      <Provider store={store}>
        <ToDoList />
      </Provider>,
    );

    // Assert
    const message = screen.getByRole('empty-list-text');
    expect(message).toBeInTheDocument();
  });
});
