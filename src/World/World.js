import Application from '../Application.js';
import Environment from './Environment.js';
import Cube from './Figures/Cube.js';
import Sphere from './Figures/Sphere.js';
import Torus from './Figures/Torus.js';
import Cone from './Figures/Cone.js';
import TorusKnot from './Figures/TorusKnot.js';
import gsap from 'gsap';

export default class World {
    constructor() {
        this.app = new Application();
        this.scene = this.app.scene;
        this.assets = this.app.assets;

        // 1. Оточення (Світло, Фон)
        this.environment = new Environment();

        // 2. Ініціалізація фігур (Кожна фігура сама реєструє себе в сцені і UI)
        this.figures = [
            new Cube(),
            new Sphere(),
            new Torus(),
            new Cone(),
            new TorusKnot()
        ];

        // 3. Додаємо налаштування і фізику анімацій
        this.setAnimations();
    }

    setAnimations() {
        if (!this.app.debug.active) return;
        
        this.animationFolder = this.app.debug.ui.addFolder("Animation & Resets");

        this.animationParams = {
            autoRotate: false,
            rotationSpeed: 1,
            bounce: false,
            resetPositions: () => {
                this.figures.forEach(figure => {
                    gsap.to(figure.mesh.position, { duration: 1, ...figure.initialPosition });
                });
            },
            resetRotations: () => {
                this.figures.forEach(figure => {
                    gsap.to(figure.mesh.rotation, { duration: 1, x: 0, y: 0, z: 0 });
                });
            },
            resetScales: () => {
                this.figures.forEach(figure => {
                    gsap.to(figure.mesh.scale, { duration: 1, x: 1, y: 1, z: 1 });
                });
            },
            resetAll: () => {
                this.figures.forEach(figure => figure.reset());
            }
        };

        this.animationFolder.add(this.animationParams, "autoRotate").name("Auto Rotate");
        this.animationFolder.add(this.animationParams, "rotationSpeed").min(0.1).max(5).step(0.1).name("Rotation Speed");
        this.animationFolder.add(this.animationParams, "bounce").name("Bounce Animation");
        this.animationFolder.add(this.animationParams, "resetPositions").name("Reset Positions");
        this.animationFolder.add(this.animationParams, "resetRotations").name("Reset Rotations");
        this.animationFolder.add(this.animationParams, "resetScales").name("Reset Scales");
        this.animationFolder.add(this.animationParams, "resetAll").name("Reset All Parameters");
    }

    update() {
        // Called every frame
        const elapsedTime = this.app.time.elapsedTime;
        
        // Auto rotation
        if (this.animationParams?.autoRotate) {
             const speed = this.animationParams.rotationSpeed;
             this.figures[0].mesh.rotation.y = elapsedTime * speed * 0.5; // Cube
             this.figures[1].mesh.rotation.x = elapsedTime * speed * 0.3; // Sphere
             this.figures[2].mesh.rotation.y = elapsedTime * speed * 0.7; // Torus
             this.figures[3].mesh.rotation.z = elapsedTime * speed * 0.4; // Cone
             this.figures[4].mesh.rotation.x = elapsedTime * speed * 0.6; // TorusKnot
             this.figures[4].mesh.rotation.y = elapsedTime * speed * 0.4;
        }

        // Bounce
        if (this.animationParams?.bounce) {
            this.figures[0].mesh.position.y = Math.sin(elapsedTime * 2) * 0.5;
            this.figures[1].mesh.position.y = Math.sin(elapsedTime * 2 + Math.PI * 0.5) * 0.5;
            this.figures[2].mesh.position.y = Math.sin(elapsedTime * 2 + Math.PI) * 0.5;
            this.figures[3].mesh.position.y = 2 + Math.sin(elapsedTime * 2 + Math.PI * 1.5) * 0.5;
            this.figures[4].mesh.position.y = 2 + Math.sin(elapsedTime * 2 + Math.PI * 0.25) * 0.5;
        }
    }
}
