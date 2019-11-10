'use strict';

import test from 'ava';
const { Game }  = require('../game');

test('Game created successfully', async t => {
    const game = new Game(['player 1', 'player 2']);
    t.true(game instanceof Game);
});

test('Game returns score', async t => {
    const game = new Game(['player 1', 'player 2']);
    t.is(game.score, '0-0');
});

test('Game scoring and score formatting works', async t => {
    const game = new Game(['player 1', 'player 2']);
    game.addPoint(0);
    t.is(game.score, '15-0');
    game.addPoint(0);
    t.is(game.score, '30-0');
    game.addPoint(0);
    t.is(game.score, '40-0');
    game.addPoint(0);
    t.is(game.score, '');
});

test('Game point special conditions return correctly', async t => {
    const game = new Game(['player 1', 'player 2']);
    game.addPoint(0);
    game.addPoint(0);
    game.addPoint(0);
    game.addPoint(1);
    game.addPoint(1);
    game.addPoint(1);
    t.is(game.score, 'Deuce');
    game.addPoint(0);
    t.is(game.score, 'Advantage player 1');
    game.addPoint(1);
    t.is(game.score, 'Deuce');
    game.addPoint(1);
    t.is(game.score, 'Advantage player 2');
    game.addPoint(1);
    t.is(game.winner, 1);

    const game2 = new Game(['player 1', 'player 2']);
    game2.addPoint(1);
    game2.addPoint(1);
    game2.addPoint(1);
    game2.addPoint(1);
    t.is(game2.winner, 1);

    t.throws(() => {
        game2.addPoint(1);
    }, Error);
});