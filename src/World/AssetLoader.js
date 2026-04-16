import * as THREE from 'three';
import Application from '../Application.js';

/**
 * AssetLoader — завантажувач текстур для сцени.
 *
 * Завантажує всі текстури під час ініціалізації і надає до них доступ
 * за назвою. Використовується для матеріалів фігур та фону сцени.
 *
 * @property {Object<string, THREE.Texture>} textures - Словник завантажених текстур.
 */
export default class AssetLoader {
    constructor() {
        this.app = new Application();
        this.textureLoader = new THREE.TextureLoader();

        this.textures = {};
        this.setupTextures();
    }

    /**
     * Завантажує всі текстури, визначені в `this.textures`.
     */
    setupTextures() {
        // Усі доступні базові текстури для сцени
        this.textures = {
            "Neon Cyber": this.loadMap("/textures/map_neon_cyber.png"),
            "Galaxy": this.loadMap("/textures/map_galaxy.png"),
            "Plasma": this.loadMap("/textures/map_plasma.png"),
            "OBSIDIAN": this.loadMap("/textures/map_obsidian.png"),
            "Lava": this.loadMap("/textures/map_lava.png"),
            "Crystal": this.loadMap("/textures/map_crystal.png")
        };
    }

    /**
     * Завантажує одну текстуру з заданим URL.
     * Автоматично встановлює `colorSpace` та `wrapS`/`wrapT`.
     *
     * @param {string} url - Шлях до текстури.
     * @returns {THREE.Texture} Завантажена текстура.
     */
    loadMap(url) {
        const tex = this.textureLoader.load(url);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        return tex;
    }

    /**
     * Повертає текстуру за її назвою.
     *
     * @param {string} name - Назва текстури.
     * @returns {THREE.Texture | undefined} Текстура або `undefined`, якщо не знайдено.
     */
    getTexture(name) {
        return this.textures[name];
    }
}
