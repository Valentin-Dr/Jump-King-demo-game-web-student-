// RNG de 1 à 6
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
};

// Fonctions pour raccourcir le code quand je change les classes
function playerAddClass(classe) {
    player.classList.add(classe);
};

function playerRemoveClass(classe) {
    player.classList.remove(classe);
};

function enemyClass(remove, add) {
    enemy.classList.remove(remove);
    enemy.classList.add(add);
};

const gameOver = document.getElementById('gameOver');

const game = document.getElementById('game');

// Je récupère mon ID player
const player = document.getElementById('player');

// Je récupère mon ID enemy
const enemy = document.getElementById('enemy');

// Je récupère mon ID score
const scores = document.getElementById('score');

// Je crée mon score
let score = 0;

let scoreAmount = document.createElement('p');

scoreAmount.classList.add('scoreFont')

scoreAmount.textContent = score;

scores.appendChild(scoreAmount);

// Fonction pour faire sauter le joueur
// Que je mets en onclick sur la page html
const jump = () => {
    playerRemoveClass('playerRun');
    if (player.classList != 'playerJump') {
        playerAddClass('playerJump');
    }
    setTimeout(function () {
        playerAddClass('playerRun');
        playerRemoveClass('playerJump');
    }, 500)
};

// Ajoute un point toutes les secondes
const countScores = setInterval(function () {
    score++;
    scoreAmount.textContent = score;
}, 1000)

// Définis mon ennemi de départ
let starterEnemy = randomIntFromInterval(1, 6);
enemy.classList.add(`enemy${starterEnemy}`);

// Change l'ennemi toutes les secondes
// const randomEnemy = setInterval(function () {
//     let oneToSix = randomIntFromInterval(1, 6);
//     enemy.className = '';
//     enemy.classList.add(`enemy${oneToSix}`);
// }, 1000)

// Fait gagner le joueur s'il arrive à 100
const checkVictory = setInterval(function () {
    if (scoreAmount.textContent === '100') {
        gameOver.textContent = 'VICTOIRE BRAVO';
        gameOver.classList.add('gameOverAnimate');
        enemy.style.display = 'none';
        clearInterval(enemySpeed);
        clearInterval(countScores);
        player.className = '';
        player.classList.add('playerWin');
        setTimeout(function () {
            player.className = '';
            alert(`Allez les XIII`);
        }, 8000);
        clearInterval(checkVictory);
    }
}, 10)

// Change la vitesse du monstre en fonction du score
const enemySpeed = setInterval(function () {
    if (enemy.classList.contains('enemy1') || enemy.classList.contains('enemy2') || enemy.classList.contains('enemy3')) {
        if (scoreAmount.textContent < 20) {
            enemy.classList.add('enemy6SpritesSlow');
        } else if (scoreAmount.textContent >= 20 && scoreAmount.textContent < 40) {
            enemyClass('enemy6SpritesSlow', 'enemy6SpritesMedium');
        } else if (scoreAmount.textContent >= 40 && scoreAmount.textContent < 60) {
            enemyClass('enemy6SpritesMedium', 'enemy6SpritesFast');
        } else if (scoreAmount.textContent >= 60 && scoreAmount.textContent < 100) {
            enemyClass('enemy6SpritesFast', 'enemy6SpritesImpossible');
        }
    } else if (enemy.classList.contains('enemy4') || enemy.classList.contains('enemy5') || enemy.classList.contains('enemy6')) {
        if (scoreAmount.textContent < 20) {
            enemy.classList.add('enemy4SpritesSlow');
        } else if (scoreAmount.textContent >= 20 && scoreAmount.textContent < 40) {
            enemyClass('enemy4SpritesSlow', 'enemy4SpritesMedium');
        } else if (scoreAmount.textContent >= 40 && scoreAmount.textContent < 60) {
            enemyClass('enemy4SpritesMedium', 'enemy4SpritesFast');
        } else if (scoreAmount.textContent >= 60 && scoreAmount.textContent < 100) {
            enemyClass('enemy4SpritesFast', 'enemy4SpritesImpossible');
        }
    }
}, 10)

// classList.contains('class')
// Vérifie si l'ennemi touche le joueur toutes les 10ms
// Lance l'animation de mort si c'est le cas
const checkDeath = setInterval(function () {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));
    if (enemyLeft < 32 && enemyLeft > 0 && playerTop >= 172) {
        player.className = '';
        gameOver.classList.add('gameOverAnimate');
        playerAddClass('playerDeath');
        enemy.style.display = 'none';
        clearInterval(countScores);
        setTimeout(function () {
            player.className = '';
            alert(`Merci d'avoir essayé :)`);
        }, 2000);
    }
}, 10);