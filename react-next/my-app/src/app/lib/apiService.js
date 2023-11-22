export const getDataId = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/note/${id}/`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Note not found");
      } else {
        throw new Error("Failed to fetch note details");
      }
    }
    return response.json();
};

export const updateNote = async (id, title, description) => {
    const response = await fetch(`http://127.0.0.1:8000/api/note/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update the note");
    }
};

export const deleteNote = async(id) => {
  const response = await fetch(`http://127.0.0.1:8000/api/note/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete note with ID ${id}`);
  }
}