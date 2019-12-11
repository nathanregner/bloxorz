import * as THREE from 'three';

export interface Entity {
  obj3d(): THREE.Object3D;
}
