import { colisionW, colisionA, colisionS, colisionD } from "./colisiones.js"
import {moves} from "./movimientos.js"

const keys = {
    w:{key:'w', state:false, onColision:colisionW, move:moves.up},
    s:{key:'s', state:false, onColision:colisionS, move:moves.down},
    a:{key:'a', state:false, onColision:colisionA, move:moves.left},
    d:{key:'d', state:false, onColision:colisionD, move:moves.right},
}

export {keys}