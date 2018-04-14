const fs = require('fs');

// Function to add note to the database
let addNote = (title, content) => {
    
    let notes = fetchNotes();
    let note = {
      title,
      content
    }; 

    let filteredNotes = notes.filter((note) => note.title === title);

    if (filteredNotes.length === 0) {
      notes.push(note);
      saveNotes(notes);
      return true;
    } 

    return false;

}

// helper function to fetch all notes
let fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return new Array();
  }
};

// helper function to save notes to database
let saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

// function to get all notes
let getAllNotes = () => {
  let notes =  fetchNotes();
  notes.forEach((note) => printNote(note));
}

// get a note with a specific title
let getNote = (title) => {

  let notes = fetchNotes();

  let filteredNote = notes.filter((note) => note.title === title)

  if (filteredNote.length === 0) {
    console.log(`There are no notes with the title ${title}`);
  } else {
    printNote(filteredNote[0]);
  }

}

let removeNote = (title) => {
  
  let notes = fetchNotes();

  if (notes.length === 0) {
    console.log("There are no notes to delete");
    return;
  }

  let filteredNotes = notes.filter((note) => note.title !== title);

  if (notes.length === filteredNotes.length) {
    console.log(`Cannot find the note with title ${title}`);
  } else {
    console.log(`Deleted note successfully`);
    saveNotes(filteredNotes);
  }

}

let printNote = (note) => {
  console.log(`Title is ${note.title}`);
  console.log(`Content is ${note.content}`);
  console.log("-------");
}

module.exports = {
  addNote,
  getAllNotes,
  getNote,
  removeNote
}