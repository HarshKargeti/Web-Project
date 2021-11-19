console.log("Hello");
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function(e){

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
}) 

function showNotes() {
     let notes = localStorage.getItem("notes");
     if(notes == null){
         notesObj = [];
     }
     else{
         notesObj = JSON.parse(notes);
      } 

    let html = "";
    notesObj.forEach(function(element, index){
        html +=`
        <div id="myDiv${index}" class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index+1}</h5>
              <p class="card-text"> ${element}</p>
              <button id="${index}" onclick ="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
              <button id="${index}" onclick = "impNote(this.id)" class="btn btn-primary">Imp Note</button>
            </div>
        </div>`;
    });
    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = "Nothing to show!"
    }
}

//Delete a note

function deleteNote(index){
    console.log("Deleting");

    let notes = localStorage.getItem("notes");
     if(notes == null){
         notesObj = [];
     }
     else{
         notesObj = JSON.parse(notes);
      } 

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes(); 
}

function impNote(index){
    //document.getElementById("btn").style.backgroundColor = "green";
    str = "myDiv"+index;
    document.getElementById(str).style.backgroundColor = "red";
    console.log("Important");
    console.log(index);
}

let search = document.getElementById("search");
search.addEventListener("input", function(){
    console.log("Input event")

    let inputVal = search.value.toLowerCase();
    console.log('Input event', inputVal);
    let notecards = document.getElementsByClassName("noteCard");
    Array.from(notecards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.toLowerCase().includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        //console.log(cardTxt);
    })
})