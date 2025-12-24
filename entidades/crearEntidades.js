import { Rectangulo } from "../entidades/escenario.js"
import { Player } from "../entidades/player.js"
import { playerProps, rectsProps } from "./parametros.js"

const crearRect = (props) => {
    return new Rectangulo(props)
}

const crearRects = () => rectsProps.map(p => crearRect(p))
const crearPlayer = () => new Player(playerProps)

export const player = crearPlayer()
export const rects = crearRects()