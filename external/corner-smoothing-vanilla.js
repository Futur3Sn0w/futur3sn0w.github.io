import { getSvgPath } from "../node_modules/figma-squircle/dist/index.js";
const createClassName = (length = 8) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `squircle-${result}`;
};
const setCss = (css, styleId) => {
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
    }
    styleEl.textContent = css;
};
export const renderSquircle = (el, opts, className) => {
    const width = el.clientWidth;
    const height = el.clientHeight;
    const augmentedOpts = {
        preserveSmoothing: true,
        cornerSmoothing: 1,
        width,
        height,
        ...opts,
    };
    if (!opts.borderWidth) {
        el.style.clipPath = `path('${getSvgPath(augmentedOpts)}')`;
    }
    else {
        el.classList.add(className);
        setCss(`
        .${className} {
          position: relative;
          clip-path: path('${getSvgPath(augmentedOpts)}');
        }

        .${className}::before {
          content: '';
          display: block;
          position: absolute;
          inset: ${opts.borderWidth}px;  
          z-index: -1;
          clip-path: path('${getSvgPath({
            ...augmentedOpts,
            width: width - opts.borderWidth * 2,
            height: height - opts.borderWidth * 2,
            cornerRadius: opts.cornerRadius - opts.borderWidth,
        })}');
        }
      `, `style-${className}`);
    }
};
export const squircleObserver = (el, opts) => {
    const className = createClassName();
    // Initialize as `undefined` to always run directly when instantiating.
    let dimensions = undefined;
    const func = (newOpts) => {
        if (newOpts !== undefined) {
            opts = newOpts;
        }
        return renderSquircle(el, opts, className);
    };
    const resizeObserver = new ResizeObserver(() => {
        const prevDimemsions = dimensions;
        dimensions = [el.clientWidth, el.clientHeight];
        // Run only if dimensions changed, for performance.
        if (prevDimemsions?.[0] !== dimensions[0] ||
            prevDimemsions?.[1] !== dimensions[1]) {
            func();
        }
    });
    // It calls the callback directly.
    resizeObserver.observe(el);
    // The native code `resizeObserver.disconnect` needs the correct context.
    // Retain the context by wrapping in arrow function. Read more about this:
    // https://stackoverflow.com/a/9678166/19306180
    func.disconnect = () => {
        el.classList.remove(className);
        document.querySelector(`#style-${className}`)?.remove();
        resizeObserver.disconnect();
    };
    return func;
};
//# sourceMappingURL=corner-smoothing-vanilla.js.map