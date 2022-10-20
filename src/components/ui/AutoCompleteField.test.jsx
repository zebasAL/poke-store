import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import AutoCompleteField from './AutoCompleteField';

afterEach(cleanup);

describe('handles autocomplete field', () => {
  it('renders AutoCompleteField and handles on change event', () => {
    const mockEventHandler = jest.fn();
    const props = {
      searchValue: 'lorem',
      setSearchValue: mockEventHandler,
    };

    render(<AutoCompleteField {...props} />);

    const field = screen.getByDisplayValue(props.searchValue);
    fireEvent.change(field, { target: { value: 'lorem ipsum' } });
    expect(mockEventHandler).toHaveBeenCalledTimes(1);
  });
});
