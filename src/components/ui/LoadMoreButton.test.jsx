import React from 'react';
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import LoadMoreButton from './LoadMoreButton';

afterEach(cleanup);

describe('handles LoadMoreButton', () => {
  it('renders LoadMoreButton', async () => {
    const mockEventHandler = jest.fn();
    const props = {
      isLoading: false,
      handleLoadingButton: mockEventHandler,
    };
    act(() => {
      render(
        <LoadMoreButton {...props} />,
      );
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.findByText('Loading'));
    });
  });
});
