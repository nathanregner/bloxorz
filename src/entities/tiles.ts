import * as THREE from 'three';
import { Entity } from './entity';
import { B, B1, B2, D, E, T, W } from '../levels';

export abstract class Tile implements Entity {
  protected base: THREE.Mesh;

  constructor(x: number, z: number, texture: THREE.Texture) {
    this.base = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 1),
      new THREE.MeshBasicMaterial({ map: texture })
    );
    this.base.position.x = x;
    this.base.position.z = z;
  }
  // TODO: Events (block entered, block exit)

  addToParent(parent: THREE.Object3D) {
    parent.add(this.base);
  }
}

const basicTexture = new THREE.TextureLoader().load('assets/tile.png');

export class BasicTile extends Tile {
  constructor(x: number, z: number) {
    super(x, z, basicTexture);
  }
}

const dropTexture = new THREE.TextureLoader().load('assets/droptile.png');

export class DropTile extends Tile {
  constructor(x: number, z: number) {
    super(x, z, dropTexture);
  }
}

const toggleTexture = new THREE.TextureLoader().load('assets/toggletile.png');

export class ToggleTile extends Tile {
  constructor(x: number, z: number) {
    super(x, z, toggleTexture);
  }
}

const endTexture = new THREE.TextureLoader().load('assets/end.png');

export class EndTile extends Tile {
  constructor(x: number, z: number) {
    super(x, z, endTexture);
  }
}

const weightedTexture = new THREE.TextureLoader().load(
  'assets/weightedtile.png'
);

export class WeightedTile extends Tile {
  constructor(x: number, z: number) {
    super(x, z, weightedTexture);
  }
}

const buttonTileTexture = new THREE.TextureLoader().load(
  'assets/buttontile.png'
);
const buttonTexture = new THREE.TextureLoader().load('assets/button.png');

export class ButtonTile extends Tile {
  private readonly button: THREE.Object3D;

  constructor(x, z) {
    super(x, z, buttonTileTexture);
    this.button = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1, 1),
      new THREE.MeshBasicMaterial({ map: buttonTexture })
    );
    this.button.position.x = x + 0.5;
    this.button.position.y = z + 0.3;
    this.base.add(this.button);
  }
}

export function createTile(x: number, z: null, type: string) {
  if (type === null) return;
  switch (type) {
    case T:
      return new BasicTile(x, z);
    case D:
      return new DropTile(x, z);
    case E:
      return new EndTile(x, z);
    case W:
      return new WeightedTile(x, z);
    case B:
      return new ButtonTile(x, z);
    case B1:
      return new ButtonTile(x, z);
    case B2:
      return new ButtonTile(x, z);
    default:
      return new BasicTile(x, z);
  }
}
