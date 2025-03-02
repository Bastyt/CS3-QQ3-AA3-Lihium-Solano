// Global Variables
var words = ["vixen", "bacon", "plane", "water", "stone", "candy", "tears", "flame", "paint", "white", "brown", "clamp", "brush", "liver", "mouse", "table", "wound", "night", "flute", "piano",  "lemon", "smirk", "pearl", "index", "leap", "light", "quilt", "sharp", "march", "jumpy", "quick", "viper", "heart", "break", "stare", "spike", "block", "spark", "chair", "rhyme", "tiger", "plant", "truck", "trace", "flush", "singh", "grape", "track"];
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


// Function to check letter input
function checkLetter() {
    if (health <= 0 || score === 5) return;

    var letter = prompt("Enter a letter:").toLowerCase();
    
    if (!letter || letter.length !== 1 || !/[a-z]/.test(letter)) {
        alert("Invalid input! Please enter a single letter.");
        return;
    }

    var secretWord = fetchWord(); // Fetch the word when needed

    if (secretWord.includes(letter)) {
        for (var i = 0; i < 5; i++) {
            if (secretWord[i] === letter && guessedWord[i] === "_") {
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
function askPlayAgain() {
    if (confirm("Do you want to play again?")) {
        location.reload(); // Reload the page to start a new game
    }
