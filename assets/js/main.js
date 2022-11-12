/*Dopamina*/
/*Frase: generador de frases en inglés */
const api = "https://api.quotable.io/random";

const frase = document.getElementById("frase");
const autor = document.getElementById("autor");
const btnFrase = document.getElementById("btnFrase");

btnFrase.addEventListener("click", getQuote);

function getQuote() {
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      frase.innerHTML = `"${data.content}"`;
      autor.innerHTML = `- ${data.author}`;
    });
}

/*Tareas de hoy: crea listas de tareas del día */
const input = document.querySelector("input");
const btnagregar = document.querySelector(".btnAgregar");
const ul = document.querySelector("ul");
const empty = document.querySelector(".vacío");

btnagregar.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input.value;

  if (text !== "") {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = text;

    li.appendChild(p);
    li.appendChild(btnborrar());
    ul.appendChild(li);

    input.value = "";
    empty.style.display = "none";
  }
});

function btnborrar() {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className = "btnBorrar";

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    ul.removeChild(item);

    const items = document.querySelectorAll("li");

    if (items.length === 0) {
      empty.style.display = "block";
    }
  });

  return deleteBtn;
}

/*Endorfina*/
/*gif: generador de gif */
document.getElementById('btnGif').onclick = function showSomeCats() {
    document.getElementById('gif').innerHTML = ('<img src="http://edgecats.net/' + Math.random() + '"/>');
  };

/*Oxitocina */
/*Pomodoro; temporizador para pomodoro*/
var empezar = document.getElementById('empezar');
var pausa = document.getElementById('pausa');
var reset = document.getElementById('reset');

var minc = document.getElementById('minC');
var segc = document.getElementById('segC');

var minb = document.getElementById('minB');
var segb = document.getElementById('segB');

var inicio;

empezar.addEventListener('click', function(){
    if(inicio === undefined){
        inicio = setInterval(timer, 1000) 
    } else{
        alert('Ya se inició el timer')
    }
})

reset.addEventListener("click", function(){
    minc.innerText = 25;
    segc.innerText = "00";
        
    minb.innerText = 5;
    segb.innerText = "00";

    document.getElementById('contador').innerText = 0;
    pausar()
    inicio = undefined
})

pausa.addEventListener('click', function(){
    pausar()
    inicio = undefined;
})

function timer(){
    if(segc.innerText != 00){
        segc.innerText --;
    } else if(minc.innerText != 0 && segc.innerText == 0){
        segc.innerText = 59;
        minc.innerText --;
    }

    if(minc.innerText == 0 && segc.innerText == 0) {
        if(segb.innerText != 0){
            segb.innerText--;
        }else if(minb.innerText != 0 && segb.innerText == 0){
            segb.innerText = 59;
            minb.innerText --;
        }
    }

    if(minc.innerText == 0 && segc.innerText == 0 && minb.innerText == 0 && segb.innerText == 0 ){
        minc.innerText = 25;
        segc.innerText = "00";
        
        minb.innerText = 5;
        segb.innerText = "00";
        
        document.getElementById("contador").innerText++;
    }
} 

function pausar(){
    clearInterval(inicio);
}



/*Post it: creador de notas */
const containerpostit = document.getElementById("postit");
const btnnotas = containerpostit.querySelector(".btnNotas");

obtnnotas().forEach((postit) => {
  const notas = crearnota(postit.id, postit.content);
  containerpostit.insertBefore(notas, btnnotas);
});

btnnotas.addEventListener("click", () => addNote());

function obtnnotas() {
  return JSON.parse(localStorage.getItem("postitnotas") || "[]");
}

function guardar(notes) {
  localStorage.setItem("postitnotas", JSON.stringify(notes));
}

function crearnota(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("notas");
  element.value = content;
  element.placeholder = "Hacer doble click para eliminar.";

  element.addEventListener("change", () => {
    actualizar(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "¿Quiéres borrarla?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = obtnnotas();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = crearnota(noteObject.id, noteObject.content);
  containerpostit.insertBefore(noteElement, btnnotas);

  notes.push(noteObject);
  guardar(notes);
}

function actualizar(id, newContent) {
  const notes = obtnnotas();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  guardar(notes);
}

function deleteNote(id, element) {
  const notes = obtnnotas().filter((note) => note.id != id);

  guardar(notes);
  containerpostit.removeChild(element);
}
