import React from 'react';
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import rootReducer from '../../reducer';
import FlipSwitch from './FlipSwitch';

afterEach(cleanup);

const store = createStore(rootReducer);

describe('handles switch', () => {
  it('renders switchflip', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <FlipSwitch />
          </Router>
        </Provider>
        ,
      );
    });

    const button = screen.getByTestId('shiny');
    fireEvent.click(button);

    await waitFor(() => {
      expect(button.classList.contains('on')).toBe(true);
    });
  });
});
