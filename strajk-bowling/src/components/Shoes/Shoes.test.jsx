import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Shoes from './Shoes';
import { beforeEach, test, expect, vi } from 'vitest';
import { nanoid } from 'nanoid';

// Mock functions for props
const updateSize = vi.fn();
const addShoe = vi.fn();
const removeShoe = vi.fn();

const initialShoes = [
    { id: nanoid(), size: '' },
    { id: nanoid(), size: '' }
];

// Render the Shoes component before each test
beforeEach(() => {
  render(<Shoes updateSize={updateSize} addShoe={addShoe} removeShoe={removeShoe} shoes={initialShoes} />);
});

test('renders Shoes component', () => {
  // Check heading
  const heading = screen.getByRole('heading', { level: 2, name: /Shoes/i });
  expect(heading).toBeInTheDocument();

  // Check inputs
  initialShoes.forEach((shoe, index) => {
    const shoeInput = screen.getAllByRole('textbox')[index];
    expect(shoeInput).toBeInTheDocument();
  });

  // Check buttons
  const removeButtons = screen.getAllByRole('button', { name: '-' });
  const addButton = screen.getByRole('button', { name: '+' });

  expect(removeButtons).toHaveLength(initialShoes.length);
  expect(addButton).toBeInTheDocument();
});

test('adds a shoe input', () => {
  // Simulate adding a shoe
  fireEvent.click(screen.getByRole('button', { name: '+' }));
  
  // Check if addShoe was called
  expect(addShoe).toHaveBeenCalledTimes(1);
  expect(addShoe).toHaveBeenCalledWith(expect.any(String)); // Ensure addShoe is called with a string (id)
});

test('removes a shoe input', () => {
  // Get the first remove button and simulate click
  const removeButtons = screen.getAllByRole('button', { name: '-' });
  fireEvent.click(removeButtons[0]);

  // Check if removeShoe was called with the correct id
  expect(removeShoe).toHaveBeenCalledTimes(1);
  expect(removeShoe).toHaveBeenCalledWith(initialShoes[0].id);
});

test('updates shoe size', () => {
  // Get the first shoe input and simulate change
  const shoeInput = screen.getAllByRole('textbox')[0];
  fireEvent.change(shoeInput, { target: { value: '42' } });

  // Check if updateSize was called with the correct parameters
  expect(updateSize).toHaveBeenCalledTimes(1);
  expect(updateSize).toHaveBeenCalledWith(expect.any(Object));
});
