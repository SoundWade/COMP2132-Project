const numberOfImages = 6;
const diceImages = [];

// array of dice pics
for (let i = 1; i <= numberOfImages; i++) {
    diceImages.push(`dice-${i}.jpg`);
}

let player1Score = 0;
let player2Score = 0;
let currentRound = 1;
let player1AccumulatedScore = 0;
let player2AccumulatedScore = 0;
window.onload = function () {

// display dice6 on page start
document.getElementById("player1-dice").src = `IMG/${diceImages[5]}`;
document.getElementById("player2-dice").src = `IMG/${diceImages[5]}`;

// Show the reset button after the first round
if (currentRound === 2) {
    document.getElementById("reset-button").style.display = "block";
}
}
function rollDice() {
    const player1Dice = document.getElementById("player1-dice");
    const player2Dice = document.getElementById("player2-dice");

    // Simulate dice rolls for player 1
    const player1Roll1 = Math.floor(Math.random() * 6) + 1;
    const player1Roll2 = Math.floor(Math.random() * 6) + 1;

    // Display first dice image for player 1
    player1Dice.src = `IMG/${diceImages[player1Roll1 - 1]}`;

    setTimeout(() => {
        // Display second dice image for player 1 after a delay
        player1Dice.src = `IMG/${diceImages[player1Roll2 - 1]}`;

        // Check if either die is a 1 for player 1
        if (player1Roll1 === 1 || player1Roll2 === 1) {
            player1Score = 0;
        } else if (player1Roll1 === player1Roll2) {
            // If both dice are the same, double the score
            player1Score = (player1Roll1 + player1Roll2) * 2;
        } else {
            // Calculate the score for player 1 as the sum of the two dice rolls
            player1Score = player1Roll1 + player1Roll2;
        }

        // Display player 1 score
        document.getElementById("player1-score").textContent = player1Score;

        // Automate the roll for Player 2 
        setTimeout(() => {
            // Simulate dice rolls for player 2
            const player2Roll1 = Math.floor(Math.random() * 6) + 1;
            const player2Roll2 = Math.floor(Math.random() * 6) + 1;

            // Display first dice image for player 2
            player2Dice.src = `IMG/${diceImages[player2Roll1 - 1]}`;

            setTimeout(() => {
                // Display second dice image for player 2 after a delay
                player2Dice.src = `IMG/${diceImages[player2Roll2 - 1]}`;

                // Check if either die is a 1 for player 2
                if (player2Roll1 === 1 || player2Roll2 === 1) {
                    player2Score = 0;
                } else if (player2Roll1 === player2Roll2) {
                    // If both dice are the same, double the score
                    player2Score = (player2Roll1 + player2Roll2) * 2;
                } else {
                    // Calculate the score for player 2 as the sum of the two dice rolls
                    player2Score = player2Roll1 + player2Roll2;
                }

                // Display player 2 score
                document.getElementById("player2-score").textContent = player2Score;

                // Accumulate scores
                player1AccumulatedScore += player1Score;
                player2AccumulatedScore += player2Score;

                // Display accumulated scores
                document.getElementById("player1-accumulated-score").textContent = player1AccumulatedScore;
                document.getElementById("player2-accumulated-score").textContent = player2AccumulatedScore;

                // Check if three rounds are over
                if (currentRound === 3) {
                    // the winner is!
                    if (player1AccumulatedScore > player2AccumulatedScore) {
                        document.getElementById("winner").textContent = "Player 1 Wins!";
                    } else if (player2AccumulatedScore > player1AccumulatedScore) {
                        document.getElementById("winner").textContent = "Player 2 Wins!";
                    } else {
                        document.getElementById("winner").textContent = "It's a Tie!";
                    }

                    // Show the reset button
                    document.getElementById("reset-button").style.display = "block";

                    // Disable the roll dice button
                    document.querySelector("button").disabled = true;
                } else {
                    
                    currentRound++;
                    document.getElementById("round").textContent = currentRound;
                }
            }, 200); 

        }, 500); 
    }, 500); 
}

function isPair(roll1, roll2) {
    // Check if the dice rolls form a pair
    return roll1 === roll2;
}


function resetGame() {
    // Reset variables
    player1Score = 0;
    player2Score = 0;
    currentRound = 1;
    player1RoundScore = 0;
    player2RoundScore = 0;
    player1AccumulatedScore = 0;
    player2AccumulatedScore = 0;

    // Reset display
    document.getElementById("player1-score").textContent = player1Score;
    document.getElementById("player2-score").textContent = player2Score;
    document.getElementById("round").textContent = currentRound;
    document.getElementById("winner").textContent = "";

    // Reset dice images to random images
    document.getElementById("player1-dice").src = getRandomDiceImage();
    document.getElementById("player2-dice").src = getRandomDiceImage();

    // Hide the reset button
    document.getElementById("reset-button").style.display = "none";

    // Enable the roll dice button
    document.querySelector("button").disabled = false;

    // Reset accumulated scores display
    document.getElementById("player1-accumulated-score").textContent = player1AccumulatedScore;
    document.getElementById("player2-accumulated-score").textContent = player2AccumulatedScore;

    const resetButton = document.getElementById("reset-button");

    // Adjust the size by changing the style properties
    resetButton.style.width = "150px"; 
    resetButton.style.height = "50px"; 
    resetButton.style.display = "block"; 
    resetButton.style.marginLeft = "auto"; 
    resetButton.style.marginRight = "auto";

}

function getRandomDiceImage() {
    // restart with random dice
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return `IMG/dice-${randomNumber}.jpg`;
}