## Proximos Cambios
- [ ] refactorizar las funciones y eventos y usar objetos donde se necesite
- [ ] evitar mucho uso de if else
- [ ] hacer que la velocidad sea constante sin depender de refresh rate del monitor, con timestamp
- [ ] incorporar aceleracion al rectangulo
- [ ] incorporar gravedad y su aceleracion
- [ ] refactorizar las funciones que verifican las colisiones
- [ ] que el rectangulo pueda pegar un salto presionando la w o barra espaciadora
- [ ] que al pegar un salto se pueda desplazar en el aire con w y s
- [ ] incorporar desplazamiento en diagonal
- [ ] poder colisionar con cualquier rectangulo del listado
- [ ] incorporar colisiones con objetos distintos de rectangulos, por ej circulo o rombo
- [ ] agregar una rama con todos los comentarios del codigo
- [ ] hacer una clase rectagulo o forma que reciba la cantidad de rects o huecos y cree
- [ ] calculando los valores de ancho alto y tamaño en base a las cantidades y los ubique de manera equivalente en el canvas
- [ ] por el momento los rectangulos son multiplos de 5 para acertar colisiones por posicion de x e y
- [ ] ver flujo de estudio con comentarios ramas e historial de ramas y commits
- [ ] ver si conviene separa las funciones para dibujar en canvas y las q ejecutan o cancelan la animacion
- [ ] juntar comentarios generales del codigo o comportamiento de js y dom/navegador/node etc y separar de los que son explicando el codigo

### Completados
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

### Comentarios en Gral
en js modules no se usan los index igual que con vite, solo especificando la carpeta q contiene el index, porque el navegador no lo encuentra,
hay q especificar index.js para poder tomar las exportaciones q necesito del objeto q las junta en index