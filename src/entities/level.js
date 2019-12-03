import * as THREE from 'three';
import { Block, Orientation } from './block';
import { BasicTile } from './tiles';

export class Level {
  constructor(template) {
    this.mesh = new THREE.Group();

    // create block
    this.block = new Block(Orientation.UP, { ...template.start });
    this.mesh.add(this.block.mesh);

    // create tiles
    this.tileGroup = new THREE.Group();
    this.tileGroup.position.y = -1.15; // block height - tile height/2
    this.mesh.add(this.tileGroup);
    this.tiles = template.tiles.map((row, z) =>
      row.map((type, x) => this.createTile(x, z, type))
    );
  }

  createTile(x, z, type) {
    // TODO: Handle other tile types
    if (type === null) return;
    const tile = new BasicTile(x, z);
    this.tileGroup.add(tile.mesh);
    return tile;
  }

  getTile(x, z) {
    return this.tiles[z][x];
  }
}
