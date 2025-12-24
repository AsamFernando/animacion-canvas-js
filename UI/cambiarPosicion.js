import { animacionCorriendo, draw} from "../js/scriptCanvas.js"
import { player, playerProps } from "../entidades/index.js"

const inicioXInput = document.getElementById("inicioX")
const inicioYInput = document.getElementById("inicioY")

// inicioXInput.value = playerProps.posX
// inicioYInput.value = playerProps.posY

//funciones para el evento de cambiar de posicion a player
const changePosX = (e) => {
    console.log(animacionCorriendo)
    console.log(e.target.value)
    // player.posX = parseFloat(e.target.value)
    // if(!animacionCorriendo) draw()
}
const changePosY = (e) => {
    player.posY = parseFloat(e.target.value)
    if(!animacionCorriendo) draw()
}

// //permite cambiar la posicion inicial de player en x e y con los inputs y dibujarla con
// //draw() sin comenzar el loop, este solo inicia si le doy al boton comenzar animacion
inicioXInput.addEventListener('input', changePosX)
inicioYInput.addEventListener('input', changePosY)

//COMENTARIOS
/*
ver si se puede refactorizar el tema de que reciba por parametro y no por import player, animacionCorriendo y draw
ver si se puede recibir por parametro los inputs

con la posicion inicial de player q esta en playerProps le doy el valor que muestran los input por defecto,
luego la posicion de player una vez instanciado si es cambiada por los inputs.
*/