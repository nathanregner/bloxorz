import * as THREE from 'three';
import { tween, easing } from 'popmotion';
import { Entity } from './entity';
import { B, D, E, T, W } from '../levels';
import { Direction, Directions } from './block';
import { AnimationLoop } from '../animation';

const textureLoader = new THREE.TextureLoader();

export abstract class Tile implements Entity {
  protected base: THREE.Mesh;

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

  onBlockEntered(direction: Direction, animationLoop: AnimationLoop) {}
}

export class BasicTile extends Tile {
  private static textuure = textureLoader.load('assets/tile.png');

  constructor(x: number, z: number) {
    super(x, z, { map: BasicTile.textuure });
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
  private dropped = false;

  constructor(x: number, z: number) {
    super(x, z, { map: WeightedTile.texture });
  }

  onBlockEntered(direction: Direction, animationLoop: AnimationLoop) {
    if (direction === Directions.UP) {
      animationLoop.enqueue(this.drop());
    }
  }

  isPresent() {
    return !this.dropped;
  }

  private drop() {
    const position = this.base.position;
    const material = this.base.material as THREE.Material;
    material.transparent = true;
    this.dropped = true;

    return new Promise(resolve => {
      tween({
        from: { y: position.y, opacity: 1 },
        to: { y: -15, opacity: 0 },
        ease: easing.easeOut,
        duration: 500,
      }).start({
        update: ({ y, opacity }) => {
          position.setY(y);
          material.opacity = opacity;
        },
        complete: resolve,
      });
    });
  }
}

export class ButtonTile extends Tile {
  private static texture = textureLoader.load('assets/buttontile.png');
  private static buttonTexture = textureLoader.load('assets/button.png');

  private readonly button: THREE.Object3D;

  constructor(x, z) {
    super(x, z, { map: ButtonTile.texture });
    this.button = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.25),
      new THREE.MeshPhongMaterial({ map: ButtonTile.buttonTexture })
    );
    this.button.position.y = 0.25;
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
    default:
      return new BasicTile(x, z);
  }
}
