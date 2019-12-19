import * as THREE from 'three';
import { Level } from './entities/level';
import { levels } from './levels';
import { Block, Direction, Directions } from './entities/block';
import { EndTile, ButtonTile, DropTile } from './entities/tiles';

export interface GameEvents {
  onDeath?: () => void;
  onLevelSwitched?: (n: number) => void;
}

export class Game {
  private level: Level;
  private levelNumber: number;
  private root = new THREE.Object3D();

  private block: Block;

  constructor(private scene: THREE.Object3D, private events: GameEvents) {}

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
    this.events.onLevelSwitched?.call(this, n);
  }

  moveBlock(direction: Direction) {
    let counter = document.getElementById('counter');
    let number = parseInt(counter.innerText);
    number = number + 1;
    let text = number.toString();
    counter.innerHTML = text;

    this.block.move(direction);

    const blockDirection = this.block.getDirection();

    // make sure the player is still in bounds
    const tiles = [];
    for (const point of this.block.getPoints()) {
      const tile = this.level.getTile(point.x, point.z);
      tiles.push(tile);
      tile?.onBlockEntered(blockDirection);

      if (!tile?.isPresent()) {
        console.log('Lost level, restarting');
        this.events.onDeath?.call(this);
        this.restartLevel();
        return;
      }
    }

    // propagate block events
    for (const tile of tiles) {
      if (tile instanceof EndTile && blockDirection == Directions.UP) {
        console.log('Won level, moving to next');
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
