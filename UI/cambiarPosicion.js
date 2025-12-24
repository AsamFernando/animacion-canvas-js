import { animacionCorriendo, draw} from "../js/scriptCanvas.js"
import { player, playerProps } from "../entidades/index.js"

const inicioXInput = document.getElementById("inicioX")
const inicioYInput = document.getElementById("inicioY")

inicioXInput.value = player.posX
inicioYInput.value = player.posY

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

//COMENTARIOS
/*
ver si se puede refactorizar el tema de que reciba por parametro y no por import player, animacionCorriendo y draw
ver si se puede recibir por parametro los inputs

con la posicion inicial de player q esta en playerProps le doy el valor que muestran los input por defecto,
luego la posicion de player una vez instanciado si es cambiada por los inputs.



!!!Aclaracion importante
Arreglado bug en el cual no se registraban los eventos de los input y no cambiaba de posicion player
un archivo .js que no esta importado a otro o no tiene ningun dato importado desde otro o no es un <script type="module">
no es un js module y por lo tanto no se ejecuta lo que tiene dentro x q no se carga en el dom, entonces para q se ejecute
el codigo de un archivo .js si no exporta nada tiene q estar importado por otro de esta manera import "../UI/cambiarPosicion.js"

aca es donde conviene obtener los valores de los inputs y cargar como predeterminados los valores de player en ellos,
luego en los eventos es player quien recibe los valores de los inputs.
no conviene cargar los valores de los inputs en los parametros de creacion de player x q puede haber conflictos con los,
como se crean instancias y objetos del dom.


*/