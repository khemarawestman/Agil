import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from './BookingInfo';
import { beforeEach, test, expect, vi } from 'vitest';

// Mock functions for BookingInfo
const updateBookingDetails = vi.fn();

beforeEach(() => {
  render(<BookingInfo updateBookingDetails={updateBookingDetails} />);
});

test('renders BookingInfo component', () => {
  // Check heading in BookingInfo
  expect(screen.getByRole('heading', { level: 2, name: /When, WHAT & Who/i })).toBeInTheDocument();

  // Check inputs by finding the labels and then their associated inputs
  expect(screen.getByText(/Date/i).nextElementSibling).toHaveAttribute('type', 'date');
  expect(screen.getByText(/Time/i).nextElementSibling).toHaveAttribute('type', 'time');
  expect(screen.getByText(/Number of awesome bowlers/i).nextElementSibling).toHaveAttribute('type', 'number');
  expect(screen.getByText(/Number of lanes/i).nextElementSibling).toHaveAttribute('type', 'number');
});

test('updates booking details when date is changed in BookingInfo', () => {
  fireEvent.change(screen.getByText(/Date/i).nextElementSibling, { target: { value: '2023-12-31' } });
  expect(updateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});

test('updates booking details when time is changed in BookingInfo', () => {
  fireEvent.change(screen.getByText(/Time/i).nextElementSibling, { target: { value: '18:00' } });
  expect(updateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});

test('updates booking details when number of awesome bowlers is changed in BookingInfo', () => {
  fireEvent.change(screen.getByText(/Number of awesome bowlers/i).nextElementSibling, { target: { value: '4' } });
  expect(updateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});

test('updates booking details when number of lanes is changed in BookingInfo', () => {
  fireEvent.change(screen.getByText(/Number of lanes/i).nextElementSibling, { target: { value: '2' } });
  expect(updateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});
