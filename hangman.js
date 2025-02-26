// Global Variables
var words = ["brick", "plant", "sword", "charm", "flint", "grove", "haste", "jumpy", "kneel", "latch",
             "mirth", "noble", "ocean", "prism", "quilt", "raven", "stork", "truce", "upend", "vexed",
             "whisk", "xenon", "yacht", "zesty", "amber", "blaze", "crisp", "dwarf", "ember", "frost",
             "glide", "hover", "ivory", "jolly", "koala", "lunar", "mango", "nylon", "optic", "pearl",
             "quirk", "roast", "swoop", "tidal", "umbra", "vowel", "wrist", "xylol", "yeast", "zebra"];
var selectedWord = "";
var guessedWord = ["_", "_", "_", "_", "_"];
var health = 5;
var score = 0;

// Function to initialize the game
function setupGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = ["_", "_", "_", "_", "_"];
    health = 5;
    score = 0;

    document.getElementById("lives").innerText = health;
    updateWordDisplay();
    resetHangman();
}

// Function to update the displayed word
function updateWordDisplay() {
    for (var i = 0; i < 5; i++) {
        document.getElementById(`s-${i}`).innerText = guessedWord[i];
    }
}

// Function to reset hangman drawing
function resetHangman() {
    document.getElementById("head").style.display = "none";
    document.getElementById("arm-1").style.display = "none";
    document.getElementById("arm-2").style.display = "none";
    document.getElementById("torso").style.display = "none";
    document.getElementById("foot-1").style.display = "none";
    document.getElementById("foot-2").style.display = "none";
}

// Function to update hangman drawing based on health
function updateHangman() {
    if (health === 4) document.getElementById("head").style.display = "block";
    if (health === 3) document.getElementById("arm-1").style.display = "block";
    if (health === 2) document.getElementById("arm-2").style.display = "block";
    if (health === 1) document.getElementById("torso").style.display = "block";
    if (health === 0) {
        document.getElementById("foot-1").style.display = "block";
        document.getElementById("foot-2").style.display = "block";
        alert("Game Over! The word was: " + selectedWord);
        health = -1;
    }
}

// Function to check letter input
function checkLetter() {
    if (health <= 0 || score === 5) return;

    var letter = prompt("Enter a letter:").toLowerCase();
    
    if (!letter || letter.length !== 1 || !/[a-z]/.test(letter)) {
        alert("Invalid input! Please enter a single letter.");
        return;
    }

    if (selectedWord.includes(letter)) {
        for (var i = 0; i < 5; i++) {
            if (selectedWord[i] === letter && guessedWord[i] === "_") {
                guessedWord[i] = letter;
                score++;
            }
        }
    } else {
        health--;
        updateHangman();
    }

    document.getElementById("lives").innerText = health;
    updateWordDisplay();

    if (score === 5) {
        alert("Congratulations! You won!");
    }
}
