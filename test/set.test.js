import test from 'ava';
const { Set }  = require('../set');

test('Set created successfully', async t => {
    const set = new Set(['player 1', 'player 2']);
    t.true(set instanceof Set);
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

test('Set standard scoring and win conditions work', async t => {
    const set = new Set(['player 1', 'player 2']);

    for (let i = 0; i < 24; i++) {
        set.addPoint(0);
    }

    t.is(set.score, '6-0');
    t.is(set.winner, 0);

    const set2 = new Set(['player 1', 'player 2']);

    for (let i = 0; i < 20; i++) {
        set2.addPoint(0);
    }
    for (let i = 0; i < 20; i++) {
        set2.addPoint(1);
    }

    t.is(set2.score, '5-5');

    for (let i = 0; i < 4; i++) {
        set2.addPoint(1);
    }

    t.is(set2.score, '5-6');
    t.is(set2.winner, null);

    for (let i = 0; i < 4; i++) {
        set2.addPoint(1);
    }

    t.is(set2.score, '5-7');
    t.is(set2.winner, 1);
});

test('Set tie break scoring and win conditions work', async t => {
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