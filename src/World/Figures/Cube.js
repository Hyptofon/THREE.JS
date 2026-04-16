import * as THREE from 'three';
import BaseFigure from './BaseFigure.js';

export default class Cube extends BaseFigure {
    constructor() {
        super(
            "Cube (Standard)", 
            new THREE.Vector3(-2, 0, 0), 
            THREE.MeshStandardMaterial, 
            { metalness: 0.9, roughness: 0.2 },
            "Neon Cyber"
        );
        this.init();
    }

    setGeometry() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
    }
}
