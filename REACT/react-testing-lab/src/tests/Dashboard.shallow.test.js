import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../components/Dashboard';

describe('Dashboard - shallow', () => {
  test('renders Title', () => {
    const wrapper = shallow(<Dashboard />);

    expect(wrapper.find('h1').text()).toBe('Title');
  });
});