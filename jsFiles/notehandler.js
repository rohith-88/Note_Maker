class noteView {
  static getAllNotes() {
    const allNotes = JSON.parse(localStorage.getItem("saved-notes")) || [];
    return allNotes.sort((a, b) => {
      return new Date(a.lastModified) > new Date(b.lastModified) ? -1 : 1;
    });
  }

  static fetchNote(index) {
    const allNotes = this.getAllNotes();
    return allNotes.find((note) => note.id == index);
  }

  static saveNote(curNote) {
    curNote.lastModified = new Date().toString().slice(0, 25);
    const allNotes = this.getAllNotes();
    const exists = allNotes.find((note) => note.id == curNote.id);

    if (exists) {
      exists.title = curNote.title;
      exists.body = curNote.body;
      exists.lastModified = curNote.lastModified;
    } else {
      curNote.id = Math.floor(Math.random() * 100000);
      allNotes.push(curNote);
    }
    localStorage.setItem("saved-notes", JSON.stringify(allNotes));
  }

  static deleteNote(index) {
    let allNotes = this.getAllNotes();
    // console.log(allNotes);
    allNotes = allNotes.filter((note) => note.id != index);
    // console.log(allNotes);
    localStorage.setItem("saved-notes", JSON.stringify(allNotes));
  }
}

export default noteView;
