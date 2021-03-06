import {
  BasicTile,
  ButtonTile,
  DropTile,
  EndTile,
  Tile,
  WeightedTile,
} from './entities/tiles';

type TileFactory = (x: number, z: number) => Tile | null;

export interface LevelTemplate {
  tiles: TileFactory[][];
  start: { x: number; z: number };
}

const _: TileFactory = () => null;
const E: TileFactory = (x, z) => new EndTile(x, z);
const T: TileFactory = (x, z) => new BasicTile(x, z);
const D: TileFactory = (x, z) => new DropTile(x, z);
const B: TileFactory = (x, z) => new ButtonTile(x, z);
const W: TileFactory = (x, z) => new WeightedTile(x, z);

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
    [_, _, _, W, W, W, W, W, W, W, _, _, _, _],
    [_, _, _, W, W, W, W, W, W, W, _, _, _, _],
    [T, T, T, T, _, _, _, _, _, T, T, T, _, _],
    [T, T, T, _, _, _, _, _, _, _, T, T, _, _],
    [T, T, T, _, _, _, _, _, _, _, T, T, _, _],
    [T, T, T, _, _, T, T, T, T, W, W, W, W, W],
    [T, T, T, _, _, T, T, T, T, W, W, W, W, W],
    [_, _, _, _, _, T, E, T, _, _, W, W, T, W],
    [_, _, _, _, _, T, T, T, _, _, W, W, W, W],
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
    [T, T, T, T, T, T, T, T, T, _, _, _, T, E, T],
    [T, T, T, _, _, _, _, T, T, B, _, _, T, T, T],
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

export const levels: LevelTemplate[] = [L1, L2, L3, L4, L5];
