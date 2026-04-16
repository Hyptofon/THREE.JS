import * as THREE from 'three';
import Application from '../Application.js';
import FPSControls from '../Controls/FPSControls.js';

/**
 * Camera — перспективна камера сцени з підтримкою FPS-керування.
 *
 * Ініціалізує `THREE.PerspectiveCamera` і підключає до неї `FPSControls`.
 * При зміні розміру вікна автоматично оновлює aspect ratio.
 *
 * @property {THREE.PerspectiveCamera} instance - Екземпляр камери Three.js.
 * @property {FPSControls}             controls - Контролер клавіатури та PointerLock.
 */
export default class Camera {
    constructor() {
        this.app    = new Application();
        this.sizes  = this.app.sizes;
        this.scene  = this.app.scene;
        this.canvas = this.app.canvas;

        this.setInstance();
        this.setControls();
    }

    /**
     * Ініціалізує камеру з початковою позицією у сцені.
     */
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            75,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        this.instance.position.set(3, 2, 5);
        this.scene.add(this.instance);
    }

    /**
     * Підключає FPS-контролер до камери.
     */
    setControls() {
        this.controls = new FPSControls(this.instance, this.canvas);
    }

    /**
     * Оновлює aspect ratio камери після зміни розміру вікна.
     */
    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    /**
     * Оновлює стан FPS-контролера (рух, інерція).
     * Викликається щокадру через `Application.update()`.
     */
    update() {
        this.controls.update();
    }
}
