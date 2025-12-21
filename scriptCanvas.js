const canvas1 = document.getElementById("canvas1")
const ctx1 = canvas1.getContext("2d")
const body = document.body
const switchAnimacionBtn = document.getElementById("switchAnimacionBtn")
const mostrarCuadriculaBtn = document.getElementById("mostrarCuadriculaBtn")
const inicioXInput = document.getElementById("inicioX")
const inicioYInput = document.getElementById("inicioY")
const inicioX = parseFloat(inicioXInput.value)
const inicioY = parseFloat(inicioYInput.value)

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
    {
        id:2,
        posX:175,
        posY:225,
        ancho:125,
        alto:37.5,
        posXf() {return this.posX + this.ancho},
        posYf() {return this.posY + this.alto},
    },
    {id:3, posX:350, posY:200, ancho:125, alto:25},
    {id:4, posX:525, posY:175, ancho:125, alto:12.5}
]
//tener en cuenta la velocidad, el ancho y alto del rectangulo ya que la suma de ambos podria no dar
//un valor igual a la resta entre el ancho o el alto del rectangulo y el canvas por ej:
//rectangulo
//velocidad = 10 ancho = 15 y alto = 25 
//canvas
//ancho = 600 alto = 300
//la suma posX del rectangulo mas velocidad: 580 + 10 = 590 se pasa de la resta entre el ancho del
//canvas y el ancho del rectangulo: 600 - 15 = 585 por lo que las funciones de fin en x e y
//nunca van a dar false ya que posX nunca toma el valor 585
//por lo tanto el rectangulo se sale del canvas hacia abajo y la derecha
//lo mismo ocurre si pongo la velocidad en 3 y me paro el x = 20 e y = 20 voy a tener numeros negativos
//al restar y me paso del inicio q es 0 0

const minPos = (inicio, posicion, velocidad) =>  {
    return Math.max(inicio, posicion - velocidad)
}
const maxPos = (final, posicion, velocidad) =>  {
    return Math.min(final, posicion + velocidad)
}

const rectPlayer = {
    id:5,
    posX:inicioX,
    posY:inicioY,
    ancho:15,
    alto:25,
    velocidad:3,
    // posXf:this.posX + this.ancho,//no funciona el this.posX ni el this.posY ya que al calcular la suma todavia no esta creado el objeto literal rectPlayer con sus propiedades y el this toma window en vez de posX o posY e intenta hacer window.posX o posY
    // posYf:this.posY + this.alto,//no funciona el this.posX ni el this.posY ya que al calcular la suma todavia no esta creado el objeto literal rectPlayer con sus propiedades y el this toma window en vez de posX o posY e intenta hacer window.posX o posY
    //se tiene q implementar como un getter, devolviendo la suma en una funcion
    //si uso get posXf () {return this.posX + this.ancho} luego puedo llamarla con this.posXf sin parentesis
    //lo ideal es usar get ya que esto es un valor calculado q deriva de las propiedades y no una accion, efecto o cambio de estado q se hacen con metodos directamente 
    posXf() {return this.posX + this.ancho},
    posYf() {return this.posY + this.alto},
    finX() {return this.posXf() == canvas1.width},
    finY() {return this.posYf() == canvas1.height},
    inicioX() {return this.posX == 0},
    inicioY() {return this.posY == 0},
    w() {if(!this.inicioY()) this.posY = minPos(0, this.posY, this.velocidad)},
    s() {if(!this.finY()) this.posY = maxPos(canvas1.height - this.alto, this.posY, this.velocidad)},
    a() {if(!this.inicioX()) this.posX = minPos(0, this.posX, this.velocidad)},
    d() {if(!this.finX()) this.posX = maxPos(canvas1.width - this.ancho, this.posX, this.velocidad)},
    //refactorizado con dos funciones q usan Math.min y max para poder usar cualquier velocidad sin pasarme del canvas
}

let moving = false; //flag para arrancar la animacion de rectPlayer o frenarla
let keyPressed = "" //variable para poder guardar el caracter de la key presionada en el evento y pasarla a rectPlayer con [] y usar la funcion de movimiento
let myReq;
let showCuadricula = false
let animacionCorriendo = false //flag para arrancar o terminar el loop draw inicia el false y cuando se cambia con el boton ejecuta draw() en switchLoop

const dibujarRectangulo = ({posX, posY, ancho, alto}) => {
    ctx1.fillRect(posX, posY, ancho, alto)
}

const dibujarRectangulos = () => {
      for(let rect of rects) {
        dibujarRectangulo(rect)
    }
}

//funcion para detectar la colision de recPlayer con el 2do rectangulo de rects
//se chequea que la posicion de los borde que chocarian sean igules menores o
//mayores segun corresponda
const detectarColision = (rect1, rect2) => {
    let topRect1 = rect1.posY
    let bottomRect1 = rect1.posYf()
    let leftRect1 = rect1.posX
    let rightRect1 = rect1.posXf()
    let topRect2 = rect2.posY
    let bottomRect2 = rect2.posYf()
    let leftRect2 = rect2.posX
    let rightRect2 = rect2.posXf()

    return (
        bottomRect1 >= topRect2 &&
        topRect1 <= bottomRect2 &&
        rightRect1 >= leftRect2 &&
        leftRect1 <= rightRect2
    ) 

}

const draw = () => {
    // let contadorFrames = "cantidad de frames en devtools"
    // console.log(contadorFrames)

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    ctx1.fillText(`X: ${rectPlayer.posX} - Y: ${rectPlayer.posY}`, 1, 8, 60)
    ctx1.fillText(`Xf: ${rectPlayer.posXf()} - Yf: ${rectPlayer.posYf()}`, 1, 18, 60)
    ctx1.fillText(`rect2X: ${rects[1].posX} - rect2Y: ${rects[1].posY}`, 70, 8, 120)
    ctx1.fillText(`rect2Xf: ${rects[1].posXf()} - rect2Yf: ${rects[1].posYf()}`, 70, 18, 120)
    
    dibujarRectangulo(rectPlayer)
    
    dibujarRectangulos()

    if(showCuadricula) {
        mostrarCuadricula()
    }

    if(moving) {
        rectPlayer[keyPressed]()
    }

    console.log(detectarColision(rectPlayer, rects[1]))

    //permite evitar el loop de draw para poder correrlo por fuera de requestAnimationFrame
    //y poder dibujar el 1 frame o dibujar el frame con la posicion cambiada de rectPlayer
    //cuando no esta corriendo la animacion
    if(animacionCorriendo) {
        myReq = window.requestAnimationFrame(draw)
    }
}

draw() //dibuja el primer frame con la posicion por defecto en el value de los input

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
    const keys = ['w', 'a', 's', 'd']
    if(keys.includes(e.key)) {
        keyPressed = e.key
        moving = true
    }
}
const frenar = (e) => {
    moving = false
}

//funciones para el evento de cambiar de posicion a rectPlayer
const changePosX = (e) => {
    rectPlayer.posX = parseFloat(e.target.value)
    if(!animacionCorriendo) draw()
}
const changePosY = (e) => {
    rectPlayer.posY = parseFloat(e.target.value)
    if(!animacionCorriendo) draw()
}

window.addEventListener('keydown', mover)
window.addEventListener('keyup', frenar)
switchAnimacionBtn.addEventListener('click', switchLoop)
mostrarCuadriculaBtn.addEventListener('click', switchCuadricula)

//permite cambiar la posicion inicial de rectPlayer en x e y con los inputs y dibujarla con
//draw() sin comenzar el loop, este solo inicia si le doy al boton comenzar animacion
inicioXInput.addEventListener('input', changePosX)
inicioYInput.addEventListener('input', changePosY)



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
//agregar inputs para dar una posicion inicial