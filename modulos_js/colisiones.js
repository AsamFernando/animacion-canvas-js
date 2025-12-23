//chequea colision de lado superior de player con lado inferior de rectangulo
const colisionTop = (player, rect) => {
    let playerTop = player.posY
    let rectBottom = rect.posYf
    return playerTop == rectBottom 
}
//chequea colision de lado inferior de player con lado superior de rectangulo
const colisionBottom = (player, rect) => {
    let playerBottom = player.posYf
    let rectTop = rect.posY
    return playerBottom == rectTop
}
//chequea colision de lado izquierdo de player con lado derecho de rectangulo
const colisionIzq = (player, rect) => {
    let playerIzq = player.posX
    let rectDer = rect.posXf
    return playerIzq == rectDer 
}
//chequea colision de lado derecho de player con lado izquierdo de rectangulo
const colisionDer = (player, rect) => {
    let playerDer = player.posXf
    let rectIzq = rect.posX
    return playerDer == rectIzq
}

//chequea que la posicion x de player sea menor a xf de rectangulo
//y xf de player sea mayor a x de rectangulo controlando que el ingreso
//al rango sea desde el momento en que x y/o xf de player esta en el rango entre
//x - xf del rectangulo
const estaEnRangoV = (player, rect) => {
    return player.posXf > rect.posX && player.posX < rect.posXf
}

//el mismo chequeo se realiza para y yf de player teniendo en cuenta el rango
//y-yf del rectangulo
const estaEnRangoH = (player, rect) => {
    return player.posYf > rect.posY && player.posY < rect.posYf
}

//junto la condicion de rango y de colision para frenar el dibujado en draw de player
//podria usarse para solo cambiar el estado y q dependeria de si fue presionada la key y de la colision
//y el dibujado solo dependeria del estado de la key presionada
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

export {colisionW, colisionA, colisionS, colisionD}

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