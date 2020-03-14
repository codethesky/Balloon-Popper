
  
/*
To do:
-Create plane in the game 
	**function createPlane()
	**function animatePlane()
*/


let colors = ['yellow', 'red', 'blue', 'violet', 'green'];
//Explicitly name any logo image file names in Logos[] for them to be displayed in app.  150px x 150px is optimal size.
let logos = ['images/logo1.png','images/logo2.png','images/logo3.png'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let currentBallon = 0;
let currentPlane = 0;
let planeExists = false;
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
	if (!planeExists) {
		//create div container for plane objects
		let div = document.createElement('div');
		div.className = 'plane';
		div.style.top = GetRandomNumber(0, 250) + 'px';
		div.style.left = '-1200px'
		div.style.width = 'fit-content'
		div.style.height = 'fit-content'
		div.style.position = 'absolute'
		planeExists = true;
		
		//create plane image and set styling
		let plane = document.createElement('img');
		plane.src = 'images/plane_blue_banner.png'
		plane.style.float = 'right'
		plane.style.height = '175px';
		plane.style.left = '-1200px';
		plane.style.position = 'absolute'
		
		//create logo image and set styling
		let logo = document.createElement('img');
		selectedLogo = logos[GetRandomNumber(0, (logos.length - 1))];
		logo.src = selectedLogo;
		logo.style.position = 'absolute'
		logo.style.left = '-1065px'
		logo.style.top = '25px'

		//Insert images into container div	
		div.appendChild(plane);
		div.appendChild(logo);
		//insert div into body
		body.appendChild(div);
		animatePlane(div);
	}	
}

function animatePlane(elem) {
    let position = -400;
    let interval = setInterval(frame, 10);
	let rateOfSpeed = 2;
    function frame() {
        if (position >= (windowWidth + 1200) && !gameOver) {
			clearInterval(interval);
			planeExists = false;
			createPlane();
        } else if (gameOver){
			clearInterval(interval);
			planeExists = false;
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
	createPlane();
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

