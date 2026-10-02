import React from 'react';
import { mount } from 'enzyme';
import Dashboard from '../components/Dashboard';

describe('Dashboard - mount', () => {
  test('renders Title', () => {
    const wrapper = mount(<Dashboard />);

    expect(wrapper.find('h1').text()).toBe('Title');

    wrapper.unmount();
  });
});