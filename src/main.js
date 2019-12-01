import * as THREE from 'three';
import { default as TWEEN } from '@tweenjs/tween.js';

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
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.3, 1),
    new THREE.MeshBasicMaterial({ map: texture })
  );
  mesh.position.y = -0.3;
  return mesh;
}

const tile = createTile();
tile.position.y = -1;
scene.add(tile);

const animate = function(time) {
  requestAnimationFrame(animate);

  // block.rotation.x += 0.01;
  // block.rotation.y += 0.01;

  TWEEN.update(time);
  renderer.render(scene, camera);
};

animate();

const t = new TWEEN.Tween({ ...block.position, xr: block.rotation.x })
  .to(
    { y: block.position.y - 0.5, x: block.position.x + 1, xr: -Math.PI / 2 },
    500
  )
  .onUpdate(o => {
    // block.x = o.x;
    block.position.x = o.x;
    block.position.y = o.y;
    block.rotation.z = o.xr;
    // console.log(o.xr);
    block.updateMatrix();
    // console.log(o);
  })
  .easing(TWEEN.Easing.Quadratic.InOut)
  .repeat(2)
  .yoyo(true)
  .start();
console.log(t);
