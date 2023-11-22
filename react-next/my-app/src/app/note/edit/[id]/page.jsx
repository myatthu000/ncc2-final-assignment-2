"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDataId, updateNote } from "@/app/lib/apiService";

export default function Page({ params }) {
  // const router = useRouter();
  const id = params.id
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorLabel, setErrorLabel] = useState(null);
  const [passLabel, setPassLabel] = useState(null);
  useEffect(()=>{
    getData()
  },[id])

  const getData = async () => {
    try {
      const data = await getDataId(id);
      setTitle(data.title)
      setDescription(data.description)
    } catch (error) {
      console.log('error --> ',error)

      const isConfirmed = window.confirm("Note data does not exit.");
      if (!isConfirmed) {
        window.history.back()
      }
      window.history.back()
    }
  };

  const updateNoteHandler = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      // console.error("Title and description are required.");
      setErrorLabel("Title and Description cannot be null");
      setPassLabel()
      return;
    }

    try {
      setLoading(true);
      await updateNote(id, title, description)
      // console.log("New note updated successfully");
      setPassLabel("New note updated successfully")
      // getData()
    } catch (error) {
      console.error("Error updating a new note:", error);
    } finally {
      setLoading(false);
      setErrorLabel([]);
      window.history.back()
    }
  };

  return (
    <div>
      <div className="">
        <Link
          href={`/note/${id}/`} 
          className={"d-block mx-auto col-md-8 col-lg-6 col-xl-6 col-12 mt-2"}
        >back</Link>
        <div
          className={
            " position-relative py-3 px-4 col-12 col-md-8 col-lg-6 mx-auto mb-5 mt-2 bg-light"
          }
        >
          <h4>Edit Note</h4>
          {errorLabel ? <p className="text-danger text-sm">{errorLabel}</p> : null}
          {passLabel ? <p className="text-success text-sm">{passLabel}</p> : null}
          <form onSubmit={updateNoteHandler}>
            <div className="mb-3">
              <input
                type="text"
                className={"form-control border-0 rounded-0 mt-4"}
                placeholder="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                className={"form-control border-0 rounded-0 mb-4"}
                placeholder="description"
                rows={"5"}
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled = {loading}
              className={loading ? "btn btn-disabled" : "btn btn-primary"}
            >
              {loading ? "loading..." : "Update Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
