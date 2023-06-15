import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import AddToDoForm from './AddToDoForm';
import store from '../../core/store';

describe('Testing AddToDoForm component', () => {
  it('Matches DOM Snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <AddToDoForm />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
