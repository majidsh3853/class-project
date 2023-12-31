const addBox = document.querySelector(".add-box"),
 popupBox = document.querySelector(".popup-box"),
 popupTitle = popupBox.querySelector("header p"),
 closeIcon = popupBox.querySelector("header i "),
 titleTag = popupBox.querySelector("input"),
 descTag = popupBox.querySelector("textarea"),
 addBtn = popupBox.querySelector("button");

 const months = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , 
                  "August" , "September" , "October" , "November" , "December"];
 const notes = JSON.parse(localStorage.getItem("notes") || "[]")
 let isUpdate = false, updateId
 addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
 });

 closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note"
    popupTitle.innerText = "Add a New Note"
    popupBox.classList.remove("show");
 });

 function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note , index) => {
        let liTag = `     <li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="setting">
                <i onclick="showMenu(this)" class="uli uil-ellipsis-h"></i>
                <ul class="menu">
                <li onclick = "updateNote(${index}, '${note.title}', '${note.description}')" class="uil uil-pen">Edit</li>
                <li onclick = "deleteNote(${index})" class="uil uil-trash">Delete</li>
             </ul>
            </div>
        </div>
    </li>`
    addBox.insertAdjacentHTML("afterend", liTag);
    });
       }
 showNotes();
 function showMenu(elem) {
    elem.parentElement.classList.add("show")
    document.addEventListener("click", e => {
        // hazf kardan show class az menu setting dar document click
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show")
        }

    })
    
 }
 function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this note?")
    if(!confirmDel)return; 
    notes.splice(noteId, 1) // hazf kardan on noti ke intekhab kardim iz array ya tasks
    //  save kardan note hay beroz dar localStorage
    localStorage.setItem( "notes",JSON.stringify(notes))
    showNotes()
}
function updateNote(noteId , title , desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note"
    popupTitle.innerText = "Update a Note"
    console.log(noteId, title, desc);
}

 addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;
    
    if(noteTitle || noteDesc){
        // gereftan mah va roz va sal va tarikh daghigh
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title:noteTitle, description:noteDesc,
            date:`${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);  //   ezafe kardan note jadid 

        }else{
            isUpdate = false;
            notes[updateId] = noteInfo ;  // beroz kardan note ha
        }
        
        // save kardan dar localStorage
        localStorage.setItem( "notes",JSON.stringify(notes))
        closeIcon.click();
        showNotes();
    }
  });