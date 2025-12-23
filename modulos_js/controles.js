import { colisionW, colisionA, colisionS, colisionD } from "./colisiones.js"
import {moves} from "./movimientos.js"

//las keys se guardan en keyPressed cuando sucede el evento keydown, luego se utiliza para
//traer de keys a draw las propiedades de la key presionada y ejecutar segun la condicion
//actual la funcion de movimiento move

const keys = {
    w:{key:'w', state:false, onColision:colisionW, move:moves.up},
    s:{key:'s', state:false, onColision:colisionS, move:moves.down},
    a:{key:'a', state:false, onColision:colisionA, move:moves.left},
    d:{key:'d', state:false, onColision:colisionD, move:moves.right},
}

export {keys}