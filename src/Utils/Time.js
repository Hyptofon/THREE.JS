import * as THREE from 'three';
import EventEmitter from './EventEmitter.js';

/**
 * Time — ігровий цикл і таймер кадрів.
 *
 * Запускає `requestAnimationFrame` і вираховує час між кадрами.
 * При кожному кадрі випускає подію `'tick'`, на яку підписані
 * Renderer, Camera та World для синхронного оновлення.
 *
 * @extends EventEmitter
 *
 * @property {number} elapsedTime - Час (сек) з моменту старту програми.
 * @property {number} deltaTime   - Час (сек), що минув між двома попередніми кадрами.
 */
export default class Time extends EventEmitter {
    constructor() {
        super();

        this.clock        = new THREE.Clock();
        this.previousTime = 0;
        this.elapsedTime  = 0;
        this.deltaTime    = 0;

        this.tick();
    }

    /**
     * Внутрішній callback ігрового циклу.
     * Оновлює `elapsedTime` та `deltaTime`, після чого сповіщає підписників.
     */
    tick() {
        this.elapsedTime  = this.clock.getElapsedTime();
        this.deltaTime    = this.elapsedTime - this.previousTime;
        this.previousTime = this.elapsedTime;

        this.trigger('tick');

        window.requestAnimationFrame(() => this.tick());
    }
}
