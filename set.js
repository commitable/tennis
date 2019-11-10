'use strict';

const { Game } = require('./game');
const { GameTiebreak } = require('./game-tiebreak');

class Set {
    constructor(players) {
        this.winner = null;
        this.players = players;
        this.games = [new Game(this.players)];
    }

    addPoint(playerIndex) {
        if (this.winner !== null) {
            throw new Error('Cannot add point, set has already concluded.');
        }

        const latestGame = this.games[this.games.length - 1];

        if (latestGame.winner === null) {
            latestGame.addPoint(playerIndex);

            if(latestGame.winner !== null) {
                const score = this.getFinishedGamesScore();

                if(score[0] === 7 || score[1] === 7 || ((score[0] === 6 || score[1] === 6) && Math.abs(score[0] - score[1]) >= 2)) {
                    this.winner = score.indexOf(Math.max(...score));
                }
            }
        } else {
            const score = this.getFinishedGamesScore();
            const newGame = (score[0] === 6 && score[1] === 6) ? new GameTiebreak(this.players) : new Game(this.players);
            newGame.addPoint(playerIndex);
            this.games.push(newGame);
        }
    }

    get score() {
        const setScore = this.getFinishedGamesScore();
        const latestGame = this.games[this.games.length - 1];
        return `${setScore[0]}-${setScore[1]}` + (latestGame.winner !== null ? '' : ', ' + latestGame.score);
    }

    getFinishedGamesScore() {
        const gamesWon = [0,0];

        for (const game of this.games) {
            if (game.winner !== null) {
                gamesWon[game.winner] += 1;
            }
        }

        return gamesWon;
    }
}

module.exports = {
    Set
};