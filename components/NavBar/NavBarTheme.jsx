function toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function themeToCssVars(themeObj, prefix = "") {
    let css = "";
    Object.entries(themeObj).forEach(([key, value]) => {
        const cssKey = `${prefix}${toKebabCase(key)}`;
        if (typeof value === "object" && value !== null) {
            css += themeToCssVars(value, `${cssKey}-`);
        } else {
            css += `--${cssKey}: ${value};`;
        }
    });
    return css;
}

export default function NavBarTheme({ name, theme, children }) {
    const cssVars = themeToCssVars(theme);

    return (
        <>
            <style>{`.${name} { ${cssVars} }`}</style>
            {children}
        </>
    );
}
