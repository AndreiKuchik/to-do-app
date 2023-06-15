import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import App from './App';
import store from './core/store';

describe('Jest Snapshot testing suite', () => {
  it('Matches DOM Snapshot', () => {
    const domTree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
