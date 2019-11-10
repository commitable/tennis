'use strict';

const { Set } = require('./set');

class Match {

    constructor(player1, player2) {
        this.players = [player1, player2];
        this.sets = [new Set()];
    }

    pointWonBy(playerName) {

    }

}

module.exports = {
    Match
};