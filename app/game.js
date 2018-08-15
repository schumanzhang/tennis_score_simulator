class Game {
    constructor(tiebreak) {
        this._start = true;
        this._winner = 0;
        this._playerOne = 0;
        this._playerTwo = 0;
        this._gameScores = ['0', '15', '30', '40'];
        this._tiebreaker = tiebreak;
    }

    incrementScore(player) {
        (player === 'Player 1') ? this._playerOne++ : this._playerTwo++;
        (this._tiebreaker) ? this.checkTiebreakWon() : this.checkGameWon();
    }

    checkGameWon() {
        if ((this._playerOne >= 4 || this._playerTwo >= 4) && Math.abs(this._playerOne - this._playerTwo) >= 2) {
            this._start = false;
            this._winner = (this._playerOne > this._playerTwo) ? 1 : 2;
        }
    }

    checkTiebreakWon() {
        if ((this._playerOne >= 7 || this._playerTwo >= 7) && Math.abs(this._playerOne - this._playerTwo) >= 2) {
            this._start = false;
            this._winner = (this._playerOne > this._playerTwo) ? 1 : 2;
        }
    }

    printGameScore() {
        if (!this._tiebreaker) {
            if (this._playerOne >= 3 && this._playerTwo >= 3) {
                return (this._playerOne === this._playerTwo) ? 'Deuce' : 'ADV ' + (this._playerOne > this._playerTwo ? 'Player 1': 'Player 2');
            } else {
                return this._gameScores[this._playerOne] + '-' + this._gameScores[this._playerTwo];
            }
        } else {
            return 'Tie-break ' + this._playerOne.toString() + '-' + this._playerTwo.toString();
        }
    }

}

module.exports = Game;