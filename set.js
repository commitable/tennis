'use strict';

const { Game } = require('./game');

class Set {

    constructor() {
        this.games = [new Game()];
    }

}

module.exports = {
    Set
};