const _ = null;
export const E = 'goal';
export const T = 'tile';
export const D = 'dropable';
export const B = 'button';
export const O = 'one time use';
export const W = 'cannot stand on';

// TODO: Better level format?
export const L1 = {
  tiles: [
    [T, T, T, _, _, _, _, _, _, _, _],
    [T, T, T, T, T, T, _, _, _, _, _],
    [T, T, T, T, T, T, T, T, T, _, _],
    [_, T, T, T, T, T, T, T, T, T, _],
    [_, _, _, _, _, _, T, T, E, T, T],
    [_, _, _, _, _, _, _, T, T, T, _],
  ],
  start: { x: 1, z: 1 },
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
  start: { x: 0, z: 5 },
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
  start: { x: 0, z: 3 },
};

export const L4 = {
  tiles: [
    [_, _, _, _, _, _, _, _, T, T, T, T, _, _, _],
    [_, _, _, _, _, _, _, _, T, T, T, T, _, _, _],
    [T, T, T, _, _, _, _, _, T, _, _, T, T, T, T],
    [T, T, T, T, T, T, T, B, T, _, _, _, T, E, T],
    [T, T, T, _, _, _, _, T, T, _, _, _, T, T, T],
    [T, T, T, _, _, _, _, T, T, T, _, _, T, T, T],
    [_, T, T, D, _, _, _, T, _, _, _, _, _, _, _],
    [_, _, T, T, T, T, T, T, _, _, _, _, _, _, _],
  ],
  start: { x: 1, z: 3 },
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
  start: { x: 12, z: 3 },
};

export const levels = [L1, L2, L3, L4, L5];
