import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders country list title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Country List/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search countries.../i);
  expect(searchInput).toBeInTheDocument();
});

test('renders dark mode toggle', () => {
  render(<App />);
  const darkModeButton = screen.getByText(/Dark Mode/i);
  expect(darkModeButton).toBeInTheDocument();
});

test('fetches and displays countries', async () => {
  render(<App />);
  await waitFor(() => {
    const countryElements = screen.getAllByRole('article');
    expect(countryElements.length).toBeGreaterThan(0);
  });
});

test('handles error when fetching countries', async () => {
  // Mock fetch to return an error
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    })
  );

  render(<App />);
  await waitFor(() => {
    const errorElement = screen.getByText(/Error:/i);
    expect(errorElement).toBeInTheDocument();
  });

  // Restore the original fetch function
  global.fetch.mockRestore();
});