import test from 'ava';
const { Match }  = require('./match');
const { Set }  = require('./set');
const { Game }  = require('./game');

test('Match created successfully', async t => {
    const match = new Match('player 1', 'player 2');
    t.true(match instanceof Match);
});

test('Set created successfully', async t => {
    const set = new Set();
    t.true(set instanceof Set);
});

test('Game created successfully', async t => {
    const game = new Game();
    t.true(game instanceof Game);
});

test('Game returns score', async t => {
    const game = new Game();
    t.is(game.score, '0-0');
});

test('Game point adding updates score', async t => {
    const game = new Game();
    game.addPoint(0);
    t.is(game.score, '15-0');
    game.addPoint(0);
    t.is(game.score, '30-0');
    game.addPoint(0);
    t.is(game.score, '40-0');
});

test('Game point special conditions return correctly', async t => {
    const game = new Game();
    game.addPoint(0);
    game.addPoint(0);
    game.addPoint(0);
    game.addPoint(1);
    game.addPoint(1);
    game.addPoint(1);
    t.is(game.score, 'Deuce');
    game.addPoint(0);
    t.is(game.score, 'Advantage Player 1');
    game.addPoint(1);
    t.is(game.score, 'Deuce');
    game.addPoint(1);
    t.is(game.score, 'Advantage Player 2');
});

test('Game winner correctly set', async t => {
    const game = new Game();
    game.addPoint(0);
    game.addPoint(0);
    game.addPoint(0);
    game.addPoint(1);
    game.addPoint(1);
    game.addPoint(1);
    t.is(game.score, 'Deuce');
    game.addPoint(0);
    t.is(game.score, 'Advantage Player 1');
    game.addPoint(0);
    t.is(game.winner, 0);

    const game2 = new Game();
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
    const game = new Game('tie-break');
    game.addPoint(0);
    game.addPoint(1);
    game.addPoint(1);
    t.is(game.score, '1-2');
});


test('Set score increment works', async t => {
    const set = new Set();
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
    const set = new Set();
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);
    set.addPoint(0);

    t.is(set.score, '6-0');
    t.is(set.winner, 0);
});