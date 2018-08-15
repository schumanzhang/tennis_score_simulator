let Set = require('./set');
let Game = require('./game');

class Match {
    // toWin set to 1, can be extended to multiple sets
    constructor() {
        this._start = true;
        this._winner = 0;
        this._toWin = 1;
        this._playerOneSets = 0;
        this._playerTwoSets = 0;
        this._history = [];
        this._game = new Game(false);
        this._set = new Set();
    }

    pointWonBy(player) {
        if (this._start) {
            this._game.incrementScore(player);
            this.checkMatchProgress();
            this.checkWin();
        }
    }

    score() {
        let history = this._history.join(', ');
        return (this._history.length > 0) ? history + ' ' + this._set.printSetScore() + ' ' + this._game.printGameScore() : this._set.printSetScore() + ' ' + this._game.printGameScore();
    }

    // check match pregress - whether to reset current set or game
    checkMatchProgress() {
        if (!this._game.start && this._game._winner !== 0) {
            this._set.incrementScore(this._game._winner);
            this._game = (this._set._playerOne === 6 && this._set._playerTwo === 6) ? new Game(true) : new Game(false);
        } 
        if (!this._set.start && this._set._winner !== 0) {
            this._history.push(this._set.printSetScore());
            (this._set._winner === 1) ? this._playerOneSets++ : this._playerTwoSets++;
            this._set = new Set();
        }
    }

    // check the winning condition
    checkWin() {
        if (this._playerOneSets || this._playerTwoSets === this._toWin) {
            this._start = false;
            this._winner = (this._playerOneSets > this._playerTwoSets) ? 1 : 2;
            return true;
        }
        return false;
    }
}

module.exports = Match;