'use strict';

const { Set } = require('./set');

class Match {
    constructor(player1, player2) {
        this.players = [player1, player2];
        this.sets = [new Set()];
    }

    pointWonBy(playerName) {
        this.sets[0].addPoint(this.players.indexOf(playerName));
    }

    score() {
        // As instructed only handling a single set
        return this.sets[0].score;
    }
}

module.exports = {
    Match
};