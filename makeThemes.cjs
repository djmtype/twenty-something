const fs = require('fs');

const inputFilePath = './src/data/tokens.json';
const outputDir = './src/styles/themes/';

const data = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const lightCss = generateCss(data.props.theme.light, 'light');
const darkCss = generateCss(data.props.theme.dark, 'dark');
const themeCss = generateThemeCss(data.props.theme);
const variablesCss = generateVariablesCss(data.props.global);

const lightOutputPath = `${outputDir}props.light.css`;
const darkOutputPath = `${outputDir}props.dark.css`;
const themeOutputPath = `${outputDir}theme.css`;
const variablesOutputPath = `${outputDir}global.css`;

fs.writeFileSync(lightOutputPath, lightCss);
fs.writeFileSync(darkOutputPath, darkCss);
fs.writeFileSync(themeOutputPath, themeCss);
fs.writeFileSync(variablesOutputPath, variablesCss);

console.log(`Generated CSS files for light and dark themes, theme.css, and variables.css.`);

function generateCss(themeData, suffix) {
  let css = `/* ${suffix.charAt(0).toUpperCase() + suffix.slice(1)} Theme */\n\n`;

  css += 'html {\n';

  Object.keys(themeData).forEach(key => {
    const variableName = `  --${key}-${suffix}`;
    const value = `: ${themeData[key]};`;

    css += `${variableName}${value}\n`;
  });

  css += '}\n';

  return css;
}

function generateThemeCss(themeData) {
  let css = `@import "./props.light.css";\n@import "./props.dark.css";\n\n`;

  css += `:root,\n:root[data-theme="light"] {\n  color-scheme: light;\n`;

  Object.keys(themeData.light).forEach(key => {
    const variableName = `  --${key}`;
    const value = `: var(--${key}-light);`;

    css += `${variableName}${value}\n`;
  });

  css += '}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    color-scheme: dark;\n';

  Object.keys(themeData.dark).forEach(key => {
    const variableName = `    --${key}`;
    const value = `: var(--${key}-dark);`;

    css += `${variableName}${value}\n`;
  });

  css += '}\n}\n\n:root[data-theme="dark"] {\n  color-scheme: dark;\n';

  Object.keys(themeData.dark).forEach(key => {
    const variableName = `  --${key}`;
    const value = `: var(--${key}-dark);`;

    css += `${variableName}${value}\n`;
  });

  css += '}\n';

  return css;
}

function generateVariablesCss(variablesData) {
  let css = `:root {\n`;

  Object.keys(variablesData).forEach(key => {
    const variableName = `  --${key}`;
    const value = `: ${variablesData[key]};`;

    css += `${variableName}${value}\n`;
  });

  css += '}\n';

  return css;
}
