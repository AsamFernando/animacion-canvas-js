import { animacionCorriendo, draw} from "../js/scriptCanvas.js"
import { player } from "../entidades/index.js"

const inicioXInput = document.getElementById("inicioX")
const inicioYInput = document.getElementById("inicioY")
let spanInicioX = document.getElementById("posX")
let spanInicioY = document.getElementById("posY")
const canvas1 = document.getElementById("canvas1")

spanInicioX.textContent = inicioXInput.value
spanInicioY.textContent = inicioYInput.value
inicioXInput.value = player.posX
inicioYInput.value = player.posY
inicioXInput.step = player.velocidad
inicioYInput.step = player.velocidad
inicioXInput.max = canvas1.width
inicioYInput.max = canvas1.height
inicioXInput.min = 0
inicioYInput.min = 0

//funciones para el evento de cambiar de posicion a player
const changePosX = (e) => {
    spanInicioX.textContent = e.target.value
    player.posX = parseFloat(e.target.value)
    if(!animacionCorriendo) draw()
    }
const changePosY = (e) => {
    spanInicioY.textContent = e.target.value
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


!!!Aclaracion mas importante
cuando cambio la posicion en los inputs puede llegar a romperse la colision por ej:
si me situo en posX q no es multiplo de 5 todas las posiciones q cambie con teclado tampoco van a ser multiplo o muchas de ellas
y ahi es donde puede romper la colision. Osea normalmente arrancando de cero siempre sumando 5 voy a caer en un multiplo de 5
pero si cambio la posicion con el input a una q no sea multiplo de 5 y como utilizo para manejar la velocidad steps de 5
y no de 1 en 1 va a haber posiciones multiplos de 5 por las q nunca voy a pasar y puede haber una colision a otra condicion
q deba cumplirse.
Lo ideal seria q la velocidad no dependa de la posicion en q se dibuja player en cada frame y esta siempre cambie de 1 en 1 y la velocidad dependa de q tan
rapido dibuje a player u otro metodo q las desacople.
FIX MOMENTANEO
hacer q los inputs solo admitan valores multiplos de la velocidad

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