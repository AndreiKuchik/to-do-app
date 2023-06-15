import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

describe('Testing Header component', () => {
  it('Matches DOM Snapshot', () => {
    const domTree = renderer
      .create(
          <Header />,
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
