import * as THREE from 'three';

export const Orientation = {
  N: { x: 0, z: -1, axis: 'z' },
  S: { x: 0, z: 1, axis: 'z' },
  E: { x: 1, z: 0, axis: 'x' },
  W: { x: -1, z: 0, axis: 'x' },
  UP: { x: 0, z: 0, axis: 'y' }
  // TODO: Do we need a down orientation? Or can we reuse up? Might look weird if the texture gets flipped
};

const blockTexture = new THREE.TextureLoader().load('assets/block.png');

export class Block {
  constructor(orientation, position) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2, 1),
      new THREE.MeshBasicMaterial({ map: blockTexture })
    );
    this.orientation = orientation;
    this.position = position;
    this.updateMesh();
  }

  updateMesh() {
    // TODO: Update rotation based on orientation
    this.mesh.position.x = this.position.x;
    this.mesh.position.z = this.position.z;
  }

  move(orientation) {
    // TODO
  }
}
