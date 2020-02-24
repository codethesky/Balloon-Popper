/*
To do:
-Create plane in the game 
	**function createPlane()
	**function animatePlane()
*/


let colors = ['yellow', 'red', 'blue', 'violet', 'green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let currentBallon = 0;
let currentPlane = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');
let startBtn = document.querySelector('.start-game-button');

function createBalloon() {
	let div = document.createElement('div');
	let rand = Math.floor(Math.random()*colors.length);
	div.className = 'balloon balloon-'+colors[rand];

	rand = Math.floor(Math.random() * (windowWidth - 100));
	div.style.left = rand + 'px';
	div.dataset.number = currentBallon;
    currentBallon++;

	body.appendChild(div);
	animateBalloon(div);
}

function animateBalloon(elem){
	let pos = 0;
	let random = Math.floor(Math.random() * 6 - 3);
	let interval = setInterval(frame, 12 - Math.floor(num / 10) + random);

	function frame(){
		if(pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)) {
			clearInterval(interval);
			gameOver = true;
		} else{
			pos++;
			elem.style.top = windowHeight - pos + 'px';
		}
	}
}

/* So far unable to create the plane in the game
function createPlane() {
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * ((windowHeight / 2) - 100));

    div.className = 'plane plane-blue';
    div.style.bottom = (rand * 2) + 'px'; 
    div.dataset.number = currentPlane;
    currentPlane++;

    body.appendChild(div);
    animatePlane(div);

}

function animatePlane(elem) {
    let pos = 0;
    let random = Math.floor(Math.random() * 6 - 3);
    let interval = setInterval(frame, 12 - Math.floor(num / 10) + random);

    function frame() {
        if (pos >= (windowWidth + 200) && (document.querySelector('[data-number="' + elem.dataset.number + '"]') !== null)) {
            clearInterval(interval);
        } else {
            pos++;
            elem.style.left = windowWidth - pos + 'px';
        }
    }
}
*/


function deleteBalloon(elem){
		elem.remove();
		num++;
		updateScore();
		playBallSound();
}

// Add score functionality and sound here
function deletePlane(elem) {
    elem.remove();
}

function playBallSound(){
	let audio = document.createElement('audio');
	audio.src = 'sounds/pop.mp3';
	audio.play();
}

function updateScore(){
	for(let i = 0; i < scores.length; i++){
		scores[i].textContent = num;
	}
}

function startGame(){
	restartGame();
	let timeout = 0;

	let loop = setInterval(function(){
		timeout = Math.floor(Math.random() * 600 - 100);
		if(!gameOver && num !== total){
            createBalloon();
            //createPlane();
		} else if(num !== total) {
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.lose').style.display = 'block';
		} else {
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.win').style.display = 'block';
		}
		
	}, 800 + timeout);
}

function restartGame(){
	let forRemoving = document.querySelectorAll('.balloon');
	for(let i = 0; i < forRemoving.length; i++){
		forRemoving[i].remove();
	}
	gameOver = false;
	num = 0;
	updateScore();
}

// Listener is for both balloons and plane objects
document.addEventListener('click', function(event){
    if (event.target.classList.contains('balloon')) {
        deleteBalloon(event.target);
    } /* else if (event.target.classList.contains('plane')) {
        deletePlane(event.target);
    } */
})

document.querySelector('.restart').addEventListener('click', function(){
	totalShadow.style.display = 'none';
	totalShadow.querySelector('.win').style.display = 'none';
	totalShadow.querySelector('.lose').style.display = 'none';

	startGame();
});

document.querySelector('.cencel').addEventListener('click', function(){
	totalShadow.style.display = 'none';
});

startBtn.addEventListener('click', function() {
	startGame();
	document.querySelector('.bg-music').play();
	document.querySelector('.start-game-window').style.display = 'none';
});
















