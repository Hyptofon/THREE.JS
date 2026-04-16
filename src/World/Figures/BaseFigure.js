import * as THREE from 'three';
import gsap from 'gsap';
import Application from '../../Application.js';

/**
 * BaseFigure — базовий клас для всіх 3D-об'єктів сцени.
 *
 * Відповідає за:
 * - Створення та налаштування `THREE.Mesh` (геометрія + матеріал).
 * - Реєстрацію об'єкта у сцені.
 * - Побудову відповідної папки у Debug UI (lil-gui) зі слайдерами
 *   для Position, Rotation, Scale, Texture та кнопкою Reset.
 *
 * Дочірні класи повинні перевизначати лише метод `setGeometry()`,
 * щоб задати конкретну форму об'єкта.
 */
export default class BaseFigure {
    /**
     * @param {string}            name               - Назва фігури, що відображається у GUI.
     * @param {THREE.Vector3}     initialPosition    - Початкова позиція у сцені.
     * @param {typeof THREE.Material} MaterialClass  - Конструктор Three.js-матеріалу.
     * @param {object}            materialParams     - Параметри ініціалізації матеріалу.
     * @param {string}            defaultTextureName - Ключ стартової текстури з `AssetLoader`.
     */
    constructor(name, initialPosition, MaterialClass, materialParams, defaultTextureName) {
        this.app    = new Application();
        this.scene  = this.app.scene;
        this.debug  = this.app.debug;
        this.assets = this.app.assets;

        this.name               = name;
        this.initialPosition    = initialPosition;
        this.MaterialClass      = MaterialClass;
        this.materialParams     = materialParams;
        this.defaultTextureName = defaultTextureName;
    }

    /**
     * Запускає ланцюжок ініціалізації: геометрія → матеріал → меш → GUI.
     * Викликається в конструкторі дочірнього класу після `super()`.
     */
    init() {
        this.setGeometry();
        this.setMaterial();
        this.setMesh();

        if (this.debug.active) {
            this.setDebug();
        }
    }

    /**
     * Визначає геометрію об'єкта.
     * Має бути перевизначений у дочірньому класі.
     *
     * @example
     * // У Cube.js:
     * setGeometry() {
     *   this.geometry = new THREE.BoxGeometry(1, 1, 1);
     * }
     */
    setGeometry() {}

    /**
     * Створює матеріал, застосовуючи стартову текстуру та
     * зберігаючи початкові параметри для подальшого скидання.
     */
    setMaterial() {
        if (this.defaultTextureName && this.assets.textures[this.defaultTextureName]) {
            this.materialParams.map = this.assets.textures[this.defaultTextureName];
        }

        this.material = new this.MaterialClass(this.materialParams);
        
        // Зберігаємо реальні параметри після ініціалізації матеріалу
        this.initialMaterialConfig = {
            color: this.material.color ? this.material.color.getHexString() : null,
            emissive: this.material.emissive ? this.material.emissive.getHexString() : null,
            specular: this.material.specular ? this.material.specular.getHexString() : null,
            metalness: this.material.metalness ?? null,
            roughness: this.material.roughness ?? null,
            wireframe: false
        };
    }

    /**
     * Створює `THREE.Mesh` із заданою геометрією і матеріалом,
     * встановлює початкову позицію та додає на сцену.
     */
    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.copy(this.initialPosition);
        this.mesh.castShadow    = true;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
    }

    /**
     * Додає до папки GUI випадаюче меню вибору текстури.
     * Вибір "None (Color Only)" прибирає текстуру і відновлює базовий колір.
     *
     * @param {import('lil-gui').GUI} folder - Папка lil-gui, в яку додається елемент.
     */
    addTexturePicker(folder) {
        if (!this.assets?.textures) return;

        const textureNames = ['None (Color Only)', ...Object.keys(this.assets.textures)];
        const state = { currentTexture: this.defaultTextureName || 'None (Color Only)' };

        const apply = (value) => {
            if (value === 'None (Color Only)') {
                this.material.map = null;
                if (this.initialMaterialConfig.color) {
                    this.material.color.set('#' + this.initialMaterialConfig.color);
                }
            } else {
                this.material.map = this.assets.textures[value];
                this.material.color.set('#ffffff'); // Текстури вимагають білого базового кольору
            }
            this.material.needsUpdate = true;
            
            // Синхронізуємо зі слайдером Color
            if (this.material.color && this.guiColors) {
                this.guiColors.color = '#' + this.material.color.getHexString();
            }
        };

        // Зберігаємо колбек для скидання текстури до початкової
        this.resetTextureCallback = () => {
            apply(this.defaultTextureName);
            state.currentTexture = this.defaultTextureName;
        };

        folder.add(state, 'currentTexture', textureNames)
            .name('Texture')
            .onChange(apply);
    }

    /**
     * Будує повну папку налаштувань у Debug UI:
     * позиція, обертання, масштаб, текстура, параметри матеріалу, кнопка скидання.
     */
    setDebug() {
        this.debugFolder = this.debug.ui.addFolder(this.name);

        this.debugFolder.add(this.mesh.position, 'x', -5, 5, 0.01).name('Position X');
        this.debugFolder.add(this.mesh.position, 'y', -5, 5, 0.01).name('Position Y');
        this.debugFolder.add(this.mesh.position, 'z', -5, 5, 0.01).name('Position Z');

        this.debugFolder.add(this.mesh.rotation, 'x', -Math.PI, Math.PI, 0.01).name('Rotation X');
        this.debugFolder.add(this.mesh.rotation, 'y', -Math.PI, Math.PI, 0.01).name('Rotation Y');
        this.debugFolder.add(this.mesh.rotation, 'z', -Math.PI, Math.PI, 0.01).name('Rotation Z');

        this.debugFolder.add(this.mesh.scale, 'x', 0.1, 3, 0.01).name('Scale X');
        this.debugFolder.add(this.mesh.scale, 'y', 0.1, 3, 0.01).name('Scale Y');
        this.debugFolder.add(this.mesh.scale, 'z', 0.1, 3, 0.01).name('Scale Z');

        this.debugFolder.add(this.mesh, 'visible').name('Visible');

        this.addTexturePicker(this.debugFolder);

        this.guiColors = {
            color: this.material.color ? '#' + this.material.color.getHexString() : '#ffffff',
            emissive: this.material.emissive ? '#' + this.material.emissive.getHexString() : '#000000',
            specular: this.material.specular ? '#' + this.material.specular.getHexString() : '#000000'
        };

        if ('color' in this.material) {
            this.debugFolder.addColor(this.guiColors, 'color').name('Color').onChange(v => {
                this.material.color.set(v);
            });
        }
        if ('emissive' in this.material) {
            this.debugFolder.addColor(this.guiColors, 'emissive').name('Emissive').onChange(v => {
                this.material.emissive.set(v);
            });
        }
        if ('specular' in this.material) {
            this.debugFolder.addColor(this.guiColors, 'specular').name('Specular').onChange(v => {
                this.material.specular.set(v);
            });
        }

        if ('metalness' in this.material) this.debugFolder.add(this.material, 'metalness', 0, 1, 0.01).name('Metalness');
        if ('roughness' in this.material) this.debugFolder.add(this.material, 'roughness', 0, 1, 0.01).name('Roughness');
        if ('wireframe' in this.material) this.debugFolder.add(this.material, 'wireframe').name('Wireframe');

        this.debugFolder.add({ reset: () => this.reset() }, 'reset')
            .name(`Reset ${this.name.split(' ')[0]}`);
    }

    /**
     * Повертає об'єкт до початкового стану:
     * позиції, нульового повороту, масштабу 1:1:1,
     * початкових параметрів матеріалу та стартової текстури.
     *
     * Зміни позиції та масштабу анімуються через GSAP (1 сек).
     */
    reset() {
        gsap.to(this.mesh.position, { duration: 1, ...this.initialPosition });
        gsap.to(this.mesh.rotation, { duration: 1, x: 0, y: 0, z: 0 });
        gsap.to(this.mesh.scale,    { duration: 1, x: 1, y: 1, z: 1 });

        this.mesh.visible = true;

        if (this.initialMaterialConfig.metalness !== null) this.material.metalness = this.initialMaterialConfig.metalness;
        if (this.initialMaterialConfig.roughness !== null) this.material.roughness = this.initialMaterialConfig.roughness;
        this.material.wireframe = false;

        // Спочатку скидаємо текстуру
        this.resetTextureCallback?.();

        // Потім примусово відновлюємо оригінальні кольори (окрім Base Color, якщо є текстура)
        if (this.initialMaterialConfig.color && !this.material.map) {
            this.material.color.set('#' + this.initialMaterialConfig.color);
            this.guiColors.color = '#' + this.initialMaterialConfig.color;
        }
        if (this.initialMaterialConfig.emissive) {
            this.material.emissive.set('#' + this.initialMaterialConfig.emissive);
            this.guiColors.emissive = '#' + this.initialMaterialConfig.emissive;
        }
        if (this.initialMaterialConfig.specular) {
            this.material.specular.set('#' + this.initialMaterialConfig.specular);
            this.guiColors.specular = '#' + this.initialMaterialConfig.specular;
        }
    }
}
