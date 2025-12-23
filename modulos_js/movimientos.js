//funciones q usan Math.min y max para poder usar cualquier velocidad sin pasarme del canvas
const minPos = (inicio, posicion, velocidad) =>  {
    return Math.max(inicio, posicion - velocidad)
}
const maxPos = (final, posicion, velocidad) =>  {
    return Math.min(final, posicion + velocidad)
}

//separadas funciones de movimiento con control para no pasarse del canvas
//los get de player o de los rectangulos se utilizan sin ejecutar con ()
const moves = {
    up(player, canvas) {if(!player.inicioY) player.posY = minPos(0, player.posY, player.velocidad)},
    down(player, canvas) {if(!player.finY(canvas)) player.posY = maxPos(canvas.height - player.alto, player.posY, player.velocidad)}, 
    left(player, canvas) {if(!player.inicioX) player.posX = minPos(0, player.posX, player.velocidad)},
    right(player, canvas) {if(!player.finX(canvas)) player.posX = maxPos(canvas.width - player.ancho, player.posX, player.velocidad)}, 
}

export {moves}

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