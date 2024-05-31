import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Confirmation from './Confirmation';
import { test, expect, vi } from 'vitest';

const confirmationDetails = {
  active: true,
  when: '2023-05-30T14:30:00',
  people: 4,
  lanes: 1,
  id: 'booking123',
  price: 580,
};

const setConfirmation = vi.fn();

test('renders Confirmation component with details', () => {
  render(<Confirmation confirmationDetails={confirmationDetails} setConfirmation={setConfirmation} />);

  // Debug: log the HTML output of the rendered component
  screen.debug();

  // Check heading
  expect(screen.getByRole('heading', { name: /See you soon!/i })).toBeInTheDocument();

  // Check input fields by finding the input elements directly
  const whenInput = screen.getByDisplayValue('2023-05-30 14:30:00');
  const whoInput = screen.getByDisplayValue('4');
  const lanesInput = screen.getByDisplayValue('1');
  const bookingNumberInput = screen.getByDisplayValue('booking123');

  expect(whenInput).toBeInTheDocument();
  expect(whoInput).toBeInTheDocument();
  expect(lanesInput).toBeInTheDocument();
  expect(bookingNumberInput).toBeInTheDocument();

  // Check price
  expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  expect(screen.getByText(/580 sek/i)).toBeInTheDocument();

  // Check button
  expect(screen.getByRole('button', { name: /Sweet, let's go!/i })).toBeInTheDocument();
});

test('calls setConfirmation on button click', () => {
  render(<Confirmation confirmationDetails={confirmationDetails} setConfirmation={setConfirmation} />);

  // Simulate button click
  fireEvent.click(screen.getByRole('button', { name: /Sweet, let's go!/i }));

  // Check if setConfirmation was called
  expect(setConfirmation).toHaveBeenCalledTimes(1);
  expect(setConfirmation).toHaveBeenCalledWith({});
});

test('renders "Inga bokning gjord!" when no active booking', () => {
  render(<Confirmation confirmationDetails={{}} setConfirmation={setConfirmation} />);

  // Check no booking message
  expect(screen.getByText(/Inga bokning gjord!/i)).toBeInTheDocument();
});
