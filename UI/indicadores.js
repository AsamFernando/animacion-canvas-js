export const mostrarFPS = ({contexto, frameTime, x, y, ancho}) => {
    let FPS = frameTime ? Math.ceil(1000/frameTime) : 0 //fix para cuando frametime es cero null o undefined, siempre en el primer frame cuando se corre la animacion, no divida 1000/0 y muestre infinity
    contexto.fillText(`FPS: ${FPS}`, x, y, ancho)
}

//agregado .toFixed(2) para q muestre solo 2 decimales del calculo entre step y la posicion de player
//ya que a este le saque el redondeo con Math.Floor porque no convertia en cero el step menor a 1
export const mostrarPosRect = ({contexto, rect, x, y, ancho}) => {
    contexto.fillText(`${rect.id} - X: ${rect.posX.toFixed(2)} - Y: ${rect.posY.toFixed(2)}`, x, y, ancho)
    contexto.fillText(`${rect.id} - Xf: ${rect.posXf.toFixed(2)} - Yf: ${rect.posYf.toFixed(2)}`, x, y+10, ancho)
}