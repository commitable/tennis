import test from 'ava';
const { Match }  = require('./match');

test('Match created successfully', async t => {
    const match = new Match('player 1', 'player 2');
    t.true(match instanceof Match);
});