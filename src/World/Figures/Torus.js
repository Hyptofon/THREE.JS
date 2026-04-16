import * as THREE from 'three';
import BaseFigure from './BaseFigure.js';

export default class Torus extends BaseFigure {
    constructor() {
        super(
            "Torus (Toon)", 
            new THREE.Vector3(2, 0, 0), 
            THREE.MeshToonMaterial, 
            {},
            "Plasma"
        );
        this.init();
    }

    setGeometry() {
        this.geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
    }
}
