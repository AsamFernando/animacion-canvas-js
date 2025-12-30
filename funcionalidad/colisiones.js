//chequea colision de lado superior de player con lado inferior de rectangulo
const colisionTop = (player, rect) => {
    let playerTop = player.posY
    let rectBottom = rect.posYf
    return playerTop < rectBottom 
}
//chequea colision de lado inferior de player con lado superior de rectangulo
const colisionBottom = (player, rect) => {
    let playerBottom = player.posYf
    let rectTop = rect.posY
    return playerBottom > rectTop
}
//chequea colision de lado izquierdo de player con lado derecho de rectangulo
const colisionIzq = (player, rect) => {
    let playerIzq = player.posX
    let rectDer = rect.posXf
    return playerIzq < rectDer 
}
//chequea colision de lado derecho de player con lado izquierdo de rectangulo
const colisionDer = (player, rect) => {
    let playerDer = player.posXf
    let rectIzq = rect.posX
    return playerDer > rectIzq
}

//chequea que la posicion x de player sea menor a xf de rectangulo
//y xf de player sea mayor a x de rectangulo controlando que el ingreso
//al rango sea desde el momento en que x y/o xf de player esta en el rango entre
//x - xf del rectangulo
//tambien chequea si esta en el rango vertical superior o inferior y asi poder
//diferenciar que cuando posY de player es menor a posY de rect se sepa si la parte superior de player
//esta por encima de la parte superior de rect
//lo mismo para la parte inferior y los laterales

const estaEnRangoVS = (player, rect) => {
    return player.posXf > rect.posX && player.posX < rect.posXf && player.posY < rect.posY
}

//es igual a hacer colisionDer && colisionIzq, ver lo mismo para los demas rangos
const estaEnRangoVI = (player, rect) => {
    // return colisionDer(player, rect) && colisionIzq(player, rect) && player.posYf > rect.posYf
    return player.posXf > rect.posX && player.posX < rect.posXf && player.posYf > rect.posYf
}

//el mismo chequeo se realiza para y yf de player teniendo en cuenta el rango
//y-yf del rectangulo
const estaEnRangoHI = (player, rect) => {
    return player.posYf > rect.posY && player.posY < rect.posYf && player.posX < rect.posX
}
const estaEnRangoHD = (player, rect) => {
    return player.posYf > rect.posY && player.posY < rect.posYf && player.posXf > rect.posXf
}

//junto la condicion de rango y de colision para frenar el dibujado en draw de player
//podria usarse para solo cambiar el estado y q dependeria de si fue presionada la key y de la colision
//y el dibujado solo dependeria del estado de la key presionada
export const colisionW = (player, rect) => {
    return colisionTop(player, rect) && estaEnRangoVI(player, rect)
}
export const colisionS = (player, rect) => {
    return colisionBottom(player, rect) && estaEnRangoVS(player, rect)
}
export const colisionA = (player, rect) => {
    return colisionIzq(player, rect) && estaEnRangoHD(player, rect)
}
export const colisionD = (player, rect) => {
    return colisionDer(player, rect) && estaEnRangoHI(player, rect)
}

//CORRECCIONES
/*
reducir las funciones colisionLetra a una sola y ver si poner en cada key su funcion de colision por ej:
colisionTop iria en key w, lo cual se limitaria solo a rectangulos
*/

//CAMBIOS
/*
para frenar el dibujado de player podria usarse para cambiar el estado q dependeria
de un flag q indique si fue presionada la key y de la colision y el dibujado
solo del estado de la key presionada
*/

//COMENTARIOS
/*
!!!Aclaracion 1
en las colisiones tambien hay q tener en cuenta que los anchos y altos de los rects sean multiplos de la velocidad
para poder tener true si estan en la misma posicion los dados que colisionan y tambien por los rangos V y H
!!!Aclaracion 2
//los get de player o de los rectangulos se utilizan sin ejecutar con ()

//descomentar de a uno para loguear las colisiones segun key
// console.log(colisionW(player, rects[1]))
// console.log(colisionA(player, rects[1]))
// console.log(colisionS(player, rects[1]))
// console.log(colisioD(player, rects[1]))

*/