"use client";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorLabel, setErrorLabel] = useState(null);
  const [passLabel, setPassLabel] = useState(null);
  
  
  const createNoteHandler = async (e) => {
    e.preventDefault();
    if (!title || !description) {
        console.error('Title and description are required.');
        setErrorLabel("Title and Description cannot be null")
        setPassLabel()
        return;
      }

    try {
        setLoading(true)
      let response = await fetch(`http://127.0.0.1:8000/api/note/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create a new note");
      }
      console.log("New note created successfully");
      setPassLabel("New note created successfully")
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating a new note:", error);
    }finally{
        setLoading(false)
        setErrorLabel()
    }
  };

  return (
    <div>
      {/* <FormComponent createNoteHandler={createNoteHandler} /> */}
      <div className="">
        <Link
          href={"/"}
          className={"d-block mx-auto col-md-8 col-lg-6 col-xl-6 col-12 mt-2"}
        >
          back
        </Link>
        <div
          className={
            " position-relative py-3 px-4 col-12 col-md-8 col-lg-6 mx-auto mb-5 mt-2 bg-light"
          }
        >
          <h4>Create New Note</h4>
            {errorLabel ? <p className="text-danger text-sm">{errorLabel}</p> : null}
            {passLabel ? <p className="text-success text-sm">{passLabel}</p> : null}
          <form onSubmit={createNoteHandler}>
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
            <button type="submit" 
            disabled={loading}
            className={loading ? 'btn btn-disabled' : 'btn btn-primary'}>
                {loading ? 'loading...' : 'Create Note'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
