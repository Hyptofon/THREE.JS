import { GUI } from 'lil-gui';

/**
 * Debug — панель налаштувань розробника на основі lil-gui.
 *
 * Ініціалізує GUI-панель та надає метод `syncGui()` для синхронізації
 * значень слайдерів з анімованими властивостями GSAP.
 *
 * @property {boolean}     active - `true`, якщо GUI увімкнено (за замовчуванням увімкнено).
 * @property {import('lil-gui').GUI} [ui] - Екземпляр lil-gui. Відсутній, якщо `active === false`.
 */
export default class Debug {
    constructor() {
        this.active = window.location.hash !== '#debug-off';

        if (this.active) {
            this.ui = new GUI({ title: 'Debug UI', width: 350 });
            this.ui.domElement.style.maxHeight  = '95vh';
            this.ui.domElement.style.overflowY  = 'auto';
            this.ui.domElement.style.paddingRight = '5px';
        }
    }

    /**
     * Обходить всі контролери GUI і вмикає на них `listen()`,
     * щоб слайдери автоматично відображали зміни, зроблені через GSAP.
     *
     * Викликається один раз після повної ініціалізації сцени.
     *
     * @param {import('lil-gui').GUI} [folder=this.ui] - Папка для обходу (рекурсивно).
     */
    syncGui(folder = this.ui) {
        if (!this.active || !folder) return;

        folder.controllers?.forEach(c => {
            if (c.getValue && typeof c.getValue() !== 'function') c.listen();
        });

        const subs = Array.isArray(folder.folders)
            ? folder.folders
            : Object.values(folder.folders ?? {});

        subs.forEach(sub => this.syncGui(sub));
    }
}
