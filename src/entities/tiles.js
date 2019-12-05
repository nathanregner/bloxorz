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


const dropTexture = new THREE.TextureLoader().load('assets/droptile.png');

export class DropTile {
  constructor(x, z) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 1),
      new THREE.MeshBasicMaterial({ map: dropTexture })
    );
    this.mesh.position.x = x;
    this.mesh.position.z = z;
  }

  onBlockEntered() {}
}

const toggleTexture = new THREE.TextureLoader().load('assets/toggletile.png');

export class ToggleTile {
  constructor(x, z) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 1),
      new THREE.MeshBasicMaterial({ map: toggleTexture })
    );
    this.mesh.position.x = x;
    this.mesh.position.z = z;
  }

  onBlockEntered() {}
}

const endTexture = new THREE.TextureLoader().load('assets/end.png');

export class EndTile {
  constructor(x, z) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 1),
      new THREE.MeshBasicMaterial({ map: endTexture })
    );
    this.mesh.position.x = x;
    this.mesh.position.z = z;
  }

  onBlockEntered() {}
}

const weightedTexture = new THREE.TextureLoader().load('assets/weightedtile.png');

export class WeightedTile {
  constructor(x, z) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 1),
      new THREE.MeshBasicMaterial({ map: weightedTexture })
    );
    this.mesh.position.x = x;
    this.mesh.position.z = z;
  }

  onBlockEntered() {}
}

const buttonTileTexture = new THREE.TextureLoader().load('assets/buttontile.png');
const buttonTexture = new THREE.TextureLoader().load('assets/button.png');

export class ButtonTile {
  constructor(x, z) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 1),
      new THREE.MeshBasicMaterial({ map: buttonTileTexture })
    );
    
    this.button = new THREE.Mesh(
      new THREE.CylinderGeometry(.5, .5, 1, 1),
      new THREE.MeshBasicMaterial({ map: buttonTexture })
    );

    this.mesh.position.x = x;
    this.mesh.position.z = z;
    this.button.position.x = x+.5;
    this.button.position.y = z+.3;
  }

  onBlockEntered() {}
}