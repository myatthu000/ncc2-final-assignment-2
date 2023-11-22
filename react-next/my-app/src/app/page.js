// import Image from 'next/image'
// import styles from './page.module.css'
import NoteList from "./note/NoteList";

export default function Home() {
  return (
    <main className={`container mx-auto pt-3 border h-100vh`}>
      <NoteList />

    </main>
  );
}
