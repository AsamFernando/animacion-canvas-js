const canvas1 = document.getElementById("canvas1")
const ctx1 = canvas1.getContext("2d")
const body = document.body
const switchAnimacionBtn = document.getElementById("switchAnimacionBtn")
const mostrarCuadriculaBtn = document.getElementById("mostrarCuadriculaBtn")

//hacer una clase rectagulo o forma que reciba la cantidad de rects o huecos y cree
//calculando los valores de ancho alto y tamaño en base a las cantidades y los ubique de manera
//equivalente en el canvas

const rects = [
    {id:1, posX:0, posY:250, ancho:125, alto:50},
    {id:2, posX:175, posY:225, ancho:125, alto:37.5},
    {id:3, posX:350, posY:200, ancho:125, alto:25},
    {id:4, posX:525, posY:175, ancho:125, alto:12.5}
]

const rectPlayer = {
    id:1,
    posX:20,
    posY:20,
    ancho:15,
    alto:25
}

let velocidad = 5
let myReq;
let movingX = null
let movingY = null
let showCuadricula = false
let animacionCorriendo = true

const rectLlegoFinalCanvasX = () => rectPlayer.posX == canvas1.width - rectPlayer.ancho;
const rectLlegoInicioCanvasX = () => rectPlayer.posX == 0;
const rectLlegoFinalCanvasY = () => rectPlayer.posY == canvas1.height - rectPlayer.alto;
const rectLlegoInicioCanvasY = () => rectPlayer.posY == 0;

const mostrarCuadricula = () => {
    ctx1.beginPath();
    
    const cuadY = 12.5
    const cuadX = 12.5
    
    for (let yPos = cuadY; yPos < canvas1.height; yPos += cuadY) {
            ctx1.moveTo(0, yPos);
            ctx1.lineTo(canvas1.width, yPos);
        }
    for (let xPos = cuadX; xPos < canvas1.width; xPos += cuadX) {
        ctx1.moveTo(xPos, 0);
        ctx1.lineTo(xPos, canvas1.height);
    }
    ctx1.strokeStyle = "grey";
    ctx1.stroke();
}

const dibujarRectangulo = ({posX, posY, ancho, alto}) => {
    ctx1.fillRect(posX, posY, ancho, alto)
}

const dibujarRectangulos = () => {
      for(let rect of rects) {
        dibujarRectangulo(rect)
    }
}

const draw = () => {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    ctx1.fillText(`X: ${rectPlayer.posX} - Y: ${rectPlayer.posY}`, 1, 8, 60)
    
    dibujarRectangulo(rectPlayer)
    
    dibujarRectangulos()

    if(showCuadricula) {
        mostrarCuadricula()
    }

    if(movingX && movingX != null && !rectLlegoFinalCanvasX()) {
        rectPlayer.posX += velocidad
    }
    else if(!movingX && movingX != null && !rectLlegoInicioCanvasX()) {
        rectPlayer.posX -= velocidad
    }
    else {}

    if(movingY && movingY != null && !rectLlegoInicioCanvasY()) {
        rectPlayer.posY -= velocidad
    }
    else if(!movingY && movingY != null && !rectLlegoFinalCanvasY()) {
        rectPlayer.posY += velocidad
    }
    else {}

    myReq = window.requestAnimationFrame(draw)
}

draw()

const moverDerecha = (e) => {
    if(e.key == 'd') {
        movingX = true
    }
} 
const moverIzquierda = (e) => {
    if(e.key == 'a') {
        movingX = false
    }
} 
const moverArriba = (e) => {
    if(e.key == 'w') {
        movingY = true
    }
} 
const moverAbajo = (e) => {
    if(e.key == 's') {
        movingY = false
    }
} 
const frenarRect = (e) => {
    movingX = null
    movingY = null
}

const terminarLoop = (e) => {
    window.cancelAnimationFrame(myReq)
    switchAnimacionBtn.innerText = 'comenzar animacion'
    animacionCorriendo = false
}
const iniciarLoop = (e) => {
    draw()
    switchAnimacionBtn.innerText = 'terminar animacion'
    animacionCorriendo = true
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

window.addEventListener('keydown', moverDerecha)
window.addEventListener('keydown', moverIzquierda)
window.addEventListener('keydown', moverArriba)
window.addEventListener('keydown', moverAbajo)
window.addEventListener('keyup', frenarRect)
switchAnimacionBtn.addEventListener('click', switchLoop)
mostrarCuadriculaBtn.addEventListener('click', switchCuadricula)

//proximos cambios

//refactorizar las funciones y eventos y usar objetos donde se necesite
//sacar funciones fuera de draw o crear nuevas
//evitar mucho uso de if else
//hacer que la velocidad sea constante sin depender de refresh rate del monitor, con timestamp
//incorporar aceleracion al rectangulo
//incorporar gravedad y su aceleracion
//incorporar colisiones con otros rectangulo u objetos
//que el rectangulo pueda pegar un salto presionando la w o barra espaciadora
//que al pegar un salto se pueda desplazar en el aire con w y s
//incorporar desplazamiento en diagonal