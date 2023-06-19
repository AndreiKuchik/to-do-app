import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ToDoItem from './ToDoItem';

const mockStore = configureStore([]);
const store = mockStore({});

const props = {
  id: '1',
  index: 0,
  isCompleted: false,
  text: 'ToDo1',
};

describe('ToDoItem component', () => {
  it('snapshot should be matched', () => {
    const { container } = render(
      <Provider store={store}>
        <ToDoItem {...props} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('checkbox, text, delete button should be dispayed', () => {
    render(
      <Provider store={store}>
        <ToDoItem {...props} />
      </Provider>,
    );

    expect(screen.getByRole('todo-item-delete-button')).toBeInTheDocument();
    expect(screen.getByRole('todo-item-text')).toBeInTheDocument();
    expect(screen.getByRole('todo-item-checkbox')).toBeInTheDocument();
  });
});
