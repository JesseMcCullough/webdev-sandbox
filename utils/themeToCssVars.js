export default function themeToCssVars(theme, prefix = "") {
    const style = {};

    Object.entries(theme).forEach(([key, value]) => {
        // converts camelCase to kebab-case
        const cssKey = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

        if (typeof value === "object" && value !== null) {
            Object.assign(
                style,
                themeToCssVars(value, prefix ? `${prefix}-${cssKey}` : cssKey)
            );
        } else {
            style[`--${prefix ? `${prefix}-` : ""}${cssKey}`] = value;
        }
    });

    return style;
}
