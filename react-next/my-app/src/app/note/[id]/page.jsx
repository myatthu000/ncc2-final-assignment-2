"use client";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteNote, getDataId } from "@/app/lib/apiService";

export default function Page({ params }) {
  // const router = useRouter();
  const noteId = params.id;
  const [note, setNote] = useState([]);
  useEffect(() => {
    fetchNoteDetail();
  }, [noteId]);

  const fetchNoteDetail = async () => {
    try {
      const data = await getDataId(noteId);
      setNote(data);
      console.log("data ------> ", data);
    } catch (error) {
      console.log("error --> ", error);
      const isConfirmed = window.confirm("Note data does not exit.");
      if (!isConfirmed || isConfirmed) {
        window.history.back();
      }
    }
  };

  const deleteNoteHandler = async (id) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this note?"
      );

      if (!isConfirmed) {
        return;
      }

      await deleteNote(id);
      // console.log(`Note with ID ${id} deleted successfully`);
      // router.push("/");
      window.history.back()
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      {/* <NoteDetailItem data={note} deleteNoteHandler={deleteNoteHandler} /> */}
      <div className="">
        <Link
          href={"/"}
          className={"d-block mx-auto col-md-8 col-lg-6 col-xl-6 col-12 mt-4"}
        >
          back
        </Link>
        <div
          className={
            " position-relative py-3 px-4 col-12 col-md-8 col-lg-6 mx-auto mb-5 mt-2 bg-light"
          }
        >
          <div
            className={
              "badge bg-transparent text-black position-absolute top-0 end-0"
            }
          >
            <span>{new Date(note.created_at).toLocaleString() ?? "date"}</span> |
            <button
              data-testid="delete-button"
              onClick={()=>deleteNoteHandler(note.id)}
              className="btn btn-transparent me-2"
            >
              <i className={"bi bi-trash text-danger"}></i>
            </button>
            <Link
              data-testid="edit-link"
              href={`/note/edit/${note.id}/`}
              className="btn btn-transparent me-2"
            >
              <i className={"bi bi-pen text-info"}></i>
            </Link>
          </div>
          <p>{note.title}</p>
          <hr />
          <p>{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export function NoteDetailItem(props) {
  const { id, title, description, created_at, updated_at } = props.data;

  const deleteNote = () => {
    props.deleteNoteHandler(id);
  };
  return (
    <div className="">
      <Link
        href={"/"}
        className={"d-block mx-auto col-md-8 col-lg-6 col-xl-6 col-12 mt-4"}
      >
        back
      </Link>
      <div
        className={
          " position-relative py-3 px-4 col-12 col-md-8 col-lg-6 mx-auto mb-5 mt-2 bg-light"
        }
      >
        <div
          className={
            "badge bg-transparent text-black position-absolute top-0 end-0"
          }
        >
          <span>{new Date(created_at).toLocaleString() ?? "date"}</span> |
          <button
            data-testid="delete-button"
            onClick={deleteNote}
            className="btn btn-transparent me-2"
          >
            <i className={"bi bi-trash text-danger"}></i>
          </button>
          <Link
            data-testid="edit-link"
            href={`/note/edit/${id}`}
            className="btn btn-transparent me-2"
          >
            <i className={"bi bi-pen text-info"}></i>
          </Link>
        </div>
        <p>{title}</p>
        <hr />
        <p>{description}</p>
      </div>
    </div>
  );
}
