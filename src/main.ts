import * as THREE from 'three';
import { Directions } from './entities/block';
import { Game } from './game';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true });
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, undefined, 0.1, 1000);
camera.position.y = 5.5;

function createGame() {
  function setLevelHash(level: number) {
    window.location.hash = String(level);
  }

  function getLevelHash() {
    return parseInt(window.location.hash.substring(1));
  }

  function autoFitCamera(obj: THREE.Object3D) {
    const boundingSphere = new THREE.Box3()
      .setFromObject(obj)
      .getBoundingSphere(new THREE.Sphere());

    camera.position.setX(boundingSphere.center.x);
    camera.position.setZ(boundingSphere.radius * 1.3);
    camera.lookAt(boundingSphere.center);

    camera.updateProjectionMatrix();
  }

  const game = new Game(scene, {
    onLevelSwitched: levelNumber => {
      setLevelHash(levelNumber);
      autoFitCamera(game.getLevelObj3d());
    },
  });

  game.loadLevel(getLevelHash() || 0);
  window.onhashchange = () => game.loadLevel(getLevelHash());
  return game;
}

function setupEventHandlers() {
  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', resize);
  resize();
}

function setupKeyBindings(game: Game) {
  const moveKeys = {
    a: Directions.W,
    d: Directions.E,
    s: Directions.S,
    w: Directions.N,
  };

  document.addEventListener('keypress', ev => {
    const direction = moveKeys[ev.key];
    if (direction) {
      game.moveBlock(direction);
    } else {
      switch (ev.key) {
        case 'r':
          game.restartLevel();
          break;
      }
    }
  });
}

(function() {
  // setup game state
  const game = createGame();
  setupKeyBindings(game);
  setupEventHandlers();

  // start render loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
})();
