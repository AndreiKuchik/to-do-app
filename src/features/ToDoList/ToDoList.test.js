import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import ToDoList from './ToDoList';
import store from '../../app/store';

describe('Testing ToDoList component', () => {
  it('Matches DOM Snapshot', () => {
    const domTree = renderer
      .create(
        <Provider store={store}>
          <ToDoList />
        </Provider>,
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
