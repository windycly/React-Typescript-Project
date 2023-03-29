import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders selected users and teams', () => {
  render(<App />);
  const linkElement = screen.getByText(/selected users and teams/i);
  expect(linkElement).toBeInTheDocument();
});
