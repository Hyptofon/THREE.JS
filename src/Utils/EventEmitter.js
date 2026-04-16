/**
 * EventEmitter — система подій для зв'язку між компонентами.
 *
 * Дозволяє класам підписуватися на будь-які події та отримувати сповіщення,
 * не маючи прямих посилань один на одного.
 *
 * @example
 * class Foo extends EventEmitter {}
 * const foo = new Foo();
 *
 * foo.on('change', (value) => console.log('changed:', value));
 * foo.trigger('change', [42]);
 */
export default class EventEmitter {
    constructor() {
        /** @type {Object<string, Function[]>} */
        this.events = {};
    }

    /**
     * Підписує функцію-обробник на вказану подію.
     *
     * @param {string}   event    - Назва події.
     * @param {Function} listener - Функція, яка буде викликана при спрацюванні події.
     */
    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    /**
     * Видаляє конкретну функцію-обробник із вказаної події.
     *
     * @param {string}   event    - Назва події.
     * @param {Function} listener - Функція, яку потрібно видалити.
     */
    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    /**
     * Викликає всіх підписаних обробників для вказаної події.
     *
     * @param {string} event      - Назва події.
     * @param {Array}  [args=[]]  - Масив аргументів, що передаються кожному обробнику.
     */
    trigger(event, args = []) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener.apply(this, args));
        }
    }
}
