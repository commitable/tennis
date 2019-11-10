'use strict';

class Game {
    constructor(players) {
        this.players = players;
        this._score = [0,0];
        this._winner = null;
    }

    addPoint(playerIndex) {
        if (this.winner) {
            throw new Error('Cannot add point, game has already concluded.');
        }

        this._score[playerIndex] += 1;
        this.updateState();
    }

    updateState() {
        if (Math.abs(this._score[0] - this._score[1]) >= 2 && (this._score[0] >= 4 || this._score[1] >= 4)) {
            this.winner = this.getLeadingPlayerIndex();
        }
    }

    get score() {
        if (this.winner !== null) {
            return '';
        } else if (this._score[0] >= 3 && this._score[1] >= 3) {
            if(this._score[0] === this._score[1]) {
                return 'Deuce';
            } else {
                return `Advantage ${this.players[this.getLeadingPlayerIndex()]}`;
            }
        }

        return `${this.convertPoints(this._score[0])}-${this.convertPoints(this._score[1])}`;
    }

    convertPoints(points) {
        switch(points) {
            case 0:
                return '0';
            case 1:
                return '15';
            case 2:
                return '30';
            case 3:
                return '40';
        }
    }

    getLeadingPlayerIndex() {
        return this._score.indexOf(Math.max(...this._score));
    }

    set winner(playerIndex) {
        this._winner = playerIndex;
    }

    get winner() {
        return this._winner;
    }
}

module.exports = {
    Game
};