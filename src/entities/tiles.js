import * as THREE from 'three';

const basicTexture = new THREE.TextureLoader().load('assets/tile.png');

export class BasicTile {
  constructor(x, z) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 1),
      new THREE.MeshBasicMaterial({ map: basicTexture })
    );
    this.mesh.position.x = x;
    this.mesh.position.z = z;
  }

  onBlockEntered() {}
}
