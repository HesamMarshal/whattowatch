import { useNotes, useNotesDispatch } from "../context/NoteContext";

function NoteList({ sortBy }) {
  const notes = useNotes();
  const sortedNotes = sortNotes();

  return (
    <div className="note-list">
      {sortedNotes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          // onDeleteNote={onDeleteNote}

          // onComplete={onComplete}
        />
      ))}
    </div>
  );

  function sortNotes() {
    if (sortBy === "earliest")
      return [...notes].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

    if (sortBy === "latest")
      return [...notes].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    if (sortBy === "completed")
      return [...notes].sort(
        (a, b) => Number(a.completed) - Number(b.completed)
      );
    return notes;
  }
}

export default NoteList;

function NoteItem({ note }) {
  // const note = useNotes();
  const dispatch = useNotesDispatch();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className={`note-item ${note.completed ? "completed" : ""}`}>
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button
            onClick={() => dispatch({ type: "delete", payload: note.id })}
          >
            ❌
          </button>
          <input
            type="checkbox"
            name={note.id}
            id={note.id}
            value={note.id}
            checked={note.onComplete}
            onChange={(e) => {
              const noteId = Number(e.target.value);
              dispatch({ type: "completed", payload: noteId });
            }}
          />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-Us", options)}
      </div>
    </div>
  );
}
