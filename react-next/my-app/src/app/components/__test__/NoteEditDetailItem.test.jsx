import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
import { NoteDetailItem } from '@/app/note/[id]/page';


describe('NoteDetailItem', () => {
  const mockNote = {
    id: 4,
    title: 'new title',
    description: 'new description',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  it('renders note details correctly', () => {
    render(<NoteDetailItem data={mockNote} />);
    
    // Assert that title and description are rendered
    expect(screen.getByText(mockNote.title)).toBeInTheDocument();
    expect(screen.getByText(mockNote.description)).toBeInTheDocument();
  });

  it('calls deleteNoteHandler when delete button is clicked', () => {
    const deleteNoteHandlerMock = jest.fn();
    render(<NoteDetailItem data={mockNote} deleteNoteHandler={deleteNoteHandlerMock} />);
    
    // Click the delete button
    fireEvent.click(screen.getByTestId('delete-button'));
    // fireEvent.click(screen.getByText('Create Note'));

    // Assert that deleteNoteHandler was called with the correct argument
    expect(deleteNoteHandlerMock).toHaveBeenCalledWith(mockNote.id);
  });

  it('navigates to the edit page when edit button is clicked', () => {
    render(<NoteDetailItem data={mockNote} />);

    // Assert that the correct navigation link is present
    expect(screen.getByTestId('edit-link')).toHaveAttribute('href', `/note/edit/${mockNote.id}`);
  });
});


// Pass Test case