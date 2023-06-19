import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ToDoFooter from './ToDoFooter';

const mockStore = configureStore([]);
const store = mockStore({
  toDoList: {
    toDoList: [{}, {}, {}, {}],
  },
});

describe('Testing ToDoFooter component', () => {
  it('Matches DOM Snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <ToDoFooter />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('ToDo items amount label is correct', () => {
    render(
      <Provider store={store}>
        <ToDoFooter />
      </Provider>,
    );
    const amountLabel = screen.getByText('4 Item left');

    expect(amountLabel).toBeInTheDocument();
  });
});
