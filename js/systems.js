import { fixed_dt } from "./constantes.js"
import { player } from "../entidades/crearEntidades.js"

export let step = Math.floor((player.velocidad / 1000) * fixed_dt)

const minPos = (inicio, posicion, step) =>  {
    return Math.max(inicio, posicion - step)
}
const maxPos = (final, posicion, step) =>  {
    return Math.min(final, posicion + step)
}

export let nextStep = (posPlayer, posRect) => {
    let nextPos = Math.abs(posRect - posPlayer)
    // console.log(nextPos)
    // console.log(Math.min(step, nextPos))
    return Math.min(step, nextPos)
}
