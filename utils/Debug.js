// Debug.js
export default class Debug {
    constructor(tag, options = {}) {
        this.tag = tag;
        this.enabled = options.enabled ?? false;
        this.colors = {
            log: options.logColor || "#4caf50",
            warn: options.warnColor || "#ff9800",
            error: options.errorColor || "#f44336",
            group: options.groupColor || "#2196f3",
        };
    }

    // Enable/disable this debug instance
    set(value = true) {
        this.enabled = value;
    }

    // Simple log
    log(...args) {
        if (!this.enabled) return;
        console.log(
            `%c[DEBUG - ${this.tag}]`,
            `color: ${this.colors.log}; font-weight: bold;`,
            ...args
        );
    }

    // Warning log
    warn(...args) {
        if (!this.enabled) return;
        console.warn(
            `%c[DEBUG - ${this.tag} WARN]`,
            `color: ${this.colors.warn}; font-weight: bold;`,
            ...args
        );
    }

    // Error log
    error(...args) {
        if (!this.enabled) return;
        console.error(
            `%c[DEBUG - ${this.tag} ERROR]`,
            `color: ${this.colors.error}; font-weight: bold;`,
            ...args
        );
    }

    // Collapsible group
    group(label, fn) {
        if (!this.enabled) return;
        this.groupStart(label, fn);
        this.groupEnd();
    }

    groupStart(label, fn) {
        if (!this.enabled) return;
        console.groupCollapsed(
            `%c[DEBUG - ${this.tag}] ${label}`,
            `color: ${this.colors.group}; font-weight: bold;`
        );
        fn && fn();
    }

    groupEnd() {
        console.groupEnd();
    }
}
