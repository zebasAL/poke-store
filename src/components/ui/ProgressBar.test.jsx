import React from 'react';
import {
  render,
  screen,
  cleanup,
  waitFor,
  act,
} from '@testing-library/react';
import ProgressBar from './ProgressBar';

afterEach(cleanup);

describe('handles LoadMoreButton', () => {
  it('renders LoadMoreButton', async () => {
    const props = {
      percentage: '100',
      progressValue: 10,
      label: 'lorem',
    };
    act(() => {
      render(
        <ProgressBar {...props} />,
      );
    });
    const div = screen.getByTestId('element');

    await waitFor(() => {
      screen.findByText(props.progressValue && props.label);
      // expect(button.classList.contains('progress-bar')).toBe(true);
      expect(div).toHaveStyle({
        width: '100%',
      });
    });
  });
});
