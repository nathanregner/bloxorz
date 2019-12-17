import * as THREE from 'three';
import { createTile, Tile } from './tiles';
import { Entity } from './entity';
import { Direction } from './block';
import { D } from '../levels';

export class Level implements Entity {
  private readonly container: THREE.Object3D;
  private readonly tiles: (Tile | null)[][];

  constructor(template) {
    this.container = new THREE.Group();
    this.container.position.y = -1.15; // block height - tile height/2
    this.tiles = template.tiles.map((row, z) =>
      row.map((type, x) => {
        const tile = createTile(x, z, type);
        if (tile != null) {
          this.container.add(tile.obj3d());
        }
        return tile;
      })
    );
  }

  getTile(x, z) {
    return this.tiles[z] && this.tiles[z][x];
  }

  obj3d() {
    return this.container;
  }

  getTiles() {
    return this.tiles;
  }
}
