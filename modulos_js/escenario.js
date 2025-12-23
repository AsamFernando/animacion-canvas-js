class Rectangulo {
    constructor ({id, posX, posY, ancho, alto}) {
        this.id = id;
        this.posX = posX;
        this.posY = posY;
        this.ancho = ancho;
        this.alto = alto;
    }

    get posXf() {
        return this.posX + this.ancho
    }

    get posYf() {
        return this.posY + this.alto
    }

    get inicioX() {
        return this.posX == 0
    }

    get inicioY() {
        return this.posY == 0
    }

    finX(canvas) {
        return this.posXf == canvas.width
    }

    finY(canvas) {
        return this.posYf == canvas.height
    }
}

export default Rectangulo;