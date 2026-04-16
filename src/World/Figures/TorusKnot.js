import * as THREE from 'three';
import BaseFigure from './BaseFigure.js';
import { COLOR_TORUSKNOT_SPECULAR, COLOR_TORUSKNOT_EMISSIVE } from '../../config.js';

export default class TorusKnot extends BaseFigure {
    constructor() {
        super(
            "TorusKnot (Phong)",
            new THREE.Vector3(-2, 2, 0),
            THREE.MeshPhongMaterial,
            {
                shininess:        120,
                specular:         new THREE.Color(COLOR_TORUSKNOT_SPECULAR),
                emissive:         new THREE.Color(COLOR_TORUSKNOT_EMISSIVE),
                emissiveIntensity: 0.5,
            },
            "Lava"
        );
        this.init();
    }

    setGeometry() {
        this.geometry = new THREE.TorusKnotGeometry(0.5, 0.18, 128, 20);
    }
}

