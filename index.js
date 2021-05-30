// Patch sounds to variables
redSound = new Audio('sounds/red.mp3')
greenSound = new Audio('sounds/green.mp3')
yellowSound = new Audio('sounds/yellow.mp3')
blueSound = new Audio('sounds/blue.mp3')
wrongSound = new Audio('sounds/wrong.mp3')

// Choosing the sound
function playColorSound(color) {
    switch (color) {
        case 'green':
            greenSound.play()
            break
        case 'blue':
            blueSound.play()
            break
        case 'red':
            redSound.play()
            break
        case 'yellow':
            yellowSound.play()
            break
        default: console.log(color)
    }
}

// function to animate the button when clicked
function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed')
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed')
    }, 100);
}

level = 0

// prompt for game start
let gameStarted = false

$(document).keydown(function() {
    if (gameStarted === false) {
        gameStarted = true
        nextSequence()
    }
})

// Genrate random color pattern
gamePattern = []

buttonColors = ['red', 'blue', 'green', 'yellow']

function nextSequence() {
    randomNumber = Math.floor( Math.random() * 4 )
    userClickedPattern = []

    //change the level heading
    $('h1').text('Level ' + level)

    // record the random pattern
    randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    // animate button
    $('#' + randomChosenColor).fadeOut(80).fadeIn(80)
    playColorSound(randomChosenColor)
}

// store the user clicking pattern
userClickedPattern = []

$('.btn').click(function(event) {
    if (gameStarted === true) {
        //record user pattern
        userChosenColor = event.target.id
        userClickedPattern.push(userChosenColor)

        // animate button
        animatePress(userChosenColor)
        playColorSound(userChosenColor)
        
        // check user answer
        checkAnswer(userClickedPattern.length - 1)
    } else {
        gameOver()
    }
})

// check the user clicking pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
        gameOver()
    }

    if (currentLevel === level) {
        level++
        setTimeout(() => {
            nextSequence()
        }, 300);
    }
}

// control for game over
function gameOver () {
    gameStarted = false
    level = 0
    gamePattern = []
    userClickedPattern = []
    $('h1').text('Game Over. Press Any Key to Restart')
    $('body').addClass('game-over')
    wrongSound.play()
    setTimeout(() => {
        $('body').removeClass('game-over')
    }, 200)   
}