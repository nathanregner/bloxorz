import * as THREE from 'three';
import * as audio from './audio';
import { Directions } from './entities/block';
import { Game } from './game';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, undefined, 0.1, 1000);
camera.position.y = 5;

camera.add(audio.listener);

const renderer = new THREE.WebGLRenderer();

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

resize();
window.addEventListener('resize', resize);

document.body.appendChild(renderer.domElement);

function setLevelHash(level: number) {
  window.location.hash = String(level);
}

function getLevelHash() {
  return parseInt(window.location.hash.substring(1));
}

function autoFitCamera(obj: THREE.Object3D, camera: THREE.PerspectiveCamera) {
  const boundingSphere = new THREE.Box3()
    .setFromObject(obj)
    .getBoundingSphere(new THREE.Sphere());

  camera.position.setX(boundingSphere.center.x);
  camera.position.setZ(boundingSphere.radius * 1.1);
  camera.lookAt(boundingSphere.center);

  camera.updateProjectionMatrix();
}

(function() {
  const light = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(light);
})();

const game = new Game(scene, {
  onLevelSwitched: levelNumber => {
    setLevelHash(levelNumber);
    autoFitCamera(game.getLevelObject(), camera);
  },
  onDeath() {
    audio.deathSound.play();
  },
});

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

  renderer.render(scene, camera);
};

requestAnimationFrame(animate);
