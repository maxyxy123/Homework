import React from 'react';
import { mount } from 'enzyme';
import SmartCounter from '../components/SmartCounter';

describe('SmartCounter', () => {
  test('initial value is 0', () => {
    const wrapper = mount(<SmartCounter />);

    expect(wrapper.find('[data-testid="count"]').text()).toBe('0');

    wrapper.unmount();
  });

  test('increments from 0 to 1', () => {
    const wrapper = mount(<SmartCounter />);

    wrapper.find('[data-testid="increment"]').simulate('click');

    expect(wrapper.find('[data-testid="count"]').text()).toBe('1');

    wrapper.unmount();
  });

  test('does not decrease below 0', () => {
    const wrapper = mount(<SmartCounter />);

    wrapper.find('[data-testid="decrement"]').simulate('click');

    expect(wrapper.find('[data-testid="count"]').text()).toBe('0');

    wrapper.unmount();
  });

  test('reset returns count to 0', () => {
    const wrapper = mount(<SmartCounter />);

    wrapper.find('[data-testid="increment"]').simulate('click');
    wrapper.find('[data-testid="increment"]').simulate('click');

    expect(wrapper.find('[data-testid="count"]').text()).toBe('2');

    wrapper.find('[data-testid="reset"]').simulate('click');

    expect(wrapper.find('[data-testid="count"]').text()).toBe('0');

    wrapper.unmount();
  });
});