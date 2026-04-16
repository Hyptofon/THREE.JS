import Application from './src/Application.js';

/**
 * Точка входу (Entry Point) застосунку.
 *
 * Відповідає лише за пошук Canvas-елемента в DOM-дереві та
 * ініціалізацію головного класу Application. Весь подальший
 * життєвий цикл (рендеринг, фізика, UI) керується зсередини класу.
 */
const canvas = document.querySelector('canvas.webgl');
const app = new Application(canvas);
