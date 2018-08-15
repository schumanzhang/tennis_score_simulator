let Set = require("../app/set"); 

describe("Set", () => {

    describe("starts a new set", () => {
        it("starts a new set with both player scores", () => {
            let set = new Set();

            expect(set._start).toBe(true);
            expect(set._winner).toBe(0);
            expect(set._playerOne).toBe(0);
            expect(set._playerTwo).toBe(0);
        });
    });

    describe("incrementScore", () => {
        it("increments score based on which player won the game", () => {
            let set = new Set();
            set.incrementScore(1);
            expect(set._playerOne).toBe(1);

            set.incrementScore(2);
            expect(set._playerTwo).toBe(1);
        });
    });

    describe("checkSetWon", () => {
        it("if either player leads by two games or more beyond 6 games then set is won", () => {
            let set = new Set();
            set._playerOne = 6;
            set._playerTwo = 2;
            set.checkSetWon();
            expect(set._start).toBe(false);
            expect(set._winner).toBe(1);

            set._playerOne = 5;
            set._playerTwo = 7;
            set.checkSetWon();
            expect(set._start).toBe(false);
            expect(set._winner).toBe(2);
        });
        it("if either player gets to 7 only one extra game is needed to win ", () => {
            let set = new Set();
            set._playerOne = 6;
            set._playerTwo = 7;
            set.checkSetWon();
            expect(set._start).toBe(false);
            expect(set._winner).toBe(2);
        });
        it("if neither player has reached 6 games ", () => {
            let set = new Set();
            set._playerOne = 4;
            set._playerTwo = 2;
            set.checkSetWon();
            expect(set._start).toBe(true);
            expect(set._winner).toBe(0);
        });
    });

    describe("printSetScore", () => {
        it("prints out the current set score ", () => {
            let set = new Set();
            set._playerOne = 5;
            set._playerTwo = 2;
            score = set.printSetScore();
            expect(score).toBe('5-2');
        });
    }); 
});