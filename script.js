// Je récupère mon ID player
const player = document.getElementById('player');

// Je récupère mon ID enemy
const enemy = document.getElementById('enemy');

// Fonction pour faire sauter le joueur
const jump = () => {
    player.classList.remove('playerRun');
    if(player.classList != 'playerJump') {
    player.classList.add('playerJump');
    }
    setTimeout(function() {
        player.classList.add('playerRun');
        player.classList.remove('playerJump');
    }, 500)
};

// Vérifie si l'ennemi touche le joueur toutes les 10ms
const checkDeath = setInterval(function(){
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));
    if (enemyLeft<32 && enemyLeft >0 && playerTop >= 172) {
        enemy.style.display = 'none';
        alert(`Merci d'avoir essayé :)`);
    }
}, 10)