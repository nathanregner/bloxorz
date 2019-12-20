import * as THREE from 'three';
import { Entity } from './entity';
import { Direction, Directions } from './block';

const textureLoader = new THREE.TextureLoader();

export abstract class Tile implements Entity {
  protected readonly base: THREE.Mesh;

  protected constructor(
    x: number,
    z: number,
    params: THREE.MeshPhongMaterialParameters
  ) {
    this.base = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.3, 1),
      new THREE.MeshPhongMaterial(params)
    );
    this.base.position.x = x;
    this.base.position.z = z;
    this.base.receiveShadow = true;
  }

  obj3d() {
    return this.base;
  }

  isPresent() {
    return this.base.visible;
  }

  setVisible(visible: boolean) {
    this.base.visible = visible;
  }

  onBlockEntered(direction: Direction) {}
}

export class BasicTile extends Tile {
  private static texture = textureLoader.load('assets/tile.png');

  constructor(x: number, z: number) {
    super(x, z, { map: BasicTile.texture });
  }
}

export class DropTile extends Tile {
  private static texture = textureLoader.load('assets/droptile.png');

  constructor(x: number, z: number) {
    super(x, z, { map: DropTile.texture });
    this.setVisible(false);
  }
}

export class EndTile extends Tile {
  constructor(x: number, z: number) {
    super(x, z, { opacity: 0, transparent: true });
  }
}

export class WeightedTile extends Tile {
  private static texture = textureLoader.load('assets/weightedtile.png');

  constructor(x: number, z: number) {
    super(x, z, { map: WeightedTile.texture });
  }

  onBlockEntered(direction: Direction) {
    if (direction === Directions.UP) {
      this.base.visible = false;
    }
  }

  isPresent() {
    return this.base.visible;
  }
}

export class ButtonTile extends Tile {
  private static texture = textureLoader.load('assets/buttontile.png');
  private static buttonTexture = textureLoader.load('assets/button.png');

  private readonly button: THREE.Object3D;

  constructor(x: number, z: number) {
    super(x, z, { map: ButtonTile.texture });
    this.button = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.25),
      new THREE.MeshPhongMaterial({ map: ButtonTile.buttonTexture })
    );
    this.button.position.y = 0.25;
    this.base.add(this.button);
  }
}
