import * as THREE from 'three';
import { createTile, Tile } from './tiles';
import { Entity } from './entity';
import { Direction } from './block';

export class Level implements Entity {
  private readonly container: THREE.Object3D;
  private readonly tiles: (Tile | null)[][];

  constructor(template) {
    this.container = new THREE.Group();
    this.container.position.y = -1.15; // block height - tile height/2
    this.tiles = template.tiles.map((row, z) =>
      row.map((type, x) => {
        const tile = createTile(x, z, type);
        tile?.addToParent(this.container);
        return tile;
      })
    );
  }

  getTile(x, z) {
    return this.tiles[z] && this.tiles[z][x];
  }

  addToParent(parent: THREE.Object3D) {
    parent.add(this.container);
  }
}
