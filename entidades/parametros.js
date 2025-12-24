export const playerProps = {id:'player1', posX:inicioX, posY:inicioY, ancho:10, alto:10, velocidad:5}

export const rectsProps = [
    {id:'rect1', posX:0, posY:250, ancho:125, alto:50},
    {id:'rect2', posX:175, posY:225, ancho:125, alto:45},
    {id:'rect3', posX:350, posY:200, ancho:125, alto:25},
    {id:'rect4', posX:525, posY:175, ancho:125, alto:15}
]

//COMENTARIOS
/*
// const inicioXInput = document.getElementById("inicioX")
// const inicioYInput = document.getElementById("inicioY")

// const inicioX = parseFloat(inicioXInput.value)
// const inicioY = parseFloat(inicioYInput.value)

si incorporo esto y le paso inicioX e inicioY como posX y posY a playerProps tambien funciona
pero no conviene tener objetos del dom donde solo tengo q tener parametros.
los objetos del dom y sus valores conviene pasarlos directamente a las instancias como player en cambiarPosicion.js
para que no haya conflictos con instancias q aun no se crearon u objetos del dom q todavia no se cargaron.
*/