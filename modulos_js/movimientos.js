const minPos = (inicio, posicion, velocidad) =>  {
    return Math.max(inicio, posicion - velocidad)
}
const maxPos = (final, posicion, velocidad) =>  {
    return Math.min(final, posicion + velocidad)
}

const moves = {
    up(player, canvas) {if(!player.inicioY) player.posY = minPos(0, player.posY, player.velocidad)},
    down(player, canvas) {if(!player.finY(canvas)) player.posY = maxPos(canvas.height - player.alto, player.posY, player.velocidad)}, 
    left(player, canvas) {if(!player.inicioX) player.posX = minPos(0, player.posX, player.velocidad)},
    right(player, canvas) {if(!player.finX(canvas)) player.posX = maxPos(canvas.width - player.ancho, player.posX, player.velocidad)}, 
}

export {moves}