import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import WeatherWidget from '../components/WeatherWidget';

describe('WeatherWidget', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders mocked weather', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        weather: 'Nắng đẹp',
      }),
    });

    let wrapper;

    await act(async () => {
      wrapper = mount(<WeatherWidget />);
    });

    wrapper.update();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toContain('Nắng đẹp');

    wrapper.unmount();
  });
});