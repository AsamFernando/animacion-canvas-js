import mostrarCuadricula from "../modulos_js/cuadricula.js"
import {keys} from "../modulos_js/controles.js"
import Rectangulo from "../modulos_js/escenario.js"
import Player from "../modulos_js/player.js"

const canvas1 = document.getElementById("canvas1")
const ctx1 = canvas1.getContext("2d")
const body = document.body
const switchAnimacionBtn = document.getElementById("switchAnimacionBtn")
const mostrarCuadriculaBtn = document.getElementById("mostrarCuadriculaBtn")
const inicioXInput = document.getElementById("inicioX")
const inicioYInput = document.getElementById("inicioY")
const inicioX = parseFloat(inicioXInput.value)
const inicioY = parseFloat(inicioYInput.value)

const rectsProps = [
    {id:1, posX:0, posY:250, ancho:125, alto:50},
    {id:2, posX:175, posY:225, ancho:125, alto:45},
    {id:3, posX:350, posY:200, ancho:125, alto:25},
    {id:4, posX:525, posY:175, ancho:125, alto:15}
]
const playerProps = {id:5, posX:inicioX, posY:inicioY, ancho:10, alto:10, velocidad:5}

const crearRect = (props) => {
    return new Rectangulo(props)
}

const rects = rectsProps.map(r => crearRect(r))
const player = new Player(playerProps)

let FPS = 0
let keyPressed = "w"
let myReq;
let showCuadricula = false
let animacionCorriendo = false
let variablePrueba = false //prueba de variable para merge de ramas

const dibujarRectangulo = ({posX, posY, ancho, alto}) => {
    ctx1.fillRect(posX, posY, ancho, alto)
}

const dibujarRectangulos = () => {
      for(let rect of rects) {
        dibujarRectangulo(rect)
    }
}

const draw = () => {
    FPS += 1
    
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    ctx1.fillText(`FPS: ${FPS}`, 599, 8, 50) 
    ctx1.fillText(`X: ${player.posX} - Y: ${player.posY}`, 1, 8, 60)
    ctx1.fillText(`rectX: ${rects[1].posX} - rectY: ${rects[1].posY}`, 70, 8, 120)
    ctx1.fillText(`Xf: ${player.posXf} - Yf: ${player.posYf}`, 1, 18, 60)
    ctx1.fillText(`rectXf: ${rects[1].posXf} - rectYf: ${rects[1].posYf}`, 70, 18, 120)
    
    dibujarRectangulo(player)
    
    dibujarRectangulos()

    if(showCuadricula) {
        mostrarCuadricula(ctx1)
    }
    
    if(keys[keyPressed].state && !keys[keyPressed].onColision(player, rects[1])) {
        keys[keyPressed].move(player, canvas1)
    }
    
    if(animacionCorriendo) {
        myReq = window.requestAnimationFrame(draw)
    }
}

draw() 

const terminarLoop = (e) => {
    window.cancelAnimationFrame(myReq)
    switchAnimacionBtn.innerText = 'comenzar animacion'
    animacionCorriendo = false
}
const iniciarLoop = (e) => {
    animacionCorriendo = true
    switchAnimacionBtn.innerText = 'terminar animacion'
    draw()
}

const switchLoop = (e) => {
    if(animacionCorriendo) {
        terminarLoop()
    }
    else {
        iniciarLoop()
    }
}

const switchCuadricula = (e) => {
    if(showCuadricula) {
        mostrarCuadriculaBtn.innerText = 'mostrar cuadricula'
    }
    else {
        mostrarCuadriculaBtn.innerText = 'ocultar cuadricula'
    }
    showCuadricula = !showCuadricula
}

const mover = (e) => {
    if(keys[e.key]) {
        keyPressed = e.key
        keys[e.key].state = true
    }
}

const frenar = (e) => {
    if(keys[e.key]) {
        keys[e.key].state = false
    }
        
}

const changePosX = (e) => {
    player.posX = parseFloat(e.target.value)
    if(!animacionCorriendo) draw()
}
const changePosY = (e) => {
    player.posY = parseFloat(e.target.value)
    if(!animacionCorriendo) draw()
}

window.addEventListener('keydown', mover)
window.addEventListener('keyup', frenar)
switchAnimacionBtn.addEventListener('click', switchLoop)
mostrarCuadriculaBtn.addEventListener('click', switchCuadricula)
inicioXInput.addEventListener('input', changePosX)
inicioYInput.addEventListener('input', changePosY)

//CORRECCIONES
//--

//proximos cambios

//refactorizar las funciones y eventos y usar objetos donde se necesite
//sacar funciones fuera de draw o crear nuevas
//evitar mucho uso de if else
//hacer que la velocidad sea constante sin depender de refresh rate del monitor, con timestamp
//incorporar aceleracion al rectangulo
//incorporar gravedad y su aceleracion
//refactorizar las funciones que verifican las colisiones
//que el rectangulo pueda pegar un salto presionando la w o barra espaciadora
//que al pegar un salto se pueda desplazar en el aire con w y s
//incorporar desplazamiento en diagonal
//dividir en varios archivos tipo, colisiones.js, keys.js, inputs.js, player.js, y objects.js ... etc., hasta dejar solo draw() en este archivo.
//poder colisionar con cualquier rectangulo del listado
//incorporar colisiones con objetos distintos de rectangulos, por ej circulo o rombo
//agregar una rama con todos los comentarios del codigo
//crear archivo UI para los inputs de posicion, botones y cuadricula
//hacer una clase rectagulo o forma que reciba la cantidad de rects o huecos y cree
//calculando los valores de ancho alto y tamaño en base a las cantidades y los ubique de manera
//equivalente en el canvas
//por el momento los rectangulos son multiplos de 5 para acertar colisiones por posicion de x e y
//ver flujo de estudio con comentarios ramas e historial de ramas y commits

//COMPLETADOS
//incorporar colisiones con otros rectangulo -> hecho
//agregar inputs para dar una posicion inicial -> hecho
//BUG: al colisionar las aristas de player con el rectangulo no permite avanzar hacia el rectangulo desde ninguno de los
//4 lados -> solucionado
//hacer una clase rectangulo q va a permitir agregar mas funcionalidad al player y escenario 
//a la que le paso los minimos valores de representacion y tienen las
//funciones para posicionarse y colisionar -> hecho