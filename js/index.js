const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

console.log(collisions);

// canvas.width = 1024;
// canvas.height = 720;

canvas.width = 1024;
canvas.height = 720;

const collisionsMap = [];
for(let i = 0; i < collisions.length; i+=50){
    collisionsMap.push(collisions.slice(i, 50 + i));

}

class Boundary{
    static width = 32;
    static height = 32;
    constructor({position}){
        this.position = position;
        this.width = 32;
        this.height = 32;
    };

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
}

const boundaries = [];
const offset = {
    x: -2000,
    y: -400

};

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol !== 0) {
            boundaries.push(new Boundary({position: { 
                X: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }}));
        }
    })
});

console.log(boundaries);

const image = new Image();
image.src = '/img/Word1.png';

const playerImage = new Image();
playerImage.src = '/img/playerMove/Run-Sheet.png';

class Sprite {
    constructor({ position, velocity, image, frames = { max : 1}, scale = 1 }){
        this.position = position;
        this.image = image;
        this.frames = frames;

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height / this.frames.max;
            console.log(this.width, this.height);
        };
        
        this.scale = scale; 
    }

    draw() {
        const playerWidth = this.image.width / this.frames.max * this.scale;
        const playerHeight = this.image.height * this.scale;    
        c.drawImage(this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            playerWidth, 
            playerHeight 
        );
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 400 / 4 / 2,
        y: canvas.height / 2 - 150 / 2
    },
    image: playerImage,
    frames: {
        max: 6
    },
    scale: 2
});

const background = new Sprite({
    position: { x: offset.x, 
                y: offset.y 
    },
    image: image
});

const keys = {
    w: {
        pressed: false
    }, 
    a: {
        pressed: false
    }, 
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
};


const testBoundary = new Boundary({
    position: {
        x: 400, 
        y: 400
    }
});

const movables = [background, testBoundary];

function rectangularCollision({ rectangle1, rectangle2 }){
    return (
        player.position.x + playerWidth - margin > testBoundary.position.x &&
        player.position.x + margin < testBoundary.position.x + testBoundary.width &&
        player.position.y + playerHeight - margin > testBoundary.position.y &&
        player.position.y + margin < testBoundary.position.y + testBoundary.height
    );
};
function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    testBoundary.draw();
    player.draw();

// Verifique a colisão levando em conta a escala do jogador
const playerWidth = player.image.width / player.frames.max * player.scale;
const playerHeight = player.image.height * player.scale;

// Ajuste da margem de colisão
const margin = 0;

if (
    player.position.x + playerWidth - margin > testBoundary.position.x &&
    player.position.x + margin < testBoundary.position.x + testBoundary.width &&
    player.position.y + playerHeight - margin > testBoundary.position.y &&
    player.position.y + margin < testBoundary.position.y + testBoundary.height
) {
    console.log('collision');
}





    if (keys.w.pressed && lastKey === 'w') {
        movables.forEach(movable => {
            movable.position.y += 3;
        });
    } else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach(movable => {
            movable.position.x += 3;
        });
    } else if (keys.s.pressed && lastKey === 's') {
        movables.forEach(movable => {
            movable.position.y -= 3;
        });
    } else if (keys.d.pressed && lastKey === 'd') {
        movables.forEach(movable => {
            movable.position.x -= 3;
        });
    }
}

animate();


let lastKey = '';
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;   
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break; 
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
    //console.log(keys);
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;   
        case 's':
            keys.s.pressed = false;
            break; 
        case 'd':
            keys.d.pressed = false;
            break;
    }
    //console.log(keys);
});


// image.onload = () => {
//     c.drawImage(image, -1025, -800);
//     c.drawImage(playerImage, 
//                 0, 
//                 0,
//                 playerImage.width / 6, 
//                 playerImage.height,
//                 canvas.width / 2 - playerImage.width / 13, 
//                 canvas.height / 2 - playerImage.height / 2,
//                 playerImage.width / 6,
//                 playerImage.height
//                 );
// };