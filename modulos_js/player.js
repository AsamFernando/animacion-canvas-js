import Rectangulo from "./escenario.js";

class Player extends Rectangulo {
    constructor({id, posX, posY, ancho, alto, velocidad}) {
        super({id, posX, posY, ancho, alto})
        this.velocidad = velocidad;
    }
}

export default Player;