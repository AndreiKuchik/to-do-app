import React from 'react';
import renderer from 'react-test-renderer';
import Card from './Card';

describe('Testing Card component', () => {
  it('Matches DOM Snapshot', () => {
    const domTree = renderer.create(<Card />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
