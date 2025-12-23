const colisionTop = (player, rect) => {
    let playerTop = player.posY
    let rectBottom = rect.posYf
    return playerTop == rectBottom 
}

const colisionBottom = (player, rect) => {
    let playerBottom = player.posYf
    let rectTop = rect.posY
    return playerBottom == rectTop
}

const colisionIzq = (player, rect) => {
    let playerIzq = player.posX
    let rectDer = rect.posXf
    return playerIzq == rectDer 
}

const colisionDer = (player, rect) => {
    let playerDer = player.posXf
    let rectIzq = rect.posX
    return playerDer == rectIzq
}

const estaEnRangoV = (player, rect) => {
    return player.posXf > rect.posX && player.posX < rect.posXf
}

const estaEnRangoH = (player, rect) => {
    return player.posYf > rect.posY && player.posY < rect.posYf
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

export {colisionW, colisionA, colisionS, colisionD}