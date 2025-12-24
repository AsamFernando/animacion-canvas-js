import { mostrarCuadricula, mostrarFPS, mostrarPosRect } from "../UI/index.js"
import "../UI/cambiarPosicion.js"
import { moverPlayer } from "../funcionalidad/index.js"
import { player, rects } from "../entidades/index.js"

const canvas1 = document.getElementById("canvas1")
const ctx1 = canvas1.getContext("2d")
const body = document.body
const switchAnimacionBtn = document.getElementById("switchAnimacionBtn")

let FPS = 0 //tiene q estar en este para poder actualizarlo y pasarlo a la funcion q los muestra
let myReq;//guardo el id del ultimo frame q se va a usar para cancelar la animacion pasandoselo a cancelAnimationFrame en terminarLoop

export let animacionCorriendo = false //flag para arrancar o terminar el loop draw inicia el false y cuando se cambia con el boton ejecuta draw() en switchLoop

const dibujarRectangulo = ({posX, posY, ancho, alto}) => {
    ctx1.fillRect(posX, posY, ancho, alto)
}

const dibujarRectangulos = () => {
      for(let rect of rects) {
        dibujarRectangulo(rect)
    }
}

//comentarios de draw() estan al final del archivo
export const draw = () => {
    FPS++

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    
    mostrarFPS({contexto:ctx1, FPS, x:599, y:8, ancho:50})
    mostrarPosRect({contexto:ctx1, rect:player, x:1, y:8, ancho:120})
    mostrarPosRect({contexto:ctx1, rect:rects[1], x:150, y:8, ancho:120})
    
    dibujarRectangulo(player)
    
    dibujarRectangulos()

    mostrarCuadricula(canvas1, ctx1)

    moverPlayer(player, rects[1], canvas1)
    
    if(animacionCorriendo) myReq = window.requestAnimationFrame(draw)
}

draw() //dibuja el primer frame con la posicion por defecto en el value de los input sin entrar en el loop debido a que el flag animacionCorriendo esta en false

//comienza el loop si el flag se puso en true al presionar el boton
const switchAnimacion = () => {
    if(animacionCorriendo) {
        draw()
    }
    else {
        window.cancelAnimationFrame(myReq)
    }
}

const switchLoop = (e) => {
    switchAnimacionBtn.innerText = animacionCorriendo ? 'comenzar animacion' : 'terminar animacion'
    animacionCorriendo = !animacionCorriendo
    switchAnimacion()
}

switchAnimacionBtn.addEventListener('click', switchLoop)

//CORRECCIONES
//--

//COMENTARIOS EN DRAW()
// const draw = () => {
    //     FPS++
//     //los get de player o de los rectangulos se utilizan sin ejecutar con () como si fueran propiedades no metodos
//     //hacer objetos con las propiedades q se van a mostrar y pasar como funcion creadora a archivo UI
//     ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    
//     mostrarFPS({contexto:ctx1, FPS, x:599, y:8, ancho:50})
//     mostrarPosRect({contexto:ctx1, rect:player, x:1, y:8, ancho:120})
//     mostrarPosRect({contexto:ctx1, rect:rects[1], x:150, y:8, ancho:120})
    
//     dibujarRectangulo(player)
    
//     dibujarRectangulos()

//     mostrarCuadricula(canvas1, ctx1)

//     moverPlayer(player, rects[1], canvas1)
//     //teniendo el estado en las keys verifico si es true uso la funcion move correspondiente pasandole el rectangulo q quiero mover
//     //el estado puede usarse para frenar el movimiento si hay colision, si cada tecla tiene el suyo propio se diferencia de moving
//     //q frenaria todos los movimientos, puediendo asi frenar un el movimiento q colisiona y poder usar otro q no esta colisionando
//     //para salir de la colision
//     //entonces el estado de cada tecla dependeria tambien de las colisiones y a cada una le corresponderia una colision en alguno de los
//     //sentidos
//     //por el momento no se necesita el state de las keys pero puede llegar a servir para separar responsabilidades
    
//     //probar colisiones descomentando de a uno
//     // if(keyPressed) console.log(keys[keyPressed].onColision(player, rects[1]))
    
    
//     if(animacionCorriendo) myReq = window.requestAnimationFrame(draw)
//     //permite evitar el loop de draw para poder correrlo por fuera de requestAnimationFrame
//     //y poder dibujar el 1 frame o dibujar el frame con la posicion cambiada de player
//     //cuando no esta corriendo la animacion
// }