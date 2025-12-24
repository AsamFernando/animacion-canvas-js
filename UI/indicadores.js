export const mostrarFPS = ({contexto, FPS, x, y, ancho}) => {
    contexto.fillText(`FPS: ${FPS}`, x, y, ancho)
}

export const mostrarPosRect = ({contexto, rect, x, y, ancho}) => {
    contexto.fillText(`${rect.id} - X: ${rect.posX} - Y: ${rect.posY}`, x, y, ancho)
    contexto.fillText(`${rect.id} - Xf: ${rect.posXf} - Yf: ${rect.posYf}`, x, y+10, ancho)
}