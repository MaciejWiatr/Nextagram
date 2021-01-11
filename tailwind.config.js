module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: [
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            minWidth: {
                img: "20px",
                "img-lg": "6rem",
            },
            zIndex: {
                modal: "999",
                max: "9999",
            },
        },
    },
    variants: {},
    plugins: [],
};
