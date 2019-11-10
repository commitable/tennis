'use strict';

class Game {

    constructor() {
        this._score = [0,0];
    }

    addPoint(playerIndex) {
        this.score[playerIndex] += 1;
    }

    get score() {
        return this._score;
    }
}

module.exports = {
    Game
};