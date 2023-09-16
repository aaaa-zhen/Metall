var c = document.getElementById("canvas");
c.width = innerWidth;
c.height = innerHeight;

c.style.backgroundColor = "black";
var ctx = c.getContext("2d");

var ball1 = {
    x: 100,
    y: 250,
    vx: 5,
    vy: 1.5,
    radius: 50
};

var ball2 = {
    x: 400,
    y: 250,
    vx: -5,
    vy: -1.5,
    radius: 50
};

var ball3 = {
    x: 200,
    y: 100,
    vx: 3,
    vy: 2,
    radius: 40
};

var ball4 = {
    x: 500,
    y: 350,
    vx: -4,
    vy: -3,
    radius: 60
};

function moveBall(ball) {
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Boundary checks
    if (ball.x + ball.radius > c.width || ball.x - ball.radius < 0) {
        ball.vx = -ball.vx;
    }

    if (ball.y + ball.radius > c.height || ball.y - ball.radius < 0) {
        ball.vy = -ball.vy;
    }
}

function metaballEffect(px, py, ball) {
    // Get distance from pixel to ball center
    let dx = px - ball.x;
    let dy = py - ball.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate the effect
    return ball.radius / distance;
}

function animate() {
    ctx.clearRect(0, 0, c.width, c.height);

    moveBall(ball1);
    moveBall(ball2);
    moveBall(ball3);
    moveBall(ball4);

    for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
            // For each pixel, calculate the effect from each ball
            let sum = metaballEffect(x, y, ball1) + metaballEffect(x, y, ball2) + metaballEffect(x, y, ball3) + metaballEffect(x, y, ball4);

            // Convert the sum into a color (this is a threshold, you can adjust it)
            if (sum > 1.5) {
                ctx.fillStyle = "White";
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();
