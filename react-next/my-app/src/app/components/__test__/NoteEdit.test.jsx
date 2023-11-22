import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import Page from "@/app/note/edit/[id]/page";
import {updateNote} from "./../../lib/apiService";

// Mock the API functions
jest.mock("./../../lib/apiService", () => ({
  getDataId: jest.fn(() => Promise.resolve({ 
    id: 1, title: "Test Title", description: "Test Description" 
})),
  updateNote: jest.fn(() => Promise.resolve()),
}));

describe("Edit Page Component", () => {
  it("renders note details and updates successfully", async () => {
    const params = { id: 1 };
    
    await act(async () => {
      render(<Page params={params} />);
    });

    // Check if initial data is loaded
    await waitFor(()=>{
        expect(screen.getByDisplayValue("Test Title")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
    })

    // Mock window.confirm to return true
    jest.spyOn(window, "confirm").mockImplementation(() => true);

    // Update note
    fireEvent.change(screen.getByPlaceholderText("title"), { target: { value: "Updated Title" } });
    fireEvent.change(screen.getByPlaceholderText("description"), { target: { value: "Updated Description" } });

    fireEvent.submit(screen.getByText("Update Note"));

    // Wait for the async updateNoteHandler function to complete
    await waitFor(() => {
      expect(updateNote).toHaveBeenCalledWith(1, "Updated Title", "Updated Description");
    });

    // Check if data is updated
    const updatedTitle = await screen.findByDisplayValue("Updated Title");
    const updatedDescription = await screen.findByDisplayValue("Updated Description");

    expect(updatedTitle).toBeInTheDocument();
    expect(updatedDescription).toBeInTheDocument();

  });
});


// Pass Test case