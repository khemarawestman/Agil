import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';
import { test, expect, vi } from 'vitest';

const setConfirmation = vi.fn();

test('renders Navigation component', () => {
  render(<Navigation setConfirmation={setConfirmation} />);

  
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('toggles menu on icon click', () => {
  render(<Navigation setConfirmation={setConfirmation} />);

  
  expect(screen.getByRole('link', { name: /Booking/i })).toHaveClass('hide');


  fireEvent.click(screen.getByRole('img'));
  expect(screen.getByRole('link', { name: /Booking/i })).not.toHaveClass('hide');

  
  fireEvent.click(screen.getByRole('img'));
  expect(screen.getByRole('link', { name: /Booking/i })).toHaveClass('hide');
});

test('calls setConfirmation on Booking link click', () => {
  render(<Navigation setConfirmation={setConfirmation} />);

  fireEvent.click(screen.getByRole('img'));

 
  fireEvent.click(screen.getByRole('link', { name: /Booking/i }));


  expect(setConfirmation).toHaveBeenCalledTimes(1);
  expect(setConfirmation).toHaveBeenCalledWith({});
});
