"use strict";

var Hangman = {
    words:            ["pluto", "mickey", "minnie", "donald", "daisy", "stitch", "monorail", "soarin", "magic"], // Set of words for hangman to choose from
    currentWord:      '', // Current word for the game
    correctGuesses:   [], // Correct letters the user has guesses
    incorrectGuesses: [], // Wrong letters the user has guessed
    maxGuesses:        6, // Maximum number of wrong guesses the user is allowed

    /**
     * Do all the initial game setup, register any necessary event listeners.
     * This method should only be run once.
     */
    init: function() {
        console.log("init");
        $('#start').click(function() {
            Hangman.gameStart();
        });
        $("body").keypress(function(event) {
            Hangman.keyPressHandler(event);
        });
        
    },

    /**
     * Start a new game. Should be used whenever a new hangman game is begun.
     */
    gameStart: function() {
        console.log("gameStart");
        $("#gameboard").append("<div id='pixHolder'>" + "<img id='hangman' src = '/img/hangman.png'>" + "</div>");
        $("#gameboard").append("<div id='wordHolder'>" + "</div>");   
        // $("#gameboard").append("<img id='hangman' src = '/img/hangman.png'>");
        $("#gameboard").append("<div id='guesses'>" + "Previous guesses: " + "</div>");
        this.pickWord();
    },

    /**
     * Pick a new random word and assign it to the currentWord property
     */
    pickWord: function() {
        console.log("pickWord");
        var arrayLength = this.words.length;
        console.log(arrayLength);
        var index = this.getRandomInt(0, arrayLength-1);
        this.currentWord = this.words[index];
        this.currentWord = this.currentWord.toLowerCase(); //using this bc all is in obje
        console.log("The selected word is " + this.currentWord);
        var numberOfTiles = this.currentWord.length;
        console.log("The word length is " + numberOfTiles);
        for( var i=0; i<numberOfTiles; i++) {       
        $('#wordHolder').append("<div class='tile'></div>");
        }    
    },

    /**
     * The game has finished. Use this method at the end of the game if necessary
     * to remove things like event listeners or display a "New Game" button.
     */
    gameEnd: function() {
        $('#end').click(function() {
            alert('What?! You Quit? I am disappointed. You can try again, click Start')
        });
        $('#gameboard').empty();
        $('#letterBank').empty();
    },

    /**
     * Event handler for when a keyboard key is pressed.
     *
     * @param Event event - JavaScript event object
     */
    keyPressHandler: function(event) {
        console.log("keyPressHandler");
        console.log(event.keyCode);
        if(this.incorrectGuesses.length >= this.maxGuesses) {
            alert("You've lost");
        }
        var letter = String.fromCharCode(event.keyCode);
        letter = letter.toLowerCase();
        console.log(letter);
        if(this.hasLetterBeenGuessed(letter)) {
            alert("That letter has already been guessed");
        }
        if (this.isLetterInWord(letter)) {
            this.addCorrectGuess(letter);
            this.findLetterInWord(letter);
        } else {
            this.addIncorrectGuess(letter);
            $("#guesses").append(letter + " ");
            var position = (Hangman.incorrectGuesses.length * -75) + "px";
            $('#hangman').css('left', position);
        }

    },

    /**
     * Random number generator, should return an integer between min and max.
     *
     * @param integer min
     * @param integer max
     *
     * @return integer
     */
    getRandomInt: function(min, max) {
        console.log('getRandomInt');
        return Math.floor(Math.random() * (max-min+1)) + min;

    },

    /**
     * Check if the user has guessed a given letter before (either right or wrong).
     *
     * @param string letter - Letter the user typed
     *
     * @return boolean
     */
    hasLetterBeenGuessed: function(letter) {
        console.log("hasLetterBeenGuessed");
        var combinedArray = this.correctGuesses.concat(this.inCorrectGuesses);
        if(combinedArray.indexOf(letter) >= 0) {
            return true;
            console.log("true");
        } else {
            return false;
        }
    },

    /**
     * Return whether or not a letter is in the current word.
     *
     * @param string letter - Letter the user typed
     *
     * @return boolean
     */
    isLetterInWord: function(letter) {
        console.log("isLetterInWord");
        console.log(this.currentWord.indexOf(letter));
        var isLetterInt = this.currentWord.indexOf(letter);
       if(isLetterInt >= 0) {
            return true
       } else {
            return false;
       }
    },

    /**
     * Return the indexes where a given letter occurs in the current word
     * For example, if the word is "banana", and the letter passed was "a"
     * then this function should return [1, 3, 5]. If the letter passed was
     * "b" then the function should return [0]. If the letter was "q" then
     * it should return [].
     *
     * @param string letter - Letter the user typed
     *
     * @return array - Array of indexes in the word
     */
    findLetterInWord: function(letter) {
        console.log("findLetterInWord");
        var result = [];
        var wordArray = this.currentWord.split("");
        console.log(wordArray);
        wordArray.forEach(function(lchar, index) {
            if(lchar == letter) {
                result.push(index);
                $('.tile').eq(result).html(letter); //may need to moved to addCorrectGuess
            }
        });
        console.log(result);
        return result;
    },

    /**
     * Add a letter to the array of correct guesses and handle any additional steps
     *
     * @param string letter - Letter the user typed
     */
    addCorrectGuess: function(letter) {
        this.correctGuesses.push(letter);
        console.log("addCorrectGuess");

    },

    /**
     * Add a letter to the array of incorrect guesses and handle any additional steps
     *
     * @param string letter - Letter the user typed
     */
    addIncorrectGuess: function(letter) {
        this.incorrectGuesses.push(letter);
        console.log("InCorrectGuess");
    },

    /**
     * Check whether all the letters in the word have been guessed
     *
     * @return boolean
     */
    isGameWon: function() {

    }
};

Hangman.init();
// var keypressed
