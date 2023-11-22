import { randomRGB } from "./randomRGB.js";
import { random } from "./randomRGB.js";
const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
//Error: al final de la próxima linea, hay que hacer referencia a Width, no a Height
export const width = canvas.width = window.innerWidth;
export const height = canvas.height = window.innerHeight;


class Ball {
    constructor(x, y, velX, velY, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = randomRGB();
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        // El error está en los () de Math.PI, hay que suprimirlos //
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
            this.velX = -this.velX;
        }

        if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
            this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect(otherBall) {
        const dx = this.x - otherBall.x;
        const dy = this.y - otherBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + otherBall.size) {
            otherBall.color = this.color = randomRGB();
        }
    }
}
export const balls = [];
while (balls.length < 20) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        size
    );

    balls.push(ball);
}
