import * as THREE from 'three';
import { Block, Orientation } from './block';
import { BasicTile, DropTile, EndTile } from './tiles';
import { T, D, E, W, B, B1, B2, D1, D2 } from '../levels.js';

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
    
    let tile;
    switch (type){
      case T:
        tile = new BasicTile(x, z);
        break;
      case D:
        tile = new DropTile(x, z);
        break;
       case D:
        tile = new DropTile(x, z);
        break;
      case D1:
        tile = new DropTile(x, z);
        break;
      case D2:
        tile = new DropTile(x, z);
        break;     
      case E:
        tile = new EndTile(x, z);
        break;
      case W:
        tile = new WeightedTile(x, z);
        break;
      case B:
        tile = new ButtonTile(x, z);
        break;
      case B1:
        tile = new ButtonTile(x, z);
        break;
      case B2:
        tile = new ButtonTile(x, z);
        break; 
      default:
        tile = new BasicTile(x, z);        
    }
    this.tileGroup.add(tile.mesh);
    return tile;
  }

  getTile(x, z) {
    return this.tiles[z][x];
  }
}
