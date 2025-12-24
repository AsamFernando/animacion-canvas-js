export class Rectangulo {
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

//COMENTARIOS
//Clase para crear los rectangulos del escenario
//el constructor recibe un objeto para poder pasar las props juntas y no tener q modificar
//la funcion de creacion en scriptCanvas si agrego mas propiedades

// posXf:this.posX + this.ancho,//no funciona el this.posX ni el this.posY ya que al calcular la suma todavia no esta creado el objeto literal player con sus propiedades y el this toma window en vez de posX o posY e intenta hacer window.posX o posY
// posYf:this.posY + this.alto, no funciona el this.posX ni el this.posY ya que al calcular la suma todavia no esta creado el objeto literal player con sus propiedades y el this toma window en vez de posX o posY e intenta hacer window.posX o posY
// se tiene q implementar como un getter, devolviendo la suma en una funcion
// si uso get posXf () {return this.posX + this.ancho} luego puedo llamarla con this.posXf sin parentesis
// lo ideal es usar get ya que esto es un valor calculado q deriva de las propiedades y no una accion, efecto o cambio de estado q se hacen con metodos directamente 
// posXf() {return this.posX + this.ancho},