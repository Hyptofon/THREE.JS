/**
 * config.js — центральне сховище кольорів та констант проекту.
 *
 * Усі кольори, що використовуються в Three.js-матеріалах, освітленні
 * та UI-елементах зберігаються тут. Щоб змінити колір у всьому проекті —
 * достатньо відредагувати одне значення в цьому файлі.
 */

// ─── Освітлення сцени ─────────────────────────────────────────────────────────

/** Колір фонового (ambient) освітлення. */
export const COLOR_AMBIENT_LIGHT = 0xffffff;

/** Колір спрямованого (directional) освітлення. */
export const COLOR_DIRECTIONAL_LIGHT = 0xffafff;

/** Колір точкового (point) освітлення. */
export const COLOR_POINT_LIGHT = 0x6644ff;

/** Колір фону сцени Three.js. */
export const COLOR_SCENE_BACKGROUND = '#1a1a1a';


// ─── Матеріал TorusKnot (Phong) ───────────────────────────────────────────────

/** Колір дзеркального відблиску (specular highlight) вузла тора. */
export const COLOR_TORUSKNOT_SPECULAR = '#ff6600';

/** Колір внутрішнього світіння (emissive) вузла тора. */
export const COLOR_TORUSKNOT_EMISSIVE = '#330800';


// ─── UI / HUD ─────────────────────────────────────────────────────────────────

/**
 * Стилі HUD-оверлею (підказка L-Click / ESC).
 * Зберігаються як об'єкт для зручного застосування через Object.assign().
 */
export const HUD_OVERLAY_STYLES = {
    position:             'absolute',
    bottom:               '40px',
    left:                 '50%',
    transform:            'translateX(-50%)',
    color:                '#ffffff',
    background:           'rgba(20, 20, 25, 0.4)',
    backdropFilter:       'blur(10px)',
    webkitBackdropFilter: 'blur(10px)',
    border:               '1px solid rgba(255, 255, 255, 0.1)',
    padding:              '12px 24px',
    borderRadius:         '12px',
    fontFamily:           'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize:             '14px',
    letterSpacing:        '0.5px',
    pointerEvents:        'none',
    zIndex:               '9999',
    boxShadow:            '0 8px 32px rgba(0, 0, 0, 0.3)',
};
