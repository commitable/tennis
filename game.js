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
        return `${this.formatPoints(this._score[0])}-${this.formatPoints(this._score[1])}`;
    }
}

module.exports = {
    Game
};