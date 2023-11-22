import { balls } from "./balls.js";
import { ctx, width, height } from "./balls.js";

export function loop() {
    // Error: para que el color del fondo sea negro, los 3 primeros números deben de ser 0
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        for (const otherBall of balls) {
            if (ball !== otherBall) {
                ball.collisionDetect(otherBall);
            }
        }
    }

    requestAnimationFrame(loop);
}
