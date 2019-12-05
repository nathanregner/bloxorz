import * as THREE from 'three';

export interface Entity {
  addToParent(parent: THREE.Object3D);
}
