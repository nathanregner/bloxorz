import * as THREE from 'three';
import { Entity } from './entity';
import { Object3D } from 'three';

const basicTexture = new THREE.TextureLoader().load('assets/tile.png');

export interface Tile extends Entity {
  // TODO: Events (block entered, block exit)
}

export class BasicTile implements Tile {
  private readonly mesh: THREE.Object3D;

  constructor(x, z) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 1),
      new THREE.MeshBasicMaterial({ map: basicTexture })
    );
    this.mesh.position.x = x;
    this.mesh.position.z = z;
  }

  addToParent(parent: Object3D) {
    parent.add(this.mesh);
  }
}
