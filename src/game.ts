import * as THREE from 'three';
import { Level } from './entities/level';
import { levels } from './levels';
import { Block, Direction, Directions } from './entities/block';
import { ButtonTile, DropTile, EndTile } from './entities/tiles';
import { AnimationQueue } from './animation';

export interface GameEvents {
  onDeath?: () => void;
  onLevelSwitched?: (n: number) => void;
}

export class Game {
  private level: Level;
  private levelNumber: number;
  private block: Block;

  private animationQueue = new AnimationQueue();
  private root = new THREE.Object3D();

  constructor(private scene: THREE.Object3D, private events: GameEvents) {}

  async loadLevel(n) {
    const levelTemplate = levels[n];
    if (!levelTemplate) {
      throw new Error(`Invalid level number${n}`);
    }

    await this.animationQueue.drain();

    const level = new Level(levelTemplate);
    const root = new THREE.Object3D();
    root.add(level.obj3d());

    const block = new Block(this.animationQueue, { ...levelTemplate.start });
    root.add(block.obj3d());

    this.block = block;
    this.level = level;
    this.levelNumber = n;
    this.scene.remove(this.root);
    this.scene.add((this.root = root));
    this.events.onLevelSwitched?.call(this, n);
  }

  moveBlock(direction: Direction) {
    let counter = document.getElementById('counter');
    let number = parseInt(counter.innerText);
    number = number + 1;
    let text = number.toString();
    counter.innerHTML = text;

    if (!this.animationQueue.isEmpty()) return;
    this.block.move(direction);

    const blockDirection = this.block.getDirection();

    // make sure the player is still in bounds
    const tiles = [];
    for (const point of this.block.getPositions()) {
      const tile = this.level.getTile(point.x, point.z);
      tiles.push(tile);
      tile?.onBlockEntered(blockDirection, this.animationQueue);

      if (!tile?.isPresent()) {
        console.log('Lost level, restarting');
        this.block.fall();
        this.events.onDeath?.call(this);
        this.restartLevel();
        return;
      }
    }

    // propagate block events
    for (const tile of tiles) {
      if (tile instanceof EndTile && blockDirection == Directions.UP) {
        console.log('Won level, moving to next');
        this.block.fall();
        this.loadLevel(this.levelNumber + 1);
        return;
      }

      if (tile instanceof ButtonTile && blockDirection == Directions.UP) {
        let tiles = this.level.getTiles();
        // Find the toggle tile when on button tile
        for (let i = 0; i < tiles.length; i++) {
          let tileRow = tiles[i];
          for (let j = 0; j < tileRow.length; j++) {
            if (tileRow[j] instanceof DropTile) {
              tileRow[j].setVisible(true);
            }
          }
        }
      }

      tile.onBlockEntered(direction);
    }
  }

  restartLevel() {
    this.loadLevel(this.levelNumber);
  }

  getLevelObj3d() {
    return this.level.obj3d();
  }
}
