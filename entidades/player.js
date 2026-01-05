import { Rectangulo } from "./escenario.js";

export class Player extends Rectangulo {
    constructor({id, posX, posY, ancho, alto, velocidad, gravedadOn}) {
        super({id, posX, posY, ancho, alto})
        this.velocidad = velocidad;
        this.gravedadOn = gravedadOn;
    }

    caer(posicionCaida) {
        if(this.gravedadOn) {
            this.posY = posicionCaida
        }
    }
    //no usar el flag para detener caida por colision con objeto o fin de canvas
    //asignar posicion de colision en vez
    detenerCaida() {
        this.gravedadOn = false
    }
}

//COMENTARIOS
//Clase para crear el rectangulo player q agrega la velocidad
//recibe un objeto con las propiedades del player q agrega velocidad
//super tiene q recibir los atributos q se le pasan a Rectangulo heredando propiedades y metodos
//y las props a parte de estas, se asignan a los this