import Rectangulo from "./escenario.js";

class Player extends Rectangulo {
    constructor({id, posX, posY, ancho, alto, velocidad}) {
        super({id, posX, posY, ancho, alto})
        this.velocidad = velocidad;
    }
}

export default Player;

//COMENTARIOS
//Clase para crear el rectangulo player q agrega la velocidad
//recibe un objeto con las propiedades del player q agrega velocidad
//super tiene q recibir los atributos q se le pasan a Rectangulo heredando propiedades y metodos
//y las props a parte de estas, se asignan a los this