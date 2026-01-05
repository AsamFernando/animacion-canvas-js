import { player, rects } from "../entidades/crearEntidades.js"
import { fixed_dt } from "../js/constantes.js"

//quitado Math.floor ya que redondeaba a cero el step menor a uno y no permitia velocidades por ej 100 o 50 etc.
export let step = (player.velocidad / 1000) * fixed_dt

export let nextStep = (estaEnRango, posPlayer, posRect) => {
    let nextPos = Math.abs(posRect - posPlayer)
    // console.log(step)
    return estaEnRango(player, rects[1]) ? Math.min(step, nextPos) : step
}