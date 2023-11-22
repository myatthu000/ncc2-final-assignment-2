import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import Page from "@/app/note/[id]/page";
import {deleteNote} from "../../lib/apiService";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the API functions
jest.mock("./../../lib/apiService", () => ({
  getDataId: jest.fn(() => Promise.resolve({ 
    id: 4, title: "Test Title", description: "Test Description", created_at: new Date() 
  })),
  deleteNote: jest.fn(() => Promise.resolve()),
}));

describe("Note Detail Page Component", () => {
  it("renders note details correctly", async () => {
    const params = { id: 4 };
    
    await act(async () => {
      render(<Page params={params} />);
    });

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("deletes a note when delete button is clicked", async () => {
    const params = { id: 4 };

    await act(async () => {
      render(<Page params={params} />);
    });

    const deleteButton = screen.getByTestId("delete-button");

    // Mock window.confirm to return true
    jest.spyOn(window, "confirm").mockImplementation(() => true);

    fireEvent.click(deleteButton);

    // Wait for the async deleteNoteHandler function to complete
    await waitFor(() => {
      expect(deleteNote).toHaveBeenCalledWith(4);
      expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete this note?");
    });
  });
});
