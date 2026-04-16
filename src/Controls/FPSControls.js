import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import Application from '../Application.js';

/**
 * FPSControls — керування камерою в режимі вільного польоту.
 *
 * Блокує курсор миші при кліку на сцену (PointerLock API) та дозволяє
 * пересуватися за допомогою клавіш W/A/S/D. Використовує фізику
 * на основі прискорення та тертя для плавного руху.
 *
 * Керування:
 * - Лівий клік на сцені — увійти в режим польоту (курсор зникає).
 * - W/A/S/D           — рух вперед / вліво / назад / вправо.
 * - ESC               — вийти з режиму польоту, курсор повертається.
 */
export default class FPSControls {
    /**
     * @param {THREE.PerspectiveCamera} camera - Камера, якою треба керувати.
     * @param {HTMLCanvasElement}       canvas - Canvas-елемент для прослуховування кліку.
     */
    constructor(camera, canvas) {
        this.app    = new Application();
        this.camera = camera;
        this.canvas = canvas;

        /** Вектор поточної швидкості камери (використовується для інерції). */
        this.velocity = new THREE.Vector3();

        /** Поточний стан натиснутих клавіш. */
        this.keys = { w: false, a: false, s: false, d: false };

        this.setInstance();
        this.setInputListeners();
    }

    /**
     * Ініціалізує PointerLockControls та прив'язує до canvas.
     * При заблокуванні/розблокуванні курсора сповіщає застосунок
     * через глобальні події `'lock'` та `'unlock'`.
     */
    setInstance() {
        this.instance = new PointerLockControls(this.camera, this.canvas);

        this.canvas.addEventListener('click', () => this.instance.lock());

        this.instance.addEventListener('lock',   () => this.app.trigger('lock'));
        this.instance.addEventListener('unlock', () => this.app.trigger('unlock'));
    }

    /**
     * Реєструє обробники подій клавіатури для відстеження W/A/S/D.
     */
    setInputListeners() {
        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (key in this.keys) this.keys[key] = true;
        });

        window.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            if (key in this.keys) this.keys[key] = false;
        });
    }

    /**
     * Оновлює позицію камери на основі натиснутих клавіш.
     * Застосовує прискорення та тертя для плавності руху.
     * Викликається щокадру через `Camera.update()`.
     */
    update() {
        // Обмежуємо deltaTime, якщо вкладка була неактивна,
        // щоб уникнути великих стрибків позиції.
        const delta = Math.min(this.app.time.deltaTime, 0.1);

        if (this.instance.isLocked) {
            // Затухання швидкості (симуляція тертя)
            this.velocity.multiplyScalar(1 - 5.0 * delta);

            const forward = new THREE.Vector3();
            this.camera.getWorldDirection(forward);

            const right = new THREE.Vector3();
            right.crossVectors(forward, this.camera.up).normalize();

            const accel = 50.0 * delta;

            if (this.keys.w) this.velocity.addScaledVector(forward,  accel);
            if (this.keys.s) this.velocity.addScaledVector(forward, -accel);
            if (this.keys.d) this.velocity.addScaledVector(right,    accel);
            if (this.keys.a) this.velocity.addScaledVector(right,   -accel);

            this.camera.position.addScaledVector(this.velocity, delta);
        } else {
            // Скидаємо швидкість, коли курсор розблоковано
            this.velocity.set(0, 0, 0);
        }
    }
}
