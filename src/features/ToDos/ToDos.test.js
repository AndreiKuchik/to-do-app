import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ToDos from './ToDos';
import Statuses from '../../common/requestStatusesEnum';
import Filters from '../../common/toDoFiltersEnum';

const mockStore = configureStore([]);

describe('Test ToDos component', () => {
  let store;

  it('should match with snapshot when status is `loading`', () => {
    store = mockStore({
      toDoList: {
        status: Statuses.Loading,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <ToDos />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot when status is `succeeded`', () => {
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

    const { container } = render(
      <Provider store={store}>
        <ToDos />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match with snapshot when status is `failed`', () => {
    store = mockStore({
      toDoList: {
        status: Statuses.Failed,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <ToDos />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('error message should be displayed when status is `failed`', () => {
    store = mockStore({
      toDoList: {
        status: Statuses.Failed,
      },
    });

    render(
      <Provider store={store}>
        <ToDos />
      </Provider>,
    );

    const errorMessage = screen.getByText(
      'Something went wrong. Could you please contact administrator.',
    );
    expect(errorMessage).toBeInTheDocument();
  });
  it('loading message should be displayed when status is `loading`', () => {
    store = mockStore({
      toDoList: {
        status: Statuses.Loading,
      },
    });

    render(
      <Provider store={store}>
        <ToDos />
      </Provider>,
    );

    expect(screen.getByRole('loading-spinner')).toBeInTheDocument();
  });
});
