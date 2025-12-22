const mostrarCuadricula = (contexto) => {
    contexto.beginPath();
    
    const cuadY = 12.5
    const cuadX = 12.5
    
    for (let yPos = cuadY; yPos < canvas1.height; yPos += cuadY) {
        contexto.moveTo(0, yPos);
        contexto.lineTo(canvas1.width, yPos);
    }
    for (let xPos = cuadX; xPos < canvas1.width; xPos += cuadX) {
        contexto.moveTo(xPos, 0);
        contexto.lineTo(xPos, canvas1.height);
    }
    contexto.strokeStyle = "grey";
    contexto.stroke();
}

export default mostrarCuadricula

//COMENTARIOS
/* 
La funcion mostrarCuadricula toma el contexto creado en el scritp ppal. y dibuja lineas horizontales
y verticales paralelas de color gris que se muestran u ocultan con el boton mostrar/ocultar cuadricula
Se ejecuta en la funcion draw() que realiza el loop de dibujado cuando el flag showCuadricula controlado
por el boton es true.
No muestra la cuadricula si la animacion esta terminada, solo cuando esta corriendo.
*/