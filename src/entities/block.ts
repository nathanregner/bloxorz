import * as THREE from 'three';
import { Object3D } from 'three';
import { Entity } from './entity';

interface Position {
  x: number;
  z: number;
}

export interface Direction {
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
  private debug = [new THREE.AxesHelper(), new THREE.AxesHelper()];

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

    this.debug[0].position.set(this.position.x, 0, this.position.z);
    this.debug[1].position.set(
      this.position.x + this.direction.x,
      0,
      this.position.z + this.direction.z
    );
  }

  getPoints(): Position[] {
    const points = [{ ...this.position }];
    if (this.direction.x != 0 || this.direction.z != 0) {
      points.push({
        x: this.position.x + this.direction.x,
        z: this.position.z + this.direction.z,
      });
    }
    return points;
  }

  getDirection() {
    return this.direction;
  }

  move(direction: Direction) {
    let x = direction.x;
    let z = direction.z;
    if (direction.axis === this.direction.axis) {
      if (direction === this.direction) {
        x *= 2;
        z *= 2;
      }
      this.direction = Directions.UP;
    } else if (this.direction === Directions.UP) {
      this.direction = direction;
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
    parent.add(this.mesh, ...this.debug);
  }
}
