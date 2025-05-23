const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];
let popped = 0;

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 50,
    size: 30 + Math.random() * 30,
    speed: 1 + Math.random() * 2
  };
}

function drawHeart(heart) {
  ctx.fillStyle = "#ff4da6";
  ctx.beginPath();
  ctx.moveTo(heart.x, heart.y);
  ctx.bezierCurveTo(
    heart.x - heart.size / 2,
    heart.y - heart.size / 2,
    heart.x - heart.size,
    heart.y + heart.size / 3,
    heart.x,
    heart.y + heart.size
  );
  ctx.bezierCurveTo(
    heart.x + heart.size,
    heart.y + heart.size / 3,
    heart.x + heart.size / 2,
    heart.y - heart.size / 2,
    heart.x,
    heart.y
  );
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.y -= heart.speed;
    drawHeart(heart);
    if (heart.y + heart.size < 0) {
      hearts.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

canvas.addEventListener("click", (e) => {
  hearts.forEach((heart, index) => {
    const dx = e.clientX - heart.x;
    const dy = e.clientY - heart.y;
    if (Math.sqrt(dx * dx + dy * dy) < heart.size) {
      hearts.splice(index, 1);
      popped++;
      if (popped >= 10) {
        document.getElementById("message").style.display = "block";
      }
    }
  });
});

setInterval(() => {
  if (document.getElementById("start-screen").style.display === "none") {
    hearts.push(createHeart());
  }
}, 300);

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  animate();
});
