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

function createPlane() {
    let div = document.createElement('div');
    div.className = 'plane plane-blue';
	div.style.top = GetRandomNumber(0, 300) + 'px';
	div.style.left = '-400px'
    div.dataset.planeNumber = currentPlane;
    currentPlane++;

    body.appendChild(div);
    animatePlane(div);

}

function animatePlane(elem) {
    let position = -400;
    let interval = setInterval(frame, 10);
	let rateOfSpeed = GetRandomNumber(1, 5);
    function frame() {
        if (position >= (windowWidth + 600)) {
			clearInterval(interval);
		
        } else {
            position += rateOfSpeed;
            elem.style.left = position + 'px';
        }
    }
}

//Enter min and max numbers in range for possible random numbers, returns rounded random number
function GetRandomNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

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

	let planeLoop = setInterval(function(){
		timeout = Math.floor(Math.random() * 600 - 100);
		if(!gameOver && num !== total){
			createPlane();
		} else if(num !== total) {
			clearInterval(planeLoop);
		} else {
			clearInterval(planeLoop);
		
		}
		
	}, 10000 + timeout);
}

function restartGame(){
	let forRemoving = document.querySelectorAll('.balloon');
	for(let i = 0; i < forRemoving.length; i++){
		forRemoving[i].remove();
	}

	let forRemovingPlanes = document.querySelectorAll('.plane');
	for(let i = 0; i < forRemovingPlanes.length; i++){
		forRemovingPlanes[i].remove();
	}

	gameOver = false;
	num = 0;
	updateScore();
}

// Listener is for both balloons and plane objects
document.addEventListener('click', function(event){
    if (event.target.classList.contains('balloon')) {
        deleteBalloon(event.target);
    }
})

document.querySelector('.restart').addEventListener('click', function(){
	totalShadow.style.display = 'none';
	totalShadow.querySelector('.win').style.display = 'none';
	totalShadow.querySelector('.lose').style.display = 'none';

	startGame();
});

document.querySelector('.cencel').addEventListener('click', function(){
    totalShadow.style.display = 'none';
    restartGame();
    document.querySelector('.bg-music').pause();
    document.querySelector('.start-game-window').style.display = 'flex';
});

startBtn.addEventListener('click', function() {
	startGame();
	document.querySelector('.bg-music').play();
	document.querySelector('.start-game-window').style.display = 'none';
});
















