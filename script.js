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
    if(player.classList != 'playerJump') {
    playerAddClass('playerJump');
    }
    setTimeout(function() {
        playerAddClass('playerRun');
        playerRemoveClass('playerJump');
    }, 500)
};

// Ajoute un point quand l'ennemi sort de l'écran
const countScores = setInterval(function(){
    score++;
    scoreAmount.textContent = score;  
},1000)

// Définis mon ennemi de départ
let starterEnemy = randomIntFromInterval(1,6);
enemy.classList.add(`enemy${starterEnemy}`);

// Change l'ennemi toutes les secondes
const randomEnemy = setInterval(function() {
    let oneToSix = randomIntFromInterval(1,6);
    enemy.className = '';
    enemy.classList.add(`enemy${oneToSix}`);
}, 1000)

// Vérifie si l'ennemi touche le joueur toutes les 10ms
// Lance l'animation de mort si c'est le cas
const checkDeath = setInterval(function(){
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));
    if (enemyLeft<32 && enemyLeft >0 && playerTop >= 172) {
        player.className = '';
        gameOver.classList.add('gameOverAnimate');
        playerAddClass('playerDeath');
        enemy.style.display = 'none';
        clearInterval(countScores);
        setTimeout(function(){
            player.className = '';
            alert(`Merci d'avoir essayé :)`);
        },2000);
    }
}, 10);
