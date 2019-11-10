'use strict';

import test from 'ava';
const { Match }  = require('../match');

test('Match created successfully', async t => {
    const match = new Match('player 1', 'player 2');
    t.true(match instanceof Match);
});

test('Match returns correct score', async t => {
    const match = new Match('player 1', 'player 2');

    match.pointWonBy('player 1');
    match.pointWonBy('player 2');

    t.is(match.score(), '0-0, 15-15');

    match.pointWonBy('player 1');
    match.pointWonBy('player 1');

    t.is(match.score(), '0-0, 40-15');

    match.pointWonBy('player 2');
    match.pointWonBy('player 2');

    t.is(match.score(), '0-0, Deuce');

    match.pointWonBy('player 1');

    t.is(match.score(), '0-0, Advantage player 1');

    match.pointWonBy('player 1');

    t.is(match.score(), '1-0');
});