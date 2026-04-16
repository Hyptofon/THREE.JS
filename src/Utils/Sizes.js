import EventEmitter from './EventEmitter.js';

/**
 * Sizes — слідкує за розміром вікна браузера.
 *
 * Зберігає поточну ширину, висоту та піксельну щільність екрана.
 * При зміні розміру вікна автоматично оновлює значення та випускає
 * подію `'resize'`, на яку підписані Camera та Renderer.
 *
 * @extends EventEmitter
 *
 * @property {number} width     - Поточна ширина вікна (px).
 * @property {number} height    - Поточна висота вікна (px).
 * @property {number} pixelRatio - Піксельна щільність (обмежена до 2).
 */
export default class Sizes extends EventEmitter {
    constructor() {
        super();

        this.width      = window.innerWidth;
        this.height     = window.innerHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        window.addEventListener('resize', () => {
            this.width      = window.innerWidth;
            this.height     = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);

            this.trigger('resize');
        });

        // Обробка повноекранного режиму (Fullscreen) по подвійному кліку
        window.addEventListener('dblclick', () => {
            const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

            if(!fullscreenElement) {
                if(document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if(document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                }
            } else {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        });
    }
}
