import mostrarCuadricula from "../modulos_js/cuadricula.js"

const canvas1 = document.getElementById("canvas1")
const ctx1 = canvas1.getContext("2d")
const body = document.body
const switchAnimacionBtn = document.getElementById("switchAnimacionBtn")
const mostrarCuadriculaBtn = document.getElementById("mostrarCuadriculaBtn")
const inicioXInput = document.getElementById("inicioX")
const inicioYInput = document.getElementById("inicioY")
const inicioX = parseFloat(inicioXInput.value)
const inicioY = parseFloat(inicioYInput.value)

//hacer una clase rectagulo o forma que reciba la cantidad de rects o huecos y cree
//calculando los valores de ancho alto y tamaño en base a las cantidades y los ubique de manera
//equivalente en el canvas
//por el momento los rectangulos son multiplos de 5 para acertar colisiones por posicion de x e y

const rects = [
    {id:1, posX:0, posY:250, ancho:125, alto:50},
    {
        id:2,
        posX:175,
        posY:225,
        ancho:125,
        alto:45,
        posXf() {return this.posX + this.ancho},
        posYf() {return this.posY + this.alto},
    },
    {id:3, posX:350, posY:200, ancho:125, alto:25},
    {id:4, posX:525, posY:175, ancho:125, alto:15}
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

//funciones q usan Math.min y max para poder usar cualquier velocidad sin pasarme del canvas
const minPos = (inicio, posicion, velocidad) =>  {
    return Math.max(inicio, posicion - velocidad)
}
const maxPos = (final, posicion, velocidad) =>  {
    return Math.min(final, posicion + velocidad)
}

//separadas funciones de movimiento con control para no pasarse del canvas
const moves = {
    up(player) {if(!player.inicioY()) player.posY = minPos(0, player.posY, player.velocidad)},
    down(player) {if(!player.finY()) player.posY = maxPos(canvas1.height - player.alto, player.posY, player.velocidad)}, 
    left(player) {if(!player.inicioX()) player.posX = minPos(0, player.posX, player.velocidad)},
    right(player) {if(!player.finX()) player.posX = maxPos(canvas1.width - player.ancho, player.posX, player.velocidad)}, 
}

const estaEnRangoV = (player, rect) => {
    return (
        player.posXf() > rect.posX && player.posX < rect.posXf()
    )
}
const estaEnRangoH = (player, rect) => {
    return (
        player.posYf() > rect.posY && player.posY < rect.posYf()
    )
}

//!!!Aclaracion
//en las colisiones tambien hay q tener en cuenta que los anchos y altos de los rects sean multiplos de la velocidad
//para poder tener true si estan en la misma posicion los dados que colisionan y tambien por los rangos V y H

//chequea colision de lado superior de player con lado inferior de rectangulo
const colisionTop = (player, rect) => {
    let playerTop = player.posY
    let rectBottom = rect.posYf()
    return playerTop == rectBottom 
}
//chequea colision de lado inferior de player con lado superior de rectangulo
const colisionBottom = (player, rect) => {
    let playerBottom = player.posYf()
    let rectTop = rect.posY
    return playerBottom == rectTop
}
//chequea colision de lado izquierdo de player con lado derecho de rectangulo
const colisionIzq = (player, rect) => {
    let playerIzq = player.posX
    let rectDer = rect.posXf()
    return playerIzq == rectDer 
}
//chequea colision de lado derecho de player con lado izquierdo de rectangulo
const colisionDer = (player, rect) => {
    let playerDer = player.posXf()
    let rectIzq = rect.posX
    return playerDer == rectIzq
}

const colisionW = (player, rect) => {
    return colisionTop(player, rect) && estaEnRangoV(player, rect)
}
const colisionS = (player, rect) => {
    return colisionBottom(player, rect) && estaEnRangoV(player, rect)
}
const colisionA = (player, rect) => {
    return colisionIzq(player, rect) && estaEnRangoH(player, rect)
}
const colisionD = (player, rect) => {
    return colisionDer(player, rect) && estaEnRangoH(player, rect)
}
const colisionMock = (player, rect) => {
    return false
}

//separadas keys en un objeto a parte con estado para frenar el movimiento cuando se colisiona y la funcion de movimiento
const keys = {
    w:{key:'w', state:false, onColision:colisionW, move:moves.up},
    s:{key:'s', state:false, onColision:colisionS, move:moves.down},
    a:{key:'a', state:false, onColision:colisionA, move:moves.left},
    d:{key:'d', state:false, onColision:colisionD, move:moves.right},
}


const rectPlayer = {
    id:5,
    posX:inicioX,
    posY:inicioY,
    ancho:15,
    alto:25,
    velocidad:5,
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
}

let keyPressed = "w" //variable para poder guardar el caracter de la key presionada en el evento y pasarla a rectPlayer con [] y usar la funcion de movimiento
let myReq;//guardo el id del ultimo frame q se va a usar para cancelar la animacion pasandoselo a cancelAnimationFrame en terminarLoop
let showCuadricula = false // flag para mostrar u ocultar la cuadricula con el boton, no fuciona si la animacion no esta corriendo
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
const detectarColision = (player, rect) => {
    let playerTop = player.posY
    let playerBottom = player.posYf()
    let playerIzq = player.posX
    let playerDer = player.posXf()
    let rectTop = rect.posY
    let rectBottom = rect.posYf()
    let rectIzq = rect.posX
    let rectDer = rect.posXf()
    
    return (
        playerBottom >= rectTop &&
        playerTop <= rectBottom &&
        playerDer >= rectIzq &&
        playerIzq <= rectDer
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
        mostrarCuadricula(ctx1)
    }
    //teniendo el estado en las keys verifico si es true uso la funcion move correspondiente pasandole el rectangulo q quiero mover
    //el estado puede usarse para frenar el movimiento si hay colision, si cada tecla tiene el suyo propio se diferencia de moving
    //q frenaria todos los movimientos, puediendo asi frenar un el movimiento q colisiona y poder usar otro q no esta colisionando
    //para salir de la colision
    //entonces el estado de cada tecla dependeria tambien de las colisiones y a cada una le corresponderia una colision en alguno de los
    //sentidos
    //por el momento no se necesita el state de las keys pero puede llegar a servir para separar responsabilidades
    if(keys[keyPressed].state && !keys[keyPressed].onColision(rectPlayer, rects[1])) {
        keys[keyPressed].move(rectPlayer)
    } 
    
    //probar colisiones descomentando de a uno
    // if(keyPressed) console.log(keys[keyPressed].onColision(rectPlayer, rects[1]))
    // console.log(colisionW(rectPlayer, rects[1]))
    // console.log(colisionA(rectPlayer, rects[1]))
    // console.log(colisionS(rectPlayer, rects[1]))
    // console.log(colisioD(rectPlayer, rects[1]))

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

//uso directamente el objeto keys para ver si la letra presionada es wasd y si es guardo el caracter en keyPressed, cambio el estado
//de la letra en keys a true y seteo moving en true
const mover = (e) => {
    if(keys[e.key]) {
        keyPressed = e.key
        keys[e.key].state = true
    }
}

//cuando suelto la tecla verifico que sea de una de las keys y cambio el estado de la misma a false junto con moving
const frenar = (e) => {
    if(keys[e.key]) {
        keys[e.key].state = false
    }
        
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

//COMPLETADOS
//incorporar colisiones con otros rectangulo -> hecho
//agregar inputs para dar una posicion inicial -> hecho
//BUG: al colisionar las aristas de rectPlayer con el rectangulo no permite avanzar hacia el rectangulo desde ninguno de los
//4 lados -> solucionado