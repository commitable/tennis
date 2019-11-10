'use strict';

class Game {

    constructor(type = 'standard') {
        this._score = [0,0];
        this._winner = null;
        this._type = type;
    }

    addPoint(playerIndex) {

        if (this.winner) {
            throw new Error('Cannot add point, game has already concluded.');
        }

        this._score[playerIndex] += 1;

        // Game winning conditions
        if (this._score[0] >= 3 && this._score[1] >= 3 && Math.abs(this._score[0] - this._score[1]) >= 2) {
            this.winner = this._score.indexOf(Math.max(...this._score));
        } else if (this._score[0] >= 4 && this._score[1] < 3 || this._score[1] >= 4 && this._score[0] < 3) {
            this.winner = this._score.indexOf(Math.max(...this._score));
        }
    }

    formatPoints(points) {
        if (this._type === 'tie-break') {
            return points;
        }

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

    get score() {
        if (this.winner !== null) {
            return '';
        } else if (this._score[0] >= 3 && this._score[1] >= 3) {
            if(this._score[0] === this._score[1]) {
                return 'Deuce';
            } else if (this._score[0] > this._score[1]) {
                return 'Advantage Player 1';
            } else if (this._score[1] > this._score[0]) {
                return 'Advantage Player 2';
            }
        }

        return `${this.formatPoints(this._score[0])}-${this.formatPoints(this._score[1])}`;
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