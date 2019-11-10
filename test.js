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
    t.deepEqual(game.score, [0,0]);
});

test('Game point adding updates score', async t => {
    const game = new Game();
    game.addPoint(0);
    t.deepEqual(game.score, [1,0]);
});