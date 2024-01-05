module.exports = {
    root: true, // Make sure eslint picks up the config at the root of the directory
    parserOptions: {
        ecmaVersion: 2020, // Use the latest ecmascript standard
        sourceType: 'module' // Allows using import/export statements
    },
    env: {
        es6: true,
        browser: false, // Enables browser globals like window and document
        amd: true, // Enables require() and define() as global variables as per the amd spec.
        node: true // Enables Node.js global variables and Node.js scoping.
    },
    plugins: ['simple-import-sort', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
    ],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error'
    }
};
