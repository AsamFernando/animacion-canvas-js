## Bugs
- No hay de momento

## Proximos Cambios
- [ ] hacer q la velocidad en q se ve q player se mueve por pantalla no dependa de restar o sumar a su posicion una variable velocidad sino q siempre avance de 1 en 1 para evitar q las posiciones desde donde arranca q pueden ser cambiadas por los inputs, y las proximas q tome dejen de ser multiplos de la velocidad q se resta a la posicion, lo cual rompe las colisiones de momento
- [ ] hacer que la velocidad sea constante sin depender de refresh rate del monitor, con timestamp
- [ ] incorporar aceleracion al rectangulo
- [ ] incorporar gravedad y su aceleracion
- [ ] que el rectangulo pueda pegar un salto presionando la w o barra espaciadora
- [ ] que al pegar un salto se pueda desplazar en el aire con w y s
- [ ] incorporar desplazamiento en diagonal
- [ ] poder colisionar con cualquier rectangulo del listado
- [ ] incorporar colisiones con objetos distintos de rectangulos, por ej circulo o rombo
- [ ] agregar una rama con todos los comentarios del codigo
- [ ] hacer una clase rectagulo o forma que reciba la cantidad de rects o huecos y cree
- [ ] calculando los valores de ancho alto y tamaño en base a las cantidades y los ubique de manera equivalente en el canvas
- [ ] ver flujo de estudio con comentarios ramas e historial de ramas y commits
- [ ] juntar comentarios generales del codigo o comportamiento de js y dom/navegador/node etc y separar de los que son explicando el codigo

### Correcciones
- [ ] ver como mergear mejor las ramas con comentario con las no comentadas como dev-comentado con dev para luego pasar a main q no tiene comentarios
- [ ] refactorizar todas las asignaciones y variables en cambiarPosicion.js
- [ ] refactorizar las funciones y eventos y usar objetos donde se necesite
- [ ] evitar mucho uso de if else
- [ ] refactorizar las funciones que verifican las colisiones
- [ ] por el momento los rectangulos son multiplos de 5 para acertar colisiones por posicion de x e y
- [ ] ver si conviene separa las funciones para dibujar en canvas y las q ejecutan o cancelan la animacion

### Completados
- [x] FIX MOMENTANEO hacer q los inputs solo admitan valores multiplos de la velocidad (explicacion en cambiarPosicion.js)
- [x] incorporar colisiones con otros rectangulo -> hecho
- [x] agregar inputs para dar una posicion inicial -> hecho
- [x] BUG: al colisionar las aristas de player con el rectangulo no permite avanzar hacia el rectangulo desde ninguno de los
- [x] 4 lados -> solucionado
- [x] hacer una clase rectangulo q va a permitir agregar mas funcionalidad al player y escenario 
- [x] a la que le paso los minimos valores de representacion y tienen las
- [x] funciones para posicionarse y colisionar -> hecho
- [x] poner en archivo a parte el player los rects y la creacion de entidades -> hecho
- [x] crear archivo UI para los inputs de posicion, botones y cuadricula -> hecho
- [x] dividir en varios archivos tipo, colisiones.js, keys.js, inputs.js, player.js, y objects.js ... etc., hasta dejar solo draw() en este archivo. -> hecho
- [x] sacar funciones fuera de draw o crear nuevas -> hecho

### Comentarios importantes en Gral
en js modules no se usan los index igual que con vite, solo especificando la carpeta q contiene el index, porque el navegador no lo encuentra,
hay q especificar index.js para poder tomar las exportaciones q necesito del objeto q las junta en index