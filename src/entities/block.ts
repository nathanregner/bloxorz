import * as THREE from 'three';
import { Entity } from './entity';
import { AnimationQueue, fallAnimation } from '../animation';
import { easing, tween } from 'popmotion';

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
  private readonly mesh: THREE.Mesh;
  private direction: Direction = Directions.UP;

  constructor(
    private readonly animationQueue: AnimationQueue,
    private position: Position
  ) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2, 1),
      new THREE.MeshPhongMaterial({ map: blockTexture })
    );
    this.mesh.castShadow = true;
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

  getPositions(): Position[] {
    const positions = [{ ...this.position }];
    if (this.direction.x != 0 || this.direction.z != 0) {
      positions.push({
        x: this.position.x + this.direction.x,
        z: this.position.z + this.direction.z,
      });
    }
    return positions;
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
  }

  fall() {
    this.animationQueue.enqueue(complete => {
      const position = this.mesh.position;
      tween(fallAnimation(position.y)).start({
        update: y => position.setY(y),
        complete,
      });
    });
  }

  obj3d() {
    return this.mesh;
  }
}
