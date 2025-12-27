import { rects } from "../entidades/crearEntidades.js"
import { colisionW, colisionA, colisionS, colisionD } from "./colisiones.js"
import { moves } from "./movimientos.js"

//las keys se guardan en keyPressed cuando sucede el evento keydown, luego se utiliza para
//traer de keys a draw las propiedades de la key presionada y ejecutar segun la condicion
//actual la funcion de movimiento move
let keyPressed = "w" //variable para poder guardar el caracter de la key presionada en el evento y pasarla a player con [] y usar la funcion de movimiento

const keys = {
    w:{key:'w', state:false, onColision:colisionW, move:moves.up},
    s:{key:'s', state:false, onColision:colisionS, move:moves.down},
    a:{key:'a', state:false, onColision:colisionA, move:moves.left},
    d:{key:'d', state:false, onColision:colisionD, move:moves.right},
}

//uso directamente el objeto keys para ver si la letra presionada es wasd y si es guardo el caracter en keyPressed, cambio el estado
//de la letra en keys a true y seteo moving en true
const mover = (e) => {
    if(keys[e.key]) {
        keyPressed = e.key
        keys[e.key].state = true
    }
}

//cuando suelto la tecla verifico que sea de una de las keys y cambio el estado de la misma a false junto con moving
const frenar = (e) => {
    if(keys[e.key]) {
        keys[e.key].state = false
    }
        
}

//teniendo el estado en las keys verifico si es true uso la funcion move correspondiente pasandole el rectangulo q quiero mover
    //el estado puede usarse para frenar el movimiento si hay colision, si cada tecla tiene el suyo propio se diferencia de moving
    //q frenaria todos los movimientos, puediendo asi frenar un el movimiento q colisiona y poder usar otro q no esta colisionando
    //para salir de la colision
    //entonces el estado de cada tecla dependeria tambien de las colisiones y a cada una le corresponderia una colision en alguno de los
    //sentidos
    //por el momento no se necesita el state de las keys pero puede llegar a servir para separar responsabilidades
    
    //probar colisiones descomentando de a uno
    // if(keyPressed) console.log(keys[keyPressed].onColision(player, rects[1]))

export const moverPlayer = (player, step, canvas) => {
    if(keys[keyPressed].state && !keys[keyPressed].onColision(player, rects[1])) {
        keys[keyPressed].move(player, step, canvas)
    }
}

window.addEventListener('keydown', mover)
window.addEventListener('keyup', frenar)