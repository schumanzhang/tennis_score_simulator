let Match = require("../app/match");

describe("Match", () => {

    describe("starts a new match", () => {
        it("starts a new match with players and scores set up", () => {
            let match = new Match();

            expect(match._start).toBe(true);
            expect(match._winner).toBe(0);
            expect(match._toWin).toBe(1);
            expect(match._playerOneSets).toBe(0);
            expect(match._playerTwoSets).toBe(0);
            expect(match._history).toEqual([]);
        });
    });

    describe("pointWonBy", () => {
        it("continues the match by determining which player won the next point", () => {
            let match = new Match();

            spyOn(match._game, 'incrementScore');
            spyOn(match, 'checkMatchProgress');
            spyOn(match, 'checkWin');

            match.pointWonBy('Player 1');
            expect(match._game.incrementScore).toHaveBeenCalledWith('Player 1');
            expect(match.checkMatchProgress).toHaveBeenCalled();
            expect(match.checkWin).toHaveBeenCalled();
        });
    });

    describe("score", () => {
        it("shows the current match score", () => {
            let match = new Match();
            match.pointWonBy('Player 1');
            match.pointWonBy('Player 1');
            match.pointWonBy('Player 1');
            match.pointWonBy('Player 2');

            score = match.score();
            expect(score).toEqual('0-0 40-15');
        });
    });

    describe("checkMatchProgress", () => {
        it("if a player wins a game then update the set score", () => {
            let match = new Match();
            match._game._start = false;
            match._game._winner = 2;
            match._game._playerOne = 3;
            match._game._playerTwo = 5;
            spyOn(match._set, 'incrementScore');

            match.checkMatchProgress();

            expect(match._game._playerOne).toBe(0);
            expect(match._game._playerTwo).toBe(0);
            expect(match._set.incrementScore).toHaveBeenCalledWith(2);
        });
        it("if a player wins a set then update the match history", () => {
            let match = new Match();
            match._set._start = false;
            match._set._winner = 2;
            match._set._playerOne = 6;
            match._set._playerTwo = 7;

            match.checkMatchProgress();

            expect(match._history).toEqual(['6-7']);
            expect(match._playerTwoSets).toBe(1);
            expect(match._set._playerOne).toBe(0);
            expect(match._set._playerTwo).toBe(0);
        });
    });

    describe("checkWin", () => {
        it("check the winning condition of the match", () => {
            let match = new Match();
            match._playerOneSets = 1;
            match._playerTwoSets = 0;

            match.checkWin();
            expect(match._start).toBe(false);
            expect(match._winner).toBe(1);
        });
    });
});