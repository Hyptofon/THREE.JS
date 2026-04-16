import * as THREE from 'three';
import BaseFigure from './BaseFigure.js';

export default class Cone extends BaseFigure {
    constructor() {
        super(
            "Cone (Lambert)", 
            new THREE.Vector3(0, 2, 0), 
            THREE.MeshLambertMaterial, 
            { reflectivity: 0.5 },
            "OBSIDIAN"
        );
        this.init();
    }

    setGeometry() {
        this.geometry = new THREE.ConeGeometry(0.5, 1, 32);
    }
}
