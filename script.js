console.log('welcome to the dragon adventures by chaitanya pansare');
let score = 0;
let cross = true;

let audio = new Audio('music.mp3');
let gaudio = new Audio('gameover.mp3');

// it is because of to interact with webpage first
setTimeout(() => {
    audio.play();
}, 100);
document.onkeydown = function(e){
    // console.log("The key code is " , e.keyCode);

    if (e.keyCode == 38) {
        console.log('up key');
        let human = document.getElementById('human');

        // first upon we have to add the class to the human to animate it...
        // but it works only one time ..
        human.classList.add('animatehuman');

        // hence we are adding settimeout function to remove the animation class 
        // Exact after the 700 milli seconds when user clicks on ther up arrow key...
        setTimeout(() => {
            human.classList.remove('animatehuman');
        }, 700);
    }

    else if (e.keyCode == 39) {
        console.log('right key');
        let human = document.getElementById('human');

        // find out the exact correct value of left side of the human id element
        // but it will return the value in the px we have convert it into the integer

        let humanX = parseInt(window.getComputedStyle(human, null).getPropertyValue('left'));
        console.log(humanX);

        // when the user clicks on the right arrow key then user move 100px to right..
        // add 100px to left
        human.style.left = (humanX + 100) + 'px';
    }

    else if (e.keyCode == 37) {
        console.log('left key');
        let human = document.getElementById('human');

        // find out the exact correct value of left side of the human id element
        // but it will return the value in the px we have convert it into the integer

        let humanX = parseInt(window.getComputedStyle(human, null).getPropertyValue('left'));
        console.log(humanX);

        // when the user clicks on the left arrow key then user move 100px to left..
        // substract 100px to left
        human.style.left = (humanX - 100) + 'px';
    }
}

// setinterval function to do particular things repeatedly...
// in order to check the conditions repeatedly...

setInterval(() => {
    let human = document.getElementById('human');
    let over = document.getElementById('over');
    let dragon = document.getElementById('dragon'); 

    // find out the exact value of x and y axis of the human and dragon

    let humanX = parseInt(window.getComputedStyle(human, null).getPropertyValue('left'));
    let humanY = parseInt(window.getComputedStyle(human, null).getPropertyValue('bottom'));

    let dragonX = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    let dragonY = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('bottom')); 

    let offsetX = Math.abs(humanX - dragonX);
    let offsetY = Math.abs(humanY - dragonY);

    // console.log(offsetX, offsetY);

// when the offset x means the difference between the x axis of human and dragon is less than 89 px and
// offset y means the y axis of the human and dragon less than 107px then game is over...
// but this two conditions when teuw the your game is over...
    if (offsetX < 89 && offsetY < 107) {
        // some explanation

        // Intially, the offset y is false because human not jump intially but offset x is true then game is not over and 
        // at this time when the user jump the human then, offset y becomes true and when offset x is less than 89px it becomes false but game is not over
        // but when the offset x is less than 89px and user not jump the human...then game is over.
        // console.log('game over');

        gaudio.play();
        setTimeout(() => {
            audio.pause();
            gaudio.pause();
        }, 1000);
        // stop animate the dragon and human also...
        let dragon = document.getElementById('dragon');
        dragon.classList.remove('animatedragon');

        let human = document.getElementById('human');
        human.classList.remove('animatehuman');

        over.style.display = 'block';
    }

    // when the dragon is in the contact of human but the human jump then it will happen...
    else if (offsetX < 89 && cross) {
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);


        // this method for increasing the speed of the dragon slowly slowly.....
        setTimeout(() => {
            let aniDuration = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue('animation-duration'));
            // console.log('Old animation Duration is ' , aniDuration);
            let newDuration = aniDuration - 0.05;
            console.log("New animation Duration is " , newDuration);
            if (newDuration < 3 && newDuration > 2.5) {
                score += 50;
            }
            else if (newDuration < 2.5  && newDuration > 2) {
                score += 100;
            }
            else if (newDuration < 2 && newDuration > 1.5) {
                score += 150;
            }
            else if (newDuration < 1.5 && newDuration > 1) {
                score += 200;
            }
            else if (newDuration < 1 && newDuration > 0.5) {
                score += 250;
            }
            else if (newDuration < 0.5) {
                score += 500;
            }
            updateScore(score);
            dragon.style.animationDuration = newDuration + 's';
            
        }, 500);

    }
}, 100);

function updateScore(score){
    let scoreCount = document.getElementById('score-count');
    scoreCount.style.display = 'block';
    scoreCount.innerHTML = 
    `<i class="fa fa-arrows-alt"></i> &nbsp;Your Score is ` + score;
}