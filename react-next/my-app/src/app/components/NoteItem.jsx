"use client";
import Link from "next/link";

export default function NoteItem(props){
    // props.data. .slice(0,25) + "...."}
    const id = "1"
    const title = "Test Note"
    const description = "This is a test note description."
    return(
        <Link 
            href={`/note/${props.data.id}/`} 
            className={"text-black text-decoration-none"}>
            <div className={"border border-2 rounded px-2 py-4 w-500 m-1"}>
                <p className={"font-bold mb-2"}>{props.data.title}</p>
                <p className={"mb-2"}>{props.data.description.slice(0,10) + "...."}</p>
            </div>
        </Link>
    )
}