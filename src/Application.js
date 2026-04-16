import * as THREE from 'three';
import EventEmitter from './Utils/EventEmitter.js';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Debug from './UI/Debug.js';
import HUD from './UI/HUD.js';
import AssetLoader from './World/AssetLoader.js';
import Camera from './World/Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';

let instance = null;

/**
 * Application — центральна точка входу до застосунку.
 *
 * Відповідає за ініціалізацію всіх підсистем у правильному порядку
 * та за перенаправлення системних подій (resize, tick) до відповідних модулів.
 *
 * Існує лише один екземпляр. Будь-який клас може отримати доступ до нього
 * через `new Application()` — конструктор поверне той самий об'єкт.
 *
 * @extends EventEmitter
 *
 * @property {HTMLCanvasElement} canvas   - Canvas-елемент рендерингу.
 * @property {Sizes}     sizes            - Поточний розмір вікна.
 * @property {Time}      time             - Ігровий таймер і цикл кадрів.
 * @property {THREE.Scene} scene          - Кореневий контейнер Three.js-сцени.
 * @property {Debug}     debug            - Панель розробника (lil-gui).
 * @property {AssetLoader} assets         - Завантажені текстури та ресурси.
 * @property {Camera}    camera           - Камера і FPS-керування.
 * @property {Renderer}  renderer         - WebGL-рендерер.
 * @property {World}     world            - Весь вміст сцени (об'єкти, освітлення).
 * @property {HUD}       hud              - HTML-елементи поверх полотна.
 */
export default class Application extends EventEmitter {
    /**
     * @param {HTMLCanvasElement} [canvas] - Canvas-елемент. Потрібен лише при першому виклику.
     */
    constructor(canvas) {
        super();

        if (instance) {
            return instance;
        }
        instance = this;
        window.app = this;

        this.canvas = canvas;
        this.sizes  = new Sizes();
        this.time   = new Time();
        this.scene  = new THREE.Scene();

        // Порядок ініціалізації важливий:
        // Debug і Assets мають бути готові до того, як World почне будувати об'єкти.
        this.debug    = new Debug();
        this.assets   = new AssetLoader();
        this.camera   = new Camera();
        this.renderer = new Renderer();
        this.world    = new World();
        this.hud      = new HUD();

        if (this.debug.active) {
            this.debug.syncGui();
        }

        this.sizes.on('resize', () => this.resize());
        this.time.on('tick',    () => this.update());
    }

    /**
     * Викликається автоматично при зміні розміру вікна браузера.
     * Передає подію до Camera та Renderer.
     */
    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    /**
     * Викликається кожного кадру (через Time).
     * Оновлює стан сцени та рендерить зображення.
     */
    update() {
        this.camera.update();
        this.world?.update();
        this.renderer.update(this.camera.instance);
    }
}
