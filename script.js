const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let step = 0;
let greenLight1 = false;
let greenLight2 = false;

let car1 = { x: 100, y: 180, width: 40, height: 20, speed: 2, color: "blue" };
let car2 = { x: 50, y: 220, width: 40, height: 20, speed: 2, color: "red" };
let car3 = { x: 250, y: 300, width: 40, height: 20, speed: 2, color: "green" };

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna strada
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 170, canvas.width, 60);
    ctx.fillRect(240, 0, 60, canvas.height);

    // Disegna semafori
    ctx.fillStyle = greenLight1 ? "green" : "red";
    ctx.beginPath();
    ctx.arc(500, 150, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = greenLight2 ? "green" : "red";
    ctx.beginPath();
    ctx.arc(270, 50, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Disegna auto
    drawCar(car1);
    drawCar(car2);
    drawCar(car3);
}

function drawCar(car) {
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);
    ctx.fillStyle = "black";
    ctx.fillRect(car.x + 5, car.y - 2, 10, 5); // Tettuccio
    ctx.fillRect(car.x + 25, car.y - 2, 10, 5);
}

function update() {
    if (step === 0) {
        greenLight1 = true;
        if (car1.x < 500) car1.x += car1.speed;
        if (car2.x < 500) car2.x += car2.speed;
        if (car1.x >= 500 && car2.x >= 500) {
            step = 1;
            greenLight1 = false;
            setTimeout(() => step = 2, 1000);
        }
    } else if (step === 2) {
        greenLight2 = true;
        if (car3.y > 50) car3.y -= car3.speed;
        if (car3.y <= 50) greenLight2 = false;
    }
}

function animate() {
    drawScene();
    update();
    requestAnimationFrame(animate);
}

animate();
