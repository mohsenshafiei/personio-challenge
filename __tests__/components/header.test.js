import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../src/ui/components/Header.jsx';
import store from '../../src/store'

describe('Header', () => {
  it('Should render default text Header', () => {
    const wrapper = shallow(<Header store={store} />);
    expect(wrapper.exists('.language')).toBe(true);
  });
});
