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
    ctx.fillStyle = 'blue';
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
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < pelotitas.length; i++) {
    pelotitas[i].update();
  }
}

animate();