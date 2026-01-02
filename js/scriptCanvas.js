import { mostrarCuadricula, mostrarFPS, mostrarPosRect } from "../UI/index.js"
import "../UI/cambiarPosicion.js"
import { moverPlayer } from "../funcionalidad/index.js"
import { player, rects } from "../entidades/index.js"
import { fixed_dt } from "./constantes.js"
import { step } from "./systems.js"

const canvas1 = document.getElementById("canvas1")
const ctx1 = canvas1.getContext("2d")
const switchAnimacionBtn = document.getElementById("switchAnimacionBtn")

let FPS = 0 //tiene q estar en este para poder actualizarlo y pasarlo a la funcion q los muestra
let myReq;//guardo el id del ultimo frame q se va a usar para cancelar la animacion pasandoselo a cancelAnimationFrame en terminarLoop

export let animacionCorriendo = false //flag para arrancar o terminar el loop draw inicia el false y cuando se cambia con el boton ejecuta draw() en switchLoop
let lastTime = 0;
let acc = 0


const dibujarRectangulo = ({posX, posY, ancho, alto}) => {
    ctx1.fillRect(posX, posY, ancho, alto)
}

const dibujarRectangulos = () => {
      for(let rect of rects) {
        dibujarRectangulo(rect)
    }
}

export const render = (frameTime) => {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height)
    mostrarFPS({contexto:ctx1, frameTime, x:599, y:8, ancho:50})
    mostrarPosRect({contexto:ctx1, rect:player, x:1, y:8, ancho:120})
    mostrarPosRect({contexto:ctx1, rect:rects[1], x:150, y:8, ancho:120})

    mostrarCuadricula(canvas1, ctx1)
    
    dibujarRectangulo(player)
    
    dibujarRectangulos()
}

//timestamp es un valor en ms que contiene el valor en ms desde el momento en que se carga el script
//en el navegador hasta que se produce un ciclo, teniendo uno diferente para los sucesivos ciclos.
//El valor proviene del reloj que posee el navegador.
//calcularDeltaTime calcula el tiempo entre cada frame
//el primero es cero ya que lasTime vale lo mismo que timestamp
//luego guardo timestamp en lastTime para el proximo ciclo
//en el nuevo ciclo la resta se produce entre lastTime del ciclo pasado y el nuevo timestamp
//asi obtengo la diferencia de tiempo que hay entre cada frame, ej: para 60 fps obtengo aprox. 16.67 ms que es igual a hacer 1000 ms / 60 fps
const calcularDeltaTime = (timestamp) => {
    if(!lastTime) lastTime = timestamp
    const deltaTime = timestamp - lastTime
    lastTime = timestamp
    return deltaTime
}

//update permite manejar las fluctuaciones de deltaTime.
//ya que no siempre la diferencia de tiempo entre frames es la misma y puede variar unos ms.
//Para esto utiliza un acumulador de tiempo y un ciclo while donde se controla cuando el acumulador
//tiene un valor mayor o igual a fixed_dt (constante fija de tiempo que recibe la funcion de movimiento
//para calcular la nueva posicion de player y que los pasos en que se da el movimiento sean siempre iguales),
//si esto ultimo ocurre se realiza el movimiento de player con la distancia en funcion de tiempo y velocidad,
//y se resta al acumulador el fixed_dt.
//esto provoca que solo se cambie la posicion cuando acc es mayor o igual a fixed_dt, de lo contrario se
//renderiza la misma posicion en que se encontraba, entonces se pueden tener tironcitos en la animacion
//ya que va a haber algunas veces que tengo cambio de posicion dos frames seguido y otras con un frame
//de por medio. Se debe implementar interpolacion para lograr mejor visualizacion de movimiento.
const update = (deltaTime) => {
    acc += deltaTime
    while(acc >= fixed_dt) {
        moverPlayer(canvas1)
        acc -= fixed_dt
    }
}


//comentarios de draw() estan al final del archivo
export const draw = (timestamp) => {
    FPS++

    let deltaTime = calcularDeltaTime(timestamp) //calculo intervalo de tiempo entre frames
    
    update(deltaTime) //separadas logica de cambios en valores de las figuras usados para dibujar en canvas

    render(deltaTime) //separada logica de que y como se dibuja en canvas
    
    if(animacionCorriendo) myReq = window.requestAnimationFrame(draw)
}

//dibuja el primer frame con la posicion por defecto en el value de los input sin entrar en el loop
//debido a que el flag animacionCorriendo esta en false.
//controlado con condicion si no se le pasa frameTime en la funcion mostrarFPS
render()

//comienza el loop si el flag se puso en true al presionar el boton
const switchAnimacion = () => {
    if(animacionCorriendo) {
        lastTime = 0
        myReq = window.requestAnimationFrame(draw)
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

/*
EXPLICACION DE DESPLAZAMIENTO EN FUNCION DEL TIEMPO
implementado desplazamiento dependiente del tiempo y no de la velocidad de frames,
modificada funcion switchAnimacion para que ejecute draw con requestAnimationFrame y pueda recibir timestamp,
ya que con draw() quedaba undefined en el primer loop, y se pone lastTime en cero para cuando pregunto
!lastTime poder asignarle timestamp de nuevo y asi siempre tener actualizado lastTime con el valor del frame
anterior al que uso en la resta para obtener el valor de ms por frame si no se hace esto, cuando paro la animacion
con switchLoop y la activo, si estoy manteniendo la tecla de desplazamiento se produce un salto en la posicion
de player porque recibe el valor de la resta entre un lastTime viejo y el timestap ultimo que es tanto tiempo
como estuvo frenada la animacion mas grande que este'
*/

//EJEMPLO DE FIXED_STEP
// let lastTime = 0;
// let accumulator = 0;

// const FIXED_DT = 16.67; // 60 Hz
// const MAX_FRAME = 100; // seguridad

// function loop(time) {
//   let frameTime = time - lastTime;
//   lastTime = time;

//   frameTime = Math.min(frameTime, MAX_FRAME);
//   accumulator += frameTime;

//   while (accumulator >= FIXED_DT) {
//     update(FIXED_DT);
//     accumulator -= FIXED_DT;
//   }

//   render();
//   requestAnimationFrame(loop);
// }