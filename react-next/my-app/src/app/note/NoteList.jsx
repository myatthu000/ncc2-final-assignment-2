"use client";
import { useEffect, useState } from "react";
import "../components/NoteListItem.css"
import NoteItem from "../components/NoteItem";


export default function NoteList(){
    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        getDataHandler()
    },[])

    const getDataHandler = async() => {
            let response = await fetch("http://127.0.0.1:8000/api/note/");
            let data = await response.json();
            console.log(data, "data")
            setNotes(data)
    }

    return(
        <div className="d-flex justify-content-center align-item-center flex-wrap py-3">
            { 
                notes.map((note,index) => <NoteItem key={index} data={note} />) 
            }
        </div>
    )
}