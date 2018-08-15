class Set {
    constructor() {
        this._start = true;
        this._winner = 0;
        this._playerOne = 0;
        this._playerTwo = 0;
    }

    incrementScore(player) {
        (player === 1) ? this._playerOne++ : this._playerTwo++;
        this.checkSetWon();
    }

    checkSetWon() {
        let condition1 = (this._playerOne >= 6 || this._playerTwo >= 6) && Math.abs(this._playerOne - this._playerTwo) >= 2;
        let condition2 = (this._playerOne === 7 || this._playerTwo === 7) && Math.abs(this._playerOne - this._playerTwo) === 1;
        if (condition1 || condition2) {
            this._start = false;
            this._winner = (this._playerOne > this._playerTwo) ? 1 : 2;
        }
    }

    printSetScore() {
        return this._playerOne.toString() + '-' + this._playerTwo.toString();
    }

}

module.exports = Set;