import * as THREE from 'three';
import { Entity } from './entity';
import { Object3D, Vector3 } from 'three';

interface Position {
  x: number;
  z: number;
}

interface Direction {
  x: number;
  z: number;
  axis: string;
}

export const Directions = {
  E: { x: 1, z: 0, axis: 'x' },
  W: { x: -1, z: 0, axis: 'x' },
  N: { x: 0, z: -1, axis: 'z' },
  S: { x: 0, z: 1, axis: 'z' },
  UP: { x: 0, z: 0, axis: 'y' },
};

const blockTexture = new THREE.TextureLoader().load('assets/block.png');

export class Block implements Entity {
  private readonly mesh: THREE.Object3D;
  private direction: Direction = Directions.UP;

  // TODO: Height = 1 for split blocks
  constructor(private position: Position, private height = 2) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, height, 1),
      new THREE.MeshBasicMaterial({ map: blockTexture })
    );
    this.updateMesh();
  }

  private updateMesh() {
    // translate
    const up = this.direction === Directions.UP;
    const offset = up ? 0 : 0.5;
    this.mesh.position.set(
      this.position.x + this.direction.x * offset,
      -offset,
      this.position.z + this.direction.z * offset
    );

    // rotate
    const ninty = Math.PI / 2;
    this.mesh.rotation.set(
      this.direction.z * ninty,
      0,
      this.direction.x * ninty
    );
  }

  move(orientation: Direction) {
    let x = orientation.x;
    let z = orientation.z;
    if (orientation.axis === this.direction.axis) {
      if (orientation === this.direction) {
        x *= 2;
        z *= 2;
      }
      this.direction = Directions.UP;
    } else if (this.direction === Directions.UP) {
      this.direction = orientation;
    }
    this.position.x += x;
    this.position.z += z;

    this.updateMesh();

    // TODO: Do animation here... and ignore keyboard input until it finishes
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }

  addToParent(parent: Object3D) {
    parent.add(this.mesh);
  }
}
