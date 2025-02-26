// Global Variables
var words = ["apple", "table", "chair", "grape", "brush", "clock", "spine", "plant", "train", "lunch",
             "beach", "flute", "frame", "stone", "candy", "truck", "spoon", "baker", "flame", "juice",
             "bread", "cloud", "light", "flock", "music", "sword", "plane", "dress", "storm", "piano",
             "crane", "wheel", "brick", "shelf", "river", "flask", "globe", "spark", "match", "chess",
             "paper", "swing", "spike", "flock", "brick", "smoke", "grill", "pouch", "clock", "plant"];
var secretWord = ""; // The chosen word for this game
var guessedWord = ["_", "_", "_", "_", "_"]; // Displayed guessed letters
var health = 5; // Initial lives
var score = 0; // Correctly guessed letters

// Function to initialize the game
function setupGame() {
    secretWord = words[Math.floor(Math.random() * words.length)]; // Pick a random word
    document.getElementById("lives").innerText = health; // Display initial lives
    updateWordDisplay();
}

// Function to update displayed guessed word
function updateWordDisplay() {
    for (var i = 0; i < 5; i++) {
        document.getElementById("s-" + i).innerText = guessedWord[i];
    }
}

// Function to update hangman figure based on health
function updateHangman() {
    var parts = ["head", "arm-1", "arm-2", "torso", "foot-1", "foot-2"];
    var partToShow = parts[5 - health]; // Determine which part to show
    if (partToShow) {
        document.getElementById(partToShow).style.display = "block";
    }
}

// Function to check the guessed letter
function checkLetter() {
    if (score === 5 || health === 0) return; // Stop if already won or lost

    var userInput = prompt("Enter a letter:").toLowerCase();
    if (!userInput || userInput.length !== 1 || !/^[a-z]$/.test(userInput)) {
        alert("Please enter a single valid letter.");
        return;
    }

    var correctGuess = false;
    for (var i = 0; i < 5; i++) {
        if (secretWord[i] === userInput && guessedWord[i] === "_") {
            guessedWord[i] = userInput;
            correctGuess = true;
            score++;
        }
    }

    if (!correctGuess) {
        health--; // Lose a life
        updateHangman();
        document.getElementById("lives").innerText = health; // Update lives
    }

    updateWordDisplay();
    checkWinLose();
}

// Function to check win or lose conditions
function checkWinLose() {
    if (health === 0) {
        alert("You lost! The correct word was: " + secretWord);
        askPlayAgain();
    } else if (score === 5) {
        alert("Congratulations! You won!");
        askPlayAgain();
    }
}

// Function to ask the user to play again
function askPlayAgain() {
    if (confirm("Do you want to play again?")) {
        location.reload(); // Reload the page to start a new game
    }
}
