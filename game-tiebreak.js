'use strict';

const { Game } = require('./game');

class GameTiebreak extends Game {
    constructor(players) {
        super(players);
    }

    updateState() {
        if ((this._score[0] >= 7 || this._score[1] >= 7) && Math.abs(this._score[0] - this._score[1]) >= 2) {
            this.winner = this.getLeadingPlayerIndex();
        }
    }

    get score() {
        return `${this._score[0]}-${this._score[1]}`;
    }
}

module.exports = {
    GameTiebreak
};