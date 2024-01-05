const { ESLint } = require('eslint');
const fs = require('fs');
(async function main() {
    // 1. Create an instance.
    const eslint = new ESLint();

    // 2. Lint files.
    const results = await eslint.lintFiles([
        '../../pages/**/*.jsx',
        '../../pages/**/*.js',
        '../../ui/**/*.jsx',
        '../../ui/**/*.js',
        '../../schemas/**/*.js'
    ]);

    // 4. Output it.
    const messages = results
        .filter((e) => e.messages.find((e) => e.ruleId === '@pixelium/a-without-href'))
        .map((e) => {
            const messages = e.messages.filter((e) => e.ruleId === '@pixelium/a-without-href');
            return messages.map((m) => `${e.filePath} - ${m.line}:${m.column} ${m.message}`);
        })
        .flat()
        .join('\n');
    fs.writeFileSync('A-WITHOUT-HREF.log', messages);
})().catch((error) => {
    process.exitCode = 1;
    console.error(error);
});
