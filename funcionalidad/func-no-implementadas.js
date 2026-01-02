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

// chequea colision de lado superior de player con lado inferior de rectangulo
// const colisionNextStepTop = (player, rect) => {
//     let playerTop = player.posY - step
//     let rectBottom = rect.posYf
//     return playerTop < rectBottom 
// }
// //chequea colision de lado inferior de player con lado superior de rectangulo
// const colisionNextStepBottom = (player, rect) => {
//     let playerBottom = player.posYf + step
//     let rectTop = rect.posY
//     return playerBottom > rectTop
// }
// //chequea colision de lado izquierdo de player con lado derecho de rectangulo
// const colisionNextStepIzq = (player, rect) => {
//     let playerIzq = player.posX - step
//     let rectDer = rect.posXf
//     return playerIzq < rectDer 
// }
// //chequea colision de lado derecho de player con lado izquierdo de rectangulo
// const colisionNextStepDer = (player, rect) => {
//     let playerDer = player.posXf + step
//     let rectIzq = rect.posX
//     return playerDer > rectIzq
// }

//chequea si hay colision en el proximo step
// export const colisionNexStepW = (player, rect) => {
//     return colisionNextStepTop(player, rect) && estaEnRangoVI(player, rect)
// }
// export const colisionNexStepS = (player, rect) => {
//     return colisionNextStepBottom(player, rect) && estaEnRangoVS(player, rect)
// }
// export const colisionNexStepA = (player, rect) => {
//     return colisionNextStepIzq(player, rect) && estaEnRangoHD(player, rect)
// }
// export const colisionNexStepD = (player, rect) => {
//     return colisionNextStepDer(player, rect) && estaEnRangoHI(player, rect)
// }