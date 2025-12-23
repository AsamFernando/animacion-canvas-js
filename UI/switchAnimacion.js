// const switchAnimacionBtn = document.getElementById("switchAnimacionBtn")
// let animacionCorriendo = false //flag para arrancar o terminar el loop draw inicia el false y cuando se cambia con el boton ejecuta draw() en switchLoop
// let myReq;

// const switchAnimacion = (draw) => {
//     if(animacionCorriendo) {
//         myReq = window.requestAnimationFrame(draw)
//     }
//     else {
//         window.cancelAnimationFrame(myReq)
//     }
// }
// const switchLoop = (e) => {
//     switchAnimacionBtn.innerText = animacionCorriendo ? 'terminar animacion' : 'comenzar animacion'
//     animacionCorriendo = !animacionCorriendo
// }

// switchAnimacionBtn.addEventListener('click', switchLoop)

// export default switchAnimacion

//COMENTARIOS

/*
ver si se puede trasladar esta funcionalidad aca sin romper el loop, por el momento la dejo en scriptCanvas
*/