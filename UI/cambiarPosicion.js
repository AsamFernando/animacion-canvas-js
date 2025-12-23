import { player, animacionCorriendo, draw } from "../js/scriptCanvas"

const inicioXInput = document.getElementById("inicioX")
const inicioYInput = document.getElementById("inicioY")

//funciones para el evento de cambiar de posicion a player
const changePosX = (e) => {
    player.posX = parseFloat(e.target.value)
    if(!animacionCorriendo) draw()
}
const changePosY = (e) => {
    player.posY = parseFloat(e.target.value)
    if(!animacionCorriendo) draw()
}

// //permite cambiar la posicion inicial de player en x e y con los inputs y dibujarla con
// //draw() sin comenzar el loop, este solo inicia si le doy al boton comenzar animacion
inicioXInput.addEventListener('input', changePosX)
inicioYInput.addEventListener('input', changePosY)