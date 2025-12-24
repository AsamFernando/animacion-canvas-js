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