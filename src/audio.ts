import * as THREE from 'three';

export const listener = new THREE.AudioListener();

const loader = new THREE.AudioLoader();

function loadSound(url: string) {
  const sound = new THREE.Audio(listener);
  loader.load(url, buffer => sound.setBuffer(buffer), undefined, undefined);
  return sound;
}

export const deathSound = loadSound('/assets/roblox-death-sound-effect.mp3');
