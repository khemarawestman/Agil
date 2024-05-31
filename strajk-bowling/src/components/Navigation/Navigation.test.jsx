import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';
import { test, expect, vi } from 'vitest';

const setConfirmation = vi.fn();

test('renders Navigation component', () => {
  render(<Navigation setConfirmation={setConfirmation} />);

  // Check if the navigation icon is present
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('toggles menu on icon click', () => {
  render(<Navigation setConfirmation={setConfirmation} />);

  // Check if the menu is hidden initially
  expect(screen.getByRole('link', { name: /Booking/i })).toHaveClass('hide');

  // Simulate icon click to show menu
  fireEvent.click(screen.getByRole('img'));
  expect(screen.getByRole('link', { name: /Booking/i })).not.toHaveClass('hide');

  // Simulate icon click to hide menu
  fireEvent.click(screen.getByRole('img'));
  expect(screen.getByRole('link', { name: /Booking/i })).toHaveClass('hide');
});

test('calls setConfirmation on Booking link click', () => {
  render(<Navigation setConfirmation={setConfirmation} />);

  // Simulate icon click to show menu
  fireEvent.click(screen.getByRole('img'));

  // Simulate link click
  fireEvent.click(screen.getByRole('link', { name: /Booking/i }));

  // Check if setConfirmation was called
  expect(setConfirmation).toHaveBeenCalledTimes(1);
  expect(setConfirmation).toHaveBeenCalledWith({});
});
