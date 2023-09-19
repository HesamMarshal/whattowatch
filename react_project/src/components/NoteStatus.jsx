import { useNotes } from "../context/NoteContext";
import Message from "./Message";

function NoteStatus() {
  const notes = useNotes();
  console.log(notes);
  const allNotes = notes.length;
  const completedNotes = notes.filter((n) => n.completed).length;
  const unCompletedNotes = allNotes - completedNotes;

  if (!allNotes)
    return (
      <Message text="No notes to show" icon="❤">
        <p>Add Some Notes</p>
      </Message>
    );
  return (
    <ul className="note-status">
      <li>
        All <span>{allNotes}</span>
      </li>
      <li>
        completed <span>{completedNotes}</span>
      </li>
      <li>
        Open <span>{unCompletedNotes}</span>
      </li>
    </ul>
  );
}

export default NoteStatus;
