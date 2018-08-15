let Game = require("../app/game");

describe("Game", () => {
    describe("starts a new game", () => {
        it("starts a new game with both player scores", () => {

            let game = new Game(false);

            expect(game._start).toBe(true);
            expect(game._winner).toBe(0);
            expect(game._playerOne).toBe(0);
            expect(game._playerTwo).toBe(0);
            expect(game._gameScores).toEqual(['0', '15', '30', '40']);
            expect(game._tiebreaker).toBe(false);
        });
    });

    describe("incrementScore", () => {
        it("increments score based on which player won point", () => {
            let game = new Game(false);
            game.incrementScore('Player 1');
            expect(game._playerOne).toBe(1);
        });
    });

    describe("checkGameWon", () => {
        it("if any player score is greater than 4 and two more than opponent", () => {
            let game = new Game(false);

            game._playerOne = 4;
            game._playerTwo = 1;
            game.checkGameWon();
            expect(game._start).toBe(false);
            expect(game._winner).toBe(1);

            game._playerOne = 10;
            game._playerTwo = 12;
            game.checkGameWon();
            expect(game._start).toBe(false);
            expect(game._winner).toBe(2);
        });
        it("if neither player not winning by more than 2 points or below 4 points", () => {
            let game = new Game(false);

            game._playerOne = 7;
            game._playerTwo = 6;
            game.checkGameWon();
            expect(game._start).toBe(true);
            expect(game._winner).toBe(0);

            game._playerOne = 3;
            game._playerTwo = 1;
            game.checkGameWon();
            expect(game._start).toBe(true);
            expect(game._winner).toBe(0);

            game._playerOne = 3;
            game._playerTwo = 0;
            game.checkGameWon();
            expect(game._start).toBe(true);
            expect(game._winner).toBe(0);
        });
    });

    describe("checkTiebreakWon", () => {
        it("if tiebreaker winning score is changed to 7", () => {
            let game = new Game(true);

            game._playerOne = 6;
            game._playerTwo = 4;
            game.checkTiebreakWon();
            expect(game._start).toBe(true);
            expect(game._winner).toBe(0);

            game._playerOne = 5;
            game._playerTwo = 7;
            game.checkTiebreakWon();
            expect(game._start).toBe(false);
            expect(game._winner).toBe(2);
        });
    });

    describe("printGameScore", () => {
        it("if score less than 4 we give numbered score", () => {
            let game = new Game(false);

            game._playerOne = 3;
            game._playerTwo = 2;
            score = game.printGameScore();
            expect(score).toBe('40-30');
        });
        it("if score more than 4 use advantage scoring", () => {
            let game = new Game(false);

            game._playerOne = 7;
            game._playerTwo = 5;
            score = game.printGameScore();
            expect(score).toBe('ADV Player 1');
        });
        it("if score equal and more than 3-3 than we say deuce", () => {
            let game = new Game(false);

            game._playerOne = 7;
            game._playerTwo = 7;
            score = game.printGameScore();
            expect(score).toBe('Deuce');
        });
        it("if tiebreaker we don't use advantage scoring", () => {
            let game = new Game(true);
            
            game._playerOne = 10;
            game._playerTwo = 9;
            score = game.printGameScore();
            expect(score).toBe('Tie-break 10-9');
        });
    });
});