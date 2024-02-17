// Obtén el elemento canvas y su contexto
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Asegúrate de que el canvas tenga el tamaño que deseas
canvas.width = 800;
canvas.height = 600;

// Define una clase para las pelotitas
class Pelotita {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
  }
}

// Crea 12 pelotitas en posiciones aleatorias
for (var i = 0; i < 12; i++) {
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var radius = 10; // Cambia esto para cambiar el tamaño de las pelotitas
  var pelotita = new Pelotita(x, y, radius);
  pelotita.draw();
}