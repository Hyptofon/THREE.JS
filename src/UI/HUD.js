import Application from '../Application.js';
import { HUD_OVERLAY_STYLES } from '../config.js';

/**
 * HUD — ігровий оверлей поверх Canvas.
 *
 * Відображає підказку з керуванням (L-Click / ESC).
 * Автоматично приховується, коли гравець входить в режим польоту,
 * і з'являється знову при виході.
 */
export default class HUD {
    constructor() {
        this.app = new Application();
        this.setOverlay();

        this.app.on('lock',   () => { this.overlay.style.display = 'none'; });
        this.app.on('unlock', () => { this.overlay.style.display = 'block'; });
    }

    /**
     * Створює та додає на сторінку HTML-елемент підказки.
     */
    setOverlay() {
        this.overlay = document.createElement('div');

        Object.assign(this.overlay.style, HUD_OVERLAY_STYLES);


        this.overlay.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <span>
                    <kbd style="background:rgba(255,255,255,0.2); padding:4px 8px; border-radius:4px;
                                border:1px solid rgba(255,255,255,0.4); box-shadow:0 2px 0 rgba(0,0,0,0.2);">
                        L-Click
                    </kbd>
                    Увійти у режим польоту
                </span>
                <div style="width:1px; height:16px; background:rgba(255,255,255,0.2);"></div>
                <span>
                    <kbd style="background:rgba(255,255,255,0.2); padding:4px 8px; border-radius:4px;
                                border:1px solid rgba(255,255,255,0.4); box-shadow:0 2px 0 rgba(0,0,0,0.2);">
                        ESC
                    </kbd>
                    Вийти до меню
                </span>
                <div style="width:1px; height:16px; background:rgba(255,255,255,0.2);"></div>
                <span>
                    <kbd style="background:rgba(255,255,255,0.2); padding:4px 8px; border-radius:4px;
                                border:1px solid rgba(255,255,255,0.4); box-shadow:0 2px 0 rgba(0,0,0,0.2);">
                        Double-Click
                    </kbd>
                    Повний екран
                </span>
            </div>
        `;

        document.body.appendChild(this.overlay);
    }
}
