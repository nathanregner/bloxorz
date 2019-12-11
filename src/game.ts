import * as THREE from 'three';
import { Level } from './entities/level';
import { levels } from './levels';
import { Block, Direction, Directions } from './entities/block';
import { EndTile, ButtonTile, ToggleTile } from './entities/tiles';

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

    // make sure the player is still in bounds
    const tiles = [];
    for (const point of this.block.getPoints()) {
      const tile = this.level.getTile(point.x, point.z);
      tiles.push(tile);

      if (!tile?.isPresent() || !tile?.isVisible()) {
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

      if (tile instanceof ButtonTile && direction == Directions.UP) {
        let tiles = this.level.getTiles();
        console.log(tiles);
        // Find the toggle tile when on button tile
        for (let i = 0; i < tiles.length; i++) {
          let tileRow = tiles[i];
          for (let j = 0; j < tileRow.length; j++) {
            if (tileRow[j] instanceof ToggleTile) {
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
}
