let Match = require('./app/match'); 

function runMatch() {
    let match = new Match();

    startMatch = setInterval(function() {
        if (!match.checkWin()) {
            let players = ['Player 1', 'Player 2'];
            match.pointWonBy(players[Math.floor(Math.random() * players.length)]);
            score = match.score();
            console.log(score);
        } else {
            console.log('Game, set and match Player ' + match._winner.toString());
            clearInterval(startMatch);
        }
    }, 500);
}

runMatch();