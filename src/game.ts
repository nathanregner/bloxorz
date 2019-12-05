import * as THREE from 'three';
import { Level } from './entities/level';
import { levels } from './levels';
import { Block, Direction } from './entities/block';

export class Game {
  private level: Level;
  private levelNumber: number;
  private levelContainer = new THREE.Object3D();

  private block: Block;

  constructor(
    private scene: THREE.Object3D,
    private levelChanged?: (levelNumber: number) => void
  ) {}

  loadLevel(n) {
    const level = levels[n];
    if (!level) {
      throw new Error(`Invalid level number${n}`);
    }

    this.scene.remove(this.levelContainer);

    this.levelNumber = n;
    this.level = new Level(level);
    this.levelContainer = new THREE.Object3D();
    this.level.addToParent(this.levelContainer);
    this.block = new Block({ ...level.start });
    this.block.addToParent(this.levelContainer);
    this.scene.add(this.levelContainer);
    this.levelChanged?.call(undefined, n);
  }

  moveBlock(direction: Direction) {
    this.block.move(direction);
  }

  restartLevel() {
    this.loadLevel(this.levelNumber);
  }
}
