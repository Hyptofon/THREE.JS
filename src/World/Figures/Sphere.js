import * as THREE from 'three';
import BaseFigure from './BaseFigure.js';

export default class Sphere extends BaseFigure {
    constructor() {
        super(
            "Sphere (Physical)", 
            new THREE.Vector3(0, 0, 0), 
            THREE.MeshPhysicalMaterial, 
            { metalness: 0.1, roughness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.1, transmission: 0.5, thickness: 1.0 },
            "Galaxy"
        );
        this.init();
    }

    setGeometry() {
        this.geometry = new THREE.SphereGeometry(0.7, 32, 32);
    }
}
