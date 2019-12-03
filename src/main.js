import * as THREE from 'three';
import { Level } from './entities/level';
import { L1 } from './levels';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

const level = new Level(L1);
scene.add(level.mesh);

const animate = function() {
  requestAnimationFrame(animate);

  // const blockMesh = level.block.mesh;
  // blockMesh.rotation.x += 0.01;
  // blockMesh.rotation.y += 0.01;
  controls.update();

  renderer.render(scene, camera);
};

animate();
