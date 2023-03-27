import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders title', () => {
  render(<Header />);
  const element = screen.getByText(/Artist Roster/i);
  expect(element).toBeInTheDocument();
});
