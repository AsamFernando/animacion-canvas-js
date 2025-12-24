const mostrarCuadriculaBtn = document.getElementById("mostrarCuadriculaBtn")
let showCuadricula = false // flag para mostrar u ocultar la cuadricula con el boton, no fuciona si la animacion no esta corriendo

const flipSiNoX = (distX, prop1, prop2) => {
    return distX ? {p1:prop1, p2:prop2} : {p1:prop2, p2:prop1}
}

const dibujarCuadricula = (distX, distY, canvas, contexto) => {
    let distanciaCuad = distX || distY
    let distCanvas = flipSiNoX(distX, canvas.width, canvas.height)

    for (let pos = distanciaCuad; pos < distCanvas.p1; pos += distanciaCuad) {
        let moveToProps = flipSiNoX(distX, pos, 0)
        let lineToProps = flipSiNoX(distX, pos, distCanvas.p2)
        contexto.moveTo(moveToProps.p1, moveToProps.p2);
        contexto.lineTo(lineToProps.p1, lineToProps.p2);
    }
}

export const mostrarCuadricula = (canvas, contexto) => {
    if(showCuadricula) {
        contexto.beginPath();

        dibujarCuadricula(12.5, 0, canvas, contexto)
        dibujarCuadricula(0, 12.5, canvas, contexto)

        contexto.strokeStyle = "grey";
        contexto.stroke();
    }
}

const switchCuadricula = (e) => {
    mostrarCuadriculaBtn.innerText = showCuadricula ? 'mostrar cuadricula' : 'ocultar cuadricula'
    showCuadricula = !showCuadricula
}

mostrarCuadriculaBtn.addEventListener('click', switchCuadricula)

//CAMBIOS
//refactorizar los for en mostrarCuadricula -> hecho
//refactorizar dibujar cuadricula para q pueda aceptar valores mayores a cero en distX y distY y se ejecute solo una vez en mostrarCuadricula

//COMENTARIOS
/* 
La funcion mostrarCuadricula toma el contexto creado en el scritp ppal. y dibuja lineas horizontales
y verticales paralelas de color gris que se muestran u ocultan con el boton mostrar/ocultar cuadricula
Se ejecuta en la funcion draw() que realiza el loop de dibujado cuando el flag showCuadricula controlado
por el boton es true.
No muestra la cuadricula si la animacion esta terminada, solo cuando esta corriendo.

//el if q permitia dibujar la cuadricula en draw se pone dentro de mostrarCuadricula asi el flag controla si se ejecuta el codigo dentro
//cuando ocurre el evento del boton


la funcion flipSiNoX usada dentro del for sirve para dar vuelta los argumentos de las funciones moveTo y lineTo
devolviendo un objeto donde se intercambian los values segun si la posicion x es cero o no.
A su vez se utiliza antes de for por fuera para obtener un objeto con los values de ancho y alto de canvas en un orden u otro segun la misma condicion
y la 1er propiedad del resultado se utiliza como argumento del for mientras q la 2da sirve como argumento de si misma al calcular el orden de los 
parametros de lineTo.

!!!Aclaracion
a pesar del refactor de mostrarCuadricula, resulta mas legible implementado con 2 for. Convendria usar array al devolver con flipSiNoX en vez de objetos
Tambien podria implementarse con un for y una varible q diga si es vertical o no y ahi decidir como se pasan los argumentos de moveTo y lineTo y
tambien pasar al for los argumentos necesarios segun esta.

*/
