import * as THREE from 'three';
import Application from '../Application.js';
import {
    COLOR_AMBIENT_LIGHT,
    COLOR_DIRECTIONAL_LIGHT,
    COLOR_POINT_LIGHT,
    COLOR_SCENE_BACKGROUND,
} from '../config.js';

/**
 * Environment — освітлення та фон сцени.
 *
 * Створює та керує: ambient light, directional light, point light,
 * а також кольором фону сцени.
 *
 * @property {THREE.AmbientLight}  setambientLight  - М'яке фонове освітлення.
 * @property {THREE.DirectionalLight} setDirectionalLight - Основне спрямоване світло.
 * @property {THREE.PointLight}    setPointLight    - Локальне точкове світло.
 * @property {object}              bgParams      - Параметри фону (колір).
 */
export default class Environment {
    constructor() {
        this.app = new Application();
        this.scene = this.app.scene;
        this.debug = this.app.debug;

        this.setAmbientLight();
        this.setDirectionalLight();
        this.setPointLight();
        this.setBackground();
        
        // Debug
        if (this.debug.active) {
            this.setDebug();
        }
    }

    setAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(COLOR_AMBIENT_LIGHT, 0.4);
        this.scene.add(this.ambientLight);
    }

    setDirectionalLight() {
        this.directionalLight = new THREE.DirectionalLight(COLOR_DIRECTIONAL_LIGHT, 1.5);
        this.directionalLight.position.set(2, 4, 3);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.set(1024, 1024);
        this.scene.add(this.directionalLight);
    }

    setPointLight() {
        this.pointLight = new THREE.PointLight(COLOR_POINT_LIGHT, 20, 10);
        this.pointLight.position.set(0, 1, 2);
        this.scene.add(this.pointLight);
    }

    setBackground() {
        this.bgParams = { color: COLOR_SCENE_BACKGROUND };
        this.scene.background = new THREE.Color(this.bgParams.color);
    }

    setDebug() {
        this.debugFolder = this.debug.ui.addFolder('Scene Settings');
        this.debugFolder.add(this.ambientLight, 'intensity').min(0).max(2).step(0.01).name('Ambient Light');
        this.debugFolder.add(this.directionalLight, 'intensity').min(0).max(3).step(0.01).name('Dir. Light');
        this.debugFolder.add(this.pointLight, 'intensity').min(0).max(60).step(1).name('Point Light');
        this.debugFolder.addColor(this.bgParams, 'color').name('Background Color').onChange(v => {
            this.scene.background.set(v);
        });
    }
}
