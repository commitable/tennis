import test from 'ava';
const { Match }  = require('./match');
const { Set }  = require('./set');
const { Game }  = require('./game');
const { GameTiebreak}  = require('./game-tiebreak');

test('Match created successfully', async t => {
    const match = new Match('player 1', 'player 2');
    t.true(match instanceof Match);
});

test('Set created successfully', async t => {
    const set = new Set(['player 1', 'player 2']);
    t.true(set instanceof Set);
});

test('Game created successfully', async t => {
    const game = new Game(['player 1', 'player 2']);
    t.true(game instanceof Game);
});

test('Game returns score', async t => {
    const game = new Game(['player 1', 'player 2']);
    t.is(game.score, '0-0');
});

test('Game point adding updates score', async t => {
    const game = new Game(['player 1', 'player 2']);
    game.addPoint(0);
    t.is(game.score, '15-0');
    game.addPoint(0);
    t.is(game.score, '30-0');
    game.addPoint(0);
    t.is(game.score, '40-0');
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
});

test('Game winner correctly set', async t => {
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
    game.addPoint(0);
    t.is(game.winner, 0);

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

test('Tie-break game score formatting is correct', async t => {
    const game = new GameTiebreak(['player 1', 'player 2']);
    game.addPoint(0);
    game.addPoint(1);
    game.addPoint(1);
    t.is(game.score, '1-2');
});


test('Set score increment works', async t => {
    const set = new Set(['player 1', 'player 2']);
    set.addPoint(0);
    t.is(set.score, '0-0, 15-0');
    set.addPoint(0);
    t.is(set.score, '0-0, 30-0');
    set.addPoint(0);
    t.is(set.score, '0-0, 40-0');
    set.addPoint(0);
    t.is(set.score, '1-0');
});

test('Set win conditions work', async t => {
    const set = new Set(['player 1', 'player 2']);

    for (let i = 0; i < 24; i++) {
        set.addPoint(0);
    }

    t.is(set.score, '6-0');
    t.is(set.winner, 0);
});

test('Set tie break scores correctly', async t => {
    const set = new Set(['player 1', 'player 2']);

    for (let i = 0; i < 5; i++) {
        for (let i = 0; i < 4; i++) {
            set.addPoint(0);
        }
    }

    for (let i = 0; i < 5; i++) {
        for (let i = 0; i < 4; i++) {
            set.addPoint(1);
        }
    }

    t.is(set.score, '5-5');

    for (let i = 0; i < 4; i++) {
        set.addPoint(0);
    }

    for (let i = 0; i < 4; i++) {
        set.addPoint(1);
    }

    t.is(set.score, '6-6');

    for (let i = 0; i < 6; i++) {
        set.addPoint(0);
    }

    t.is(set.score, '6-6, 6-0');
    t.is(set.winner, null);

    set.addPoint(0);

    t.is(set.score, '7-6');
    t.is(set.winner, 0);
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