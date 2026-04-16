import * as THREE from 'three';
import Application from './Application.js';

/**
 * Renderer — налаштовує та запускає WebGL-рендерер.
 *
 * Відповідає за малювання кадру на Canvas, конфігурацію тіней
 * та масштабування під поточний розмір екрана.
 *
 * @property {THREE.WebGLRenderer} instance - Екземпляр рендерера Three.js.
 */
export default class Renderer {
    constructor() {
        this.app    = new Application();
        this.canvas = this.app.canvas;
        this.sizes  = this.app.sizes;
        this.scene  = this.app.scene;

        this.setInstance();
    }

    /**
     * Ініціалізує `THREE.WebGLRenderer` із потрібними параметрами.
     */
    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas:    this.canvas,
            antialias: true,
        });

        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);

        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type    = THREE.PCFSoftShadowMap;
    }

    /**
     * Оновлює розміри рендерера після зміни вікна браузера.
     */
    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    /**
     * Малює поточний кадр сцени.
     * Викликається щокадру через `Application.update()`.
     *
     * @param {THREE.PerspectiveCamera} camera - Камера, з точки зору якої рендерується кадр.
     */
    update(camera) {
        this.instance.render(this.scene, camera);
    }
}
