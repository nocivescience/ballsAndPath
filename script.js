// Obtén el elemento canvas y su contexto
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Asegúrate de que el canvas tenga el tamaño que deseas
canvas.width = 800;
canvas.height = 600;

// Define una clase para las pelotitas
class Pelotita {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx; // velocidad en el eje x
    this.dy = dy; // velocidad en el eje y
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'red'; // Cambia el color aquí
    ctx.fill();
  }

  update() {
    // Si la bola llega a un borde horizontal, invertir la dirección en el eje x
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    // Si la bola llega a un borde vertical, invertir la dirección en el eje y
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Mover la bola
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

// Crea 12 pelotitas en posiciones aleatorias
var pelotitas = [];
for (var i = 0; i < 12; i++) {
  var radius = 10;
  var x = radius + Math.random() * (canvas.width - 2 * radius);
  var y = radius + Math.random() * (canvas.height - 2 * radius);
  var dx = (Math.random() - 0.5) * 2; // velocidad aleatoria en el eje x
  var dy = (Math.random() - 0.5) * 2; // velocidad aleatoria en el eje y
  pelotitas.push(new Pelotita(x, y, radius, dx, dy));
}

// Función de animación
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < pelotitas.length; i++) {
    pelotitas[i].update();
  }

  // Dibuja una línea entre las bolas que están a menos de 3 cm una de otra
  for (var i = 0; i < pelotitas.length; i++) {
    for (var j = i + 1; j < pelotitas.length; j++) {
      var dx = pelotitas[i].x - pelotitas[j].x;
      var dy = pelotitas[i].y - pelotitas[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 3 * 37.795275591) { // 3 cm en píxeles
        ctx.beginPath();
        ctx.moveTo(pelotitas[i].x, pelotitas[i].y);
        ctx.lineTo(pelotitas[j].x, pelotitas[j].y);
        ctx.strokeStyle = 'red'; // Cambia el color aquí
        ctx.stroke();
      }
    }
  }
}

animate();

canvas.addEventListener('click', function(event) {
    // Obtiene la posición del clic en el canvas
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;
  
    // Aumenta la velocidad de cada bola en la dirección desde el clic hasta la bola
    for (var i = 0; i < pelotitas.length; i++) {
      var dx = pelotitas[i].x - clickX;
      var dy = pelotitas[i].y - clickY;
      var distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance < 200) { // 200px
        // Calcula la dirección normalizada
        var directionX = dx / distance;
        var directionY = dy / distance;
  
        // Aumenta la velocidad de la bola en la dirección
        pelotitas[i].dx += directionX * 5; // Ajusta la cantidad de velocidad que se añade aquí
        pelotitas[i].dy += directionY * 5; // Ajusta la cantidad de velocidad que se añade aquí
      }
    }
  });

// // Agrega un controlador de eventos de clic al canvas
// canvas.addEventListener('click', function(event) {
//     // Obtiene la posición del clic en el canvas
//     var rect = canvas.getBoundingClientRect();
//     var clickX = event.clientX - rect.left;
//     var clickY = event.clientY - rect.top;
  
//     // Cambia la dirección de cualquier bola que esté a menos de 200px del clic
//     for (var i = 0; i < pelotitas.length; i++) {
//       var dx = clickX - pelotitas[i].x;
//       var dy = clickY - pelotitas[i].y;
//       var distance = Math.sqrt(dx * dx + dy * dy);
  
//       if (distance < 200) { // 200px
//         pelotitas[i].dx = -pelotitas[i].dx;
//         pelotitas[i].dy = -pelotitas[i].dy;
//       }
//     }
//   });