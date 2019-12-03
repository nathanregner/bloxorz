const _ = null;
const E = 'goal';
const T = 'tile';

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
