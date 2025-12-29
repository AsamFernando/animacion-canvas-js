export const mostrarFPS = ({contexto, frameTime, x, y, ancho}) => {
    let FPS = frameTime ? Math.ceil(1000/frameTime) : 0 //fix para cuando frametime es cero null o undefined, siempre en el primer frame cuando se corre la animacion, no divida 1000/0 y muestre infinity
    contexto.fillText(`FPS: ${FPS}`, x, y, ancho)
}

export const mostrarPosRect = ({contexto, rect, x, y, ancho}) => {
    contexto.fillText(`${rect.id} - X: ${rect.posX} - Y: ${rect.posY}`, x, y, ancho)
    contexto.fillText(`${rect.id} - Xf: ${rect.posXf} - Yf: ${rect.posYf}`, x, y+10, ancho)
}