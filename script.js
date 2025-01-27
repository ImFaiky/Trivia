let base_preguntas = readText("base-preguntas.json");
let interprete_bp = JSON.parse(base_preguntas);
let pregunta;
let posibles_respuestas;
let btn_correspondiente = [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
]

const aufin = document.getElementById("aufin");
aufin.pause();

const au1 = document.getElementById("au");


let contadorpreguntas = 0;
const maxpregunta = 7;

escogerPreguntaAleatoria();
function escogerPreguntaAleatoria(){
    if(contadorpreguntas < maxpregunta){
        contadorpreguntas++;
        escogerPregunta(Math.floor(Math.random() * interprete_bp.length));
        
    }else{
        finalizarJuego();
    }
}

function finalizarJuego(){
    window.location.href = "shenglong.html";
    
}

let btns=[
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")

]

function desordenarRespuestas(pregunta){
    posibles_respuestas = [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3];
    posibles_respuestas.sort(()=> Math.random()-0.5)
    select_id("btn1").innerHTML = posibles_respuestas[0];
    select_id("btn2").innerHTML = posibles_respuestas[1];
    select_id("btn3").innerHTML = posibles_respuestas[2];
    select_id("btn4").innerHTML = posibles_respuestas[3];

}

let contador = 0;
const esferas = document.querySelectorAll(".esfera");

function activarEsfera(){
    if(contador < esferas.length){
        esferas[contador].classList.add("active");
        contador++;
    }
}

function mostrarModal(){
    const modal =  document.getElementById("modal-perdiste");
    modal.classList.remove("hidden");
    modal.style.display = "flex";
}

function cerrarModal(){
    const modal = document.getElementById("modal-perdiste");
    modal.classList.add("hidden");
    modal.style.display = "none";
    window.location.href = "index.html";
}


function oprimir_btn(i){
    if(posibles_respuestas[i] == pregunta.respuesta){
        btn_correspondiente[i].style.background = "orange";
        activarEsfera();
        setTimeout(() => {
            reiniciar()
        }, 3000);
    }else{
        btn_correspondiente[i].style.background = "red";
        confAudio();
        setTimeout(() => {
            mostrarModal();
        }, 2000);
    }
    
}

function confAudio(){
    au1.pause();
    aufin.play();
}

function reiniciar(){
    for(const btn of btn_correspondiente){
        btn.style.background = "";
    }
    escogerPreguntaAleatoria();
}

function escogerPregunta(n){
    pregunta = interprete_bp[n]
    select_id("pregunta").innerHTML = pregunta.pregunta;
    desordenarRespuestas(pregunta);
    
}



function select_id(id) {
    return document.getElementById(id);
}
  
function style(id) {
    return select_id(id).style;
}
  
function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
      texto = xmlhttp.responseText;
    }
    return texto;
}
  