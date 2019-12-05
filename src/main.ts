import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Directions } from './entities/block';
import { Game } from './game';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

function setLevelHash(level: number) {
  window.location.hash = String(level);
}

function getLevelHash() {
  return parseInt(window.location.hash.substring(1));
}

const game = new Game(scene, setLevelHash);
game.loadLevel(getLevelHash() || 0);
window.onhashchange = () => game.loadLevel(getLevelHash());

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

const animate = function() {
  requestAnimationFrame(animate);

  // const blockMesh = level.block.mesh;
  // blockMesh.rotation.x += 0.01;
  // blockMesh.rotation.y += 0.01;
  controls.update();

  renderer.render(scene, camera);
};

requestAnimationFrame(animate);
