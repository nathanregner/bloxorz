import * as THREE from 'three';
import { Block } from './block';
import { createTile, Tile } from './tiles';
import { Entity } from './entity';

export class Level implements Entity {
  private readonly container: THREE.Object3D;
  public readonly block: Block;
  private readonly tiles: (Tile | null)[][];

  constructor(template) {
    this.container = new THREE.Group();

    // create block
    this.block = new Block({ ...template.start });
    this.block.addToParent(this.container);

    // create tiles
    const tileGroup = new THREE.Group();
    tileGroup.position.y = -1.15; // block height - tile height/2
    this.container.add(tileGroup);
    this.tiles = template.tiles.map((row, z) =>
      row.map((type, x) => {
        const tile = createTile(x, z, type);
        tile?.addToParent(tileGroup);
        return tile;
      })
    );
  }

  getTile(x, z) {
    return this.tiles[z][x];
  }

  addToParent(parent: THREE.Object3D) {
    parent.add(this.container);
  }
}
