import { Rectangulo } from "../entidades/escenario.js"
import { Player } from "../entidades/player.js"
import { playerProps, rectsProps } from "./parametros.js"

const crearRect = (props) => {
    return new Rectangulo(props)
}

export const rects = rectsProps.map(p => crearRect(p))
export const player = new Player(playerProps)