import noteView from "./notehandler.js";

const plusBtn = document.querySelector(".plus");
const backBtn = document.querySelector(".return");
const optionsBtn = document.querySelector(".more");
const saveBtns = document.querySelectorAll(".save");
const deleteBtn = document.querySelector(".delete");
const printBtn = document.querySelector(".print");
const copyBtn = document.querySelector(".copy");
const clearBtn = document.querySelector(".deleteall");
const container = document.querySelector(".notecontainer");
const displayPage = document.querySelector(".notedisplay");
const editor = document.querySelector(".editor");
const titleBar = document.querySelector("#inptitle");
const textSpace = document.querySelector("#inptext");

function updateTiles() {
  const allTiles = noteView.getAllNotes();

  container.innerHTML = "";
  allTiles.forEach((tile) => {
    container.innerHTML =
      container.innerHTML +
      `
        <div class="bg-yellow-100 p-5 rounded-2xl note flex flex-col tile" id=${
          tile.id
        }>
          <label class=" w-[100%] text-xl font-semibold line-clamp-[1]" >
            ${tile.title}
          </label>

          <p class="line-clamp-[7] my-1 flex-1">${tile.body}</p>

          <p class="  text-[11px] font-semibold italic m-0 text-right">
            ${
              tile.lastModified.slice(15, 21) +
              " " +
              tile.lastModified.slice(4, 15)
            }
          </p>
        </div>`;
  });
  addListener();
}

function addListener() {
  const allTiles = document.querySelectorAll(".tile");
  allTiles.forEach((tile) => {
    tile.addEventListener("click", function () {
      openEditor(tile.id);
    });
  });
}

function openEditor(index = 0) {
  changePage();
  console.log("caller id:" + index);
  loadNoteInEditor(index);
}

function changePage() {
  // console.log(container);
  displayPage.classList.toggle("hidden");
  editor.classList.toggle("hidden");
}

function loadNoteInEditor(index = 0) {
  editor.id = index;
  if (index) {
    const curNote = noteView.fetchNote(index);
    titleBar.value = curNote.title;
    textSpace.value = curNote.body;
  } else {
    titleBar.value = "";
    textSpace.value = "";
  }
  console.log("editor id:" + editor.id);
}

saveBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    console.log("saving id:" + editor.id);
    let curNote = {
      id: editor.id,
      title: titleBar.value,
      body: textSpace.value,
    };

    if (curNote.body == "" && curNote.title == "") {
      noteView.deleteNote(curNote.id);
    } else noteView.saveNote(curNote);

    updateTiles();
    changePage();
  });
});

deleteBtn.addEventListener("click", function () {
  console.log("deleting id:" + editor.id);
  noteView.deleteNote(editor.id);
  updateTiles();
  changePage();
});

optionsBtn.addEventListener("click", function () {
  optionsBtn.nextElementSibling.classList.toggle("hidden");
});

backBtn.addEventListener("click", changePage);

plusBtn.addEventListener("click", function () {
  openEditor();
});

copyBtn.addEventListener("click", function () {
  let copiedText = titleBar.value + "\n" + textSpace.value;
  console.log(copiedText);
  navigator.clipboard.writeText(copiedText);
  alert("Copied to clipboard: \n" + copiedText);
});

clearBtn.addEventListener("click", function () {
  localStorage.clear();
  updateTiles();
});

printBtn.addEventListener("click", () => print());

window.onload = () => updateTiles();
