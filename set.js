'use strict';

const { Game } = require('./game');

class Set {

    constructor() {
        this.games = [new Game()];
        this._winner = null;
    }

    set winner(playerIndex) {
        this._winner = playerIndex;
    }

    get winner() {
        return this._winner;
    }

    addPoint(playerIndex) {
        if (this.winner) {
            throw new Error('Cannot add point, set has already concluded.');
        }

        const latestGame = this.games[this.games.length - 1];
        if (!latestGame.winner) {
            latestGame.addPoint(playerIndex);
        } else {
            const newGame = new Game();
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