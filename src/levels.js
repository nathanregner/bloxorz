const _ = null;
const E = 'goal';
const T = 'tile';
const D = 'dropable';
const B = 'button';
const O = 'one time use';
const W = 'cannot stand on';

//capability of 2 buttons
const B1 = 'button 1';
const B2 = 'button 2';
const D1 = 'dropable 1';
const D2 = 'dropable 2';

// TODO: Better level format?
export const L1 = {
  tiles: [
    [T, T, T, _, _, _, _, _, _, _, _],
    [T, T, T, T, T, T, _, _, _, _, _],
    [T, T, T, T, T, T, T, T, T, _, _],
    [_, T, T, T, T, T, T, T, T, T, _],
    [_, _, _, _, _, _, T, T, E, T, T],
    [_, _, _, _, _, _, _, T, T, T, _]
  ],
  start: { x: 1, z: 1 }
};

export const L2 = {
  tiles: [
    [_, _, _, O, O, O, O, O, O, O, _, _, _, _],
    [_, _, _, O, O, O, O, O, O, O, _, _, _, _],
    [T, T, T, T, _, _, _, _, _, T, T, T, _, _],
    [T, T, T, _, _, _, _, _, _, _, T, T, _, _],
    [T, T, T, _, _, _, _, _, _, _, T, T, _, _],
    [T, T, T, _, _, T, T, T, T, O, O, O, O, O],
    [T, T, T, _, _, T, T, T, T, O, O, O, O, O],
    [_, _, _, _, _, T, E, T, _, _, O, O, T, O],
    [_, _, _, _, _, T, T, T, _, _, O, O, O, O],
  ],
  start: { x: 0, z: 5 }
};

export const L3 = {
  tiles: [
    [_, _, _, _, _, T, T, T, T, T, T, _, _, _, _],
    [_, _, _, _, _, T, _, _, T, T, T, _, _, _, _],
    [_, _, _, _, _, T, _, _, T, T, T, T, T, _, _],
    [T, T, T, T, T, T, _, _, _, _, _, T, T, T, T],
    [_, _, _, _, T, T, T, _, _, _, _, T, T, E, T],
    [_, _, _, _, T, T, T, _, _, _, _, _, T, T, T],
    [_, _, _, _, _, _, T, _, _, T, T, _, _, _, _],
    [_, _, _, _, _, _, T, T, T, T, T, _, _, _, _],
    [_, _, _, _, _, _, T, T, T, T, T, _, _, _, _],
    [_, _, _, _, _, _, _, T, T, T, _, _, _, _, _],
  ],
  start: { x: 0, z: 3 }
};

export const L4 = {
  tiles: [
    [_, _, _, _, _, _, _, _, T, T, T, T, _, _, _],
    [_, _, _, _, _, _, _, _, T, T, T, T, _, _, _],
    [T, T, T, _, _, _, _, _, T, _, _, T, T, T, T],
    [T, T, T, T, T, T, T, T, T, _, _, _, T, E, T],
    [T, T, T, _, _, _, _, T, T, B, _, _, T, T, T],
    [T, T, T, _, _, _, _, T, T, T, _, _, T, T, T],
    [_, T, T, D, _, _, _, T, _, _, _, _, _, _, _],
    [_, _, T, T, T, T, T, T, _, _, _, _, _, _, _],
  ],
  start: { x: 1, z: 3 }
};

export const L5 = {
  tiles: [
    [T, T, T, W, T, T, T, T, W, T, T, T, T, _],
    [T, T, _, _, _, _, _, _, _, _, T, T, T, _],
    [T, T, _, _, _, _, _, _, _, _, _, T, T, T],
    [T, T, T, _, _, T, T, T, T, _, _, T, T, T],
    [T, T, T, W, W, W, T, E, T, _, _, T, T, T],
    [T, T, T, _, _, W, T, T, T, _, _, T, _, _],
    [_, _, T, _, _, W, W, W, W, W, T, T, _, _],
    [_, _, T, T, T, W, W, T, W, W, W, _, _, _],
    [_, _, _, T, T, W, W, W, W, W, W, _, _, _],
    [_, _, _, T, T, T, _, _, T, T, _, _, _, _],
  ],
  start: { x: 12, z: 3 }
};