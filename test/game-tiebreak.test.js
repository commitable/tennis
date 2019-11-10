import test from 'ava';
const { GameTiebreak }  = require('../game-tiebreak');

test('Tiebreak game created successfully', async t => {
    const game = new GameTiebreak(['player 1', 'player 2']);
    t.true(game instanceof GameTiebreak);
});

test('GameTiebreak returns score', async t => {
    const game = new GameTiebreak(['player 1', 'player 2']);
    t.is(game.score, '0-0');
});

test('GameTiebreak scoring and score formatting works', async t => {
    const game = new GameTiebreak(['player 1', 'player 2']);
    game.addPoint(0);
    t.is(game.score, '1-0');
    game.addPoint(0);
    t.is(game.score, '2-0');
    game.addPoint(0);
    t.is(game.score, '3-0');
    game.addPoint(1);
    t.is(game.score, '3-1');
    game.addPoint(0);
    t.is(game.score, '4-1');
});

test('GameTiebreak winner is set correctly', async t => {
    const game = new GameTiebreak(['player 1', 'player 2']);

    for (let i = 0; i < 6; i++) {
        game.addPoint(0);
    }

    t.is(game.winner, null);

    game.addPoint(0);
    t.is(game.winner, 0);

    const game2 = new GameTiebreak(['player 1', 'player 2']);

    for (let i = 0; i < 6; i++) {
        game2.addPoint(0);
    }

    for (let i = 0; i < 6; i++) {
        game2.addPoint(1);
    }

    game2.addPoint(1);
    t.is(game2.winner, null);

    game2.addPoint(1);
    t.is(game2.winner, 1);

    t.throws(() => {
        game2.addPoint(1);
    }, Error);
});