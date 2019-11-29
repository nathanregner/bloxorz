import * as THREE from 'three';

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

function createBlock() {
  const texture = new THREE.TextureLoader().load('assets/block.png');
  return new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 1),
    new THREE.MeshBasicMaterial({ map: texture })
  );
}

const block = createBlock();
scene.add(block);

function createTile() {
  const texture = new THREE.TextureLoader().load('assets/tile.png');
  return new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.3, 1),
    new THREE.MeshBasicMaterial({ map: texture })
  );
}

const tile = createTile();
tile.position.y = -1;
scene.add(tile);

const animate = function() {
  requestAnimationFrame(animate);

  block.rotation.x += 0.01;
  block.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
