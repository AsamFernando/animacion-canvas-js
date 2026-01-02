import { player, rects } from "../entidades/crearEntidades.js"
import { nextStep, step } from "../js/systems.js"
import { estaEnRangoVS, estaEnRangoVI, estaEnRangoHD, estaEnRangoHI} from "../funcionalidad/colisiones.js"

const minPos = (inicio, posicion, step) =>  {
    return Math.max(inicio, posicion - step)
}
const maxPos = (final, posicion, step) =>  {
    return Math.min(final, posicion + step)
}

//separadas funciones de movimiento con control para no pasarse del canvas
//los get de player o de los rectangulos se utilizan sin ejecutar con ()

//Ejecutar draw solo se oprime una tecla de desplazamiento para siempre obtener el timelapse desde cero 
// export const moves = {
//     up(player, rects, canvas) {if(!player.inicioY) player.posY += nextStep(colisionNexStepW, player.posY, rects[1].posYf)},
//     down(player, rects, canvas) {if(!player.finY(canvas)) player.posY += nextStep(colisionNexStepS, player.posYf, rects[1].posY)}, 
//     left(player, rects, canvas) {if(!player.inicioX) player.posX += nextStep(colisionNexStepA, player.posX, rects[1].posXf)},
//     right(player, rects, canvas) {if(!player.finX(canvas)) player.posX += nextStep(colisionNexStepD, player.posXf, rects[1].posX)}, 
// }
export const moves = {
    up(canvas) {if(!player.inicioY) player.posY -= minPos(0, !estaEnRangoVI(player, rects[1]) ? step : nextStep(player.posY, rects[1].posYf))},
    down(canvas) {if(!player.finY(canvas)) player.posY += maxPos(canvas.height - player.posYf, !estaEnRangoVS(player, rects[1]) ? step : nextStep(player.posYf, rects[1].posY))}, 
    left(canvas) {if(!player.inicioX) player.posX -= minPos(0, !estaEnRangoHD(player, rects[1]) ? step : nextStep(player.posX, rects[1].posXf))},
    right(canvas) {if(!player.finX(canvas)) player.posX += maxPos(0, !estaEnRangoHI(player, rects[1]) ? step : nextStep(player.posXf, rects[1].posX))},
}

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