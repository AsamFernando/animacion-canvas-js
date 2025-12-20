const canvas1 = document.getElementById("canvas1")
const ctx1 = canvas1.getContext("2d")
const body = document.body
const switchAnimacionBtn = document.getElementById("switchAnimacionBtn")
const mostrarCuadriculaBtn = document.getElementById("mostrarCuadriculaBtn")

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
    ancho:20,
    alto:30,
    velocidad:5,
    finX() {return this.posX == canvas1.width - this.ancho},
    finY() {return this.posY == canvas1.height - this.alto},
    inicioX() {return this.posX == 0},
    inicioY() {return this.posY == 0},
    w() {if(!this.inicioY()) this.posY -= this.velocidad},
    s() {if(!this.finY()) this.posY += this.velocidad},
    a() {if(!this.inicioX()) this.posX -= this.velocidad},
    d() {if(!this.finX()) this.posX += this.velocidad},
}

let moving = false; //flag para arrancar la animacion de rectPlayer o frenarla
let keyPressed = "" //variable para poder guardar el caracter de la key presionada en el evento y pasarla a rectPlayer con [] y usar la funcion de movimiento
let myReq;
let showCuadricula = false
let animacionCorriendo = true //flag para arrancar o terminar el loop draw

const dibujarRectangulo = ({posX, posY, ancho, alto}) => {
    ctx1.fillRect(posX, posY, ancho, alto)
}

const dibujarRectangulos = () => {
      for(let rect of rects) {
        dibujarRectangulo(rect)
    }
}

const draw = () => {
    let contadorFrames = 1
    contadorFrames += 1
    console.log(contadorFrames)

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    ctx1.fillText(`X: ${rectPlayer.posX} - Y: ${rectPlayer.posY}`, 1, 8, 60)
    
    dibujarRectangulo(rectPlayer)
    
    dibujarRectangulos()

    if(showCuadricula) {
        mostrarCuadricula()
    }

    if(moving) {
        rectPlayer[keyPressed]()
    }

    myReq = window.requestAnimationFrame(draw)
}

draw()

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

const mover = (e) => {
    const keys = ['w', 'a', 's', 'd']
    if(keys.includes(e.key)) {
        keyPressed = e.key
        moving = true
    }
}
const frenar = (e) => {
    moving = false
}

window.addEventListener('keydown', mover)
window.addEventListener('keyup', frenar)
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