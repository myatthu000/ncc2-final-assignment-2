import '@testing-library/jest-dom';
import { getDataId, updateNote, deleteNote } from '@/app/lib/apiService';


describe('deleteNote function', () => {
  it('deletes a note successfully', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    const id = 4;

    await expect(deleteNote(id)).resolves.not.toThrow();
    
    // Verify that fetch was called with the correct URL and method
    expect(global.fetch).toHaveBeenCalledWith(`http://127.0.0.1:8000/api/note/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('throws an error when deletion fails', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const id = 4;

    await expect(deleteNote(id)).rejects.toThrow(`Failed to delete note with ID ${id}`);
  });
});


describe('updateNote function', () => {
  it('updates a note successfully', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });

    const id = 4;
    const updatedNoteData = {
      title: 'update new title',
      description: 'update new description',
    };
    await expect(updateNote(id, updatedNoteData.title, updatedNoteData.description)).resolves.not.toThrow();
    
    expect(global.fetch).toHaveBeenCalledWith(`http://127.0.0.1:8000/api/note/${id}/`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'update new title',
        description: 'update new description',
      }),
    });
  });

  it('throws an error when update fails', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const id = 4;
    const updatedNoteData = {
      title: 'update new title',
      description: 'update new description',
    };
    await expect(updateNote(id, updatedNoteData.title, updatedNoteData.description))
    .rejects.toThrow(`Failed to update the note`);
  });
});


// Pass Test Case