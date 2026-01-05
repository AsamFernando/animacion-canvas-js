import { player, rects, rectCaida } from "../entidades/crearEntidades.js"
import { estaEnRangoVS, estaEnRangoVI, estaEnRangoHD, estaEnRangoHI} from "../funcionalidad/colisiones.js"
import { calcularPosicionCaida, posicionCaida } from "./gravedad.js"
import { nextStep } from "./step.js"

const minPos = (inicio, posicion, step) =>  {
    return Math.max(inicio, posicion - step)
}
const maxPos = (final, posicion, step) =>  {
    return Math.min(final, posicion + step)
}

//separadas funciones de movimiento con control para no pasarse del canvas
//los get de player o de los rectangulos se utilizan sin ejecutar con ()

//Ejecutar draw solo se oprime una tecla de desplazamiento para siempre obtener el timelapse desde cero 
export const moves = {
    up(canvas) {if(!player.inicioY) player.posY = minPos(0, player.posY, nextStep(estaEnRangoVI, player.posY, rects[1].posYf))},
    down(canvas) {if(!player.finY(canvas)) player.posY = maxPos(canvas.height - player.alto, player.posY, nextStep(estaEnRangoVS, player.posYf, rects[1].posY))}, 
    left(canvas) {if(!player.inicioX) player.posX = minPos(0, player.posX, nextStep(estaEnRangoHD, player.posX, rects[1].posXf))},
    right(canvas) {if(!player.finX(canvas)) player.posX = maxPos(canvas.width - player.ancho, player.posX, nextStep(estaEnRangoHI, player.posXf, rects[1].posX))},
}

//funcion para usar en update en scripCanvas que detiene la caida cuando se pasa del alto del canvas
//corregirla para terminar de caer en la misma posicion del alto de canvas
//controlar que el ultimo posicionCaida antes de colisionar se la cantidad q falta antes de la colision
export const aplicarGravedad = (canvas) => {
    calcularPosicionCaida()
    console.log(posicionCaida)
    if(!(rectCaida.posYf > canvas.height)) {
        rectCaida.caer(posicionCaida)
    }
    else {
        rectCaida.detenerCaida()//aca deberia quedarme con la posicion de la colision y la velocidad en cero
    }
}

//usar algo similar sin teclas o con una condicion para cada sentido para poder 
//aplicar movimiento acelerado en las cuatro direcciones y no solo en caida

// export const acelerar = {
//     up(canvas) {if(!rectCaida.inicioY) rectCaida.posY = minPos(0, rectCaida.posY, nextStep(estaEnRangoVI, rectCaida.posY, rects[1].posYf))},
//     down(canvas) {if(!rectCaida.finY(canvas)) rectCaida.posY = maxPos(canvas.height - rectCaida.alto, rectCaida.posY, nextStep(estaEnRangoVS, rectCaida.posYf, rects[1].posY))}, 
//     left(canvas) {if(!rectCaida.inicioX) rectCaida.posX = minPos(0, rectCaida.posX, nextStep(estaEnRangoHD, rectCaida.posX, rects[1].posXf))},
//     right(canvas) {if(!rectCaida.finX(canvas)) rectCaida.posX = maxPos(canvas.width - rectCaida.ancho, rectCaida.posX, nextStep(estaEnRangoHI, rectCaida.posXf, rects[1].posX))},
// }
//COMENTARIOS
/*
tener en cuenta la velocidad, el ancho y alto del rectangulo ya que la suma de ambos podria no dar
un valor igual a la resta entre el ancho o el alto del rectangulo y el canvas por ej:
rectangulo
velocidad = 10 ancho = 15 y alto = 25 
canvas
ancho = 600 alto = 300
la suma posX del rectangulo mas velocidad: 580 + 10 = 590 se pasa de la resta entre el ancho del
canvas y el ancho del rectangulo: 600 - 15 = 585 por lo que las funciones de fin en x e y
nunca van a dar false ya que posX nunca toma el valor 585
por lo tanto el rectangulo se sale del canvas hacia abajo y la derecha
lo mismo ocurre si pongo la velocidad en 3 y me paro el x = 20 e y = 20 voy a tener numeros negativos
al restar y me paso del inicio q es 0 0
*/