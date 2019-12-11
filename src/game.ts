import * as THREE from 'three';
import { Level } from './entities/level';
import { levels } from './levels';
import { Block, Direction, Directions } from './entities/block';
import { EndTile } from './entities/tiles';

export function center(obj: THREE.Object3D): THREE.Vector3 {
  return new THREE.Box3()
    .setFromObject(obj)
    .getCenter(obj.position)
    .multiplyScalar(-1);
}

export class Game {
  private level: Level;
  private levelNumber: number;
  private root = new THREE.Object3D();

  private block: Block;

  constructor(
    private scene: THREE.Object3D,
    private levelChanged?: (levelNumber: number) => void
  ) {}

  loadLevel(n) {
    const levelTemplate = levels[n];
    if (!levelTemplate) {
      throw new Error(`Invalid level number${n}`);
    }

    const level = new Level(levelTemplate);
    const root = new THREE.Object3D();
    root.add(level.obj3d());

    const block = new Block({ ...levelTemplate.start });
    root.add(block.obj3d());

    this.block = block;
    this.level = level;
    this.levelNumber = n;
    this.scene.remove(this.root);
    this.scene.add((this.root = root));
    this.levelChanged?.call(undefined, n);
  }

  moveBlock(direction: Direction) {
    this.block.move(direction);

    // make sure the player is still in bounds
    const tiles = [];
    for (const point of this.block.getPoints()) {
      const tile = this.level.getTile(point.x, point.z);
      tiles.push(tile);

      if (!tile?.isPresent()) {
        console.log('Lost level, restarting');
        this.restartLevel();
        return;
      }
    }

    // propagate block events
    for (const tile of tiles) {
      const direction = this.block.getDirection();
      if (tile instanceof EndTile && direction == Directions.UP) {
        console.log('Won level, moving to next');
        this.loadLevel(this.levelNumber + 1);
        return;
      }

      tile.onBlockEntered(direction);
    }
  }

  restartLevel() {
    this.loadLevel(this.levelNumber);
  }

  getLevelObject() {
    return this.level.obj3d();
  }
}
