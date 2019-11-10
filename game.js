'use strict';

class Game {

    constructor() {
        this._score = [0,0];
    }

    addPoint(playerIndex) {
        this._score[playerIndex] += 1;
    }

    formatPoints(points) {
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
        if (this._score[0] >= 3 && this._score[1] >= 3) {
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
}

module.exports = {
    Game
};