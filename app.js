

const tareas = [];
//no lo inicializo en la estructura, recien cuando lo agrego

let ulTareas = document.getElementById('ulTareas');
//Listar tareas
function listarTareas() {
    ulTareas.innerHTML = '';
    tareas.forEach(function (tarea, i){
    console.log(tarea, i);
    ulTareas.innerHTML += ` <li ><a class="tareaListada ${tarea.notas.length>0?'naranja':''}"" href="" data-toggle="modal" data-target="#exampleModal" onclick="llenarModal(${i})">${tarea.titulo} </a><button class="siguiente" onclick="progresoTareas(${i})">→</button></li>`;
    
})
}

//Agregar notas a las tareas

function llenarModal(index){
    let ulRecordatorio = document.querySelector("#ulRecordatorio");
    let tarea = tareas[index];
    ulRecordatorio.innerHTML = '';
    document.getElementById("exampleModalLabel").innerText = tarea.titulo;
    listarRecordatorio(tarea.notas);

    document.querySelector("#btnRecordatorio").dataset.id = index;
}

function agregarRecordatorio(){
    let index = event.target.dataset.id;
    let nota = document.querySelector("#inputRecordatorio").value
    tareas[index].notas.push(nota);
    console.log(tareas)
    listarTareas();
    listarRecordatorio(tareas[index].notas);
}
//LISTAR RECORDATORIO
function listarRecordatorio(notas){
    ulRecordatorio.innerHTML="";
   notas.forEach((item, i) => {
        ulRecordatorio.innerHTML += `<li>${item}<button onclick= "eliminarNota (${i})">X</button></li>`; 
    })

}





listarTareas();
ulTareas.innerHTML = '';


//Agregar tareas
function agregarTarea() {
    let tareaAgregada = document.getElementById('nombreTarea').value;
    tareas.push({ 
        titulo: tareaAgregada,
        notas: [],
    });

    localStorage.setItem("tareas", JSON.stringify(tareas))
    listarTareas();
}




//En proceso
const progreso = [];
let ulProgreso = document.getElementById('ulProgreso');

function progresoTareas(index){
    let tarea= tareas[index];
progreso.push(tarea);
tareas.splice(index,1);
listarTareas();
listarProgreso();
}

function listarProgreso (){
    ulProgreso.innerHTML='';
    progreso.forEach(function(tarea,i){
        console.log(tarea,i);
        ulProgreso.innerHTML += `<li><button class="devolver" onclick="devolverTarea(${i})">←</button>${tarea.titulo}</a><button class="siguiente" onclick="tareaCompletada(${i})">→</button></li>`;
        
    })
}


//Devolver a lista de tarea
function devolverTarea(index){
    tareas.push(progreso[index]);
    progreso.splice(index,1);
    listarTareas();
    listarProgreso();
}


//Completada
let completada =[];
let ulCompletadas = document.getElementById('ulCompletadas');

function tareaCompletada(index){
    completada.push(progreso[index]);
    progreso.splice(index,1);
    listarTareas();
    listarProgreso();
    listarCompletadas();
}
function listarCompletadas(){
    ulCompletadas.innerHTML='';
    completada.forEach(function(tarea,i){
    console.log(tarea,i);
    ulCompletadas.innerHTML +=`<li>${tarea.titulo} </a> <button class="devolver" onclick="devolverAProgreso(${i})">←</button></li>`;
})
}


//Devolver a Tarea en progreso 
function devolverAProgreso(index){
    progreso.push(completada[index]);
    completada.splice(index,1);
    listarProgreso();
    listarCompletadas();
}