import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/note/create/page';

describe('Page Component', () => {
  test('renders page with form elements', () => {
    render(<Page />);
    expect(screen.getByText('Create New Note')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('description')).toBeInTheDocument();
    expect(screen.getByText('Create Note')).toBeInTheDocument();
  });

  test('handles form submission with valid data', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    global.fetch = mockFetch;

    render(<Page />);

    fireEvent.change(screen.getByPlaceholderText('title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('description'), { target: { value: 'Test Description' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Create Note'));
    });

    expect(mockFetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/note/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Title',
        description: 'Test Description',
      }),
    });

    expect(screen.getByText('New note created successfully')).toBeInTheDocument();
  });

  test('handles form submission with invalid data', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    global.fetch = mockFetch;

    render(<Page />);

    await act(async () => {
      fireEvent.click(screen.getByText('Create Note'));
    });

    expect(screen.getByText('Title and Description cannot be null')).toBeInTheDocument();
  });
});


// Pass Test Case