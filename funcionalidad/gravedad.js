import { fixed_dt, gravedad } from "../js/constantes.js"

let velocidadCaida = 0
export let posicionCaida = 0


//calculo la velocidad en base a la aceleracion de la gravedad y el tiempo
//entre frames pasado a segundos y voy acumulando
const calcularVelocidadCaida = () => {
    velocidadCaida += (fixed_dt/1000) * gravedad
}

//calculo la nueva posicion en base a la nueva velocidad tambien con el
//tiempo entre frames pasado a segundos y voy acumulando

export const calcularPosicionCaida = () => {
    calcularVelocidadCaida()
    posicionCaida += velocidadCaida * (fixed_dt/1000)
}

//CAMBIOS
//tengo q parar la cumulacion tanto de velocidad como posicion
//cuando se detiene la caida y quedarme con la posicion en que colisiono y velocidad en cero
//para que la gravedad pueda afectar a varios rectangulos cada uno tiene q tener las
//funciones de calculo y las constantes q acumulan velocidad y posicion
//ya q estas pueden resetearse en cualquier momento q haya una colision