import { fixed_dt } from "./constantes.js"
import { player } from "../entidades/crearEntidades.js"

export let step = Math.floor((player.velocidad / 1000) * fixed_dt)

export let nextStep = (posPlayer, posRect) => {
    let nextPos = Math.abs(posRect - posPlayer)
    return Math.min(step, nextPos)
}
