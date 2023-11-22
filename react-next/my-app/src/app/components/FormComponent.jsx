'use client';

import { useState } from "react";
import Link from "next/link";

export default function FormComponent({props}) {
  const {head} = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorLabel,setErrorLabel] = useState();
    const [loading, setLoading] = useState(false);

  
    const updateNote = () => {
      props.updateNoteHandler({
        title: title,
        description: description,
      });
    };

  return (
    <div className="">
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
          <h4>{props.head}</h4>
            {errorLabel ? <p className="text-danger text-sm">{errorLabel}</p> : null}
          <form onSubmit={createNote}>
            <div class="mb-3">
              <input
                type="text"
                className={"form-control border-0 rounded-0 mt-4"}
                placeholder="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div class="mb-3">
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
            <button type="submit" className={loading ? 'btn btn-disabled' : 'btn btn-primary'}>
                {loading ? 'loading...' : 'Create Note'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
