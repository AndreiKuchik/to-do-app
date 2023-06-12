import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import ToDoFooter from './ToDoFooter';
import store from '../../app/store';

describe('Testing ToDoFooter component', () => {
  it('Matches DOM Snapshot', () => {
    const domTree = renderer
      .create(
        <Provider store={store}>
          <ToDoFooter />
        </Provider>,
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
