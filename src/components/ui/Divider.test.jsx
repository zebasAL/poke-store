import React from 'react';
import {
  render,
  screen,
  cleanup,
} from '@testing-library/react';
import Divider from './Divider';

afterEach(cleanup);

describe('handles divider label', () => {
  it('renders Divider and handles label name', () => {
    const props = {
      label: 'lorem',
    };

    render(<Divider {...props} />);

    screen.getByText(props.label);
  });
});
