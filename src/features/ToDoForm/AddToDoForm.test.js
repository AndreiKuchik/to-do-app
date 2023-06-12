import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import AddToDoForm from './AddToDoForm';
import store from '../../app/store';

describe('Testing AddToDoForm component', () => {
  it('Matches DOM Snapshot', () => {
    const domTree = renderer
      .create(
        <Provider store={store}>
          <AddToDoForm />
        </Provider>,
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
