module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: ['airbnb', 'prettier', 'prettier/react'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        indent: 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
    },
};
