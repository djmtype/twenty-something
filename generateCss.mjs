import fs from 'fs';
import path from 'path';

// Define paths
const inputFilePath = './src/data/tokens.json';
const outputDir = './src/styles/theme/';

// Ensure the theme directory exists, and clean up any existing files
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created theme directory: ${outputDir}`);
} else {
  // Delete existing files in the theme directory
  fs.readdirSync(outputDir).forEach((file) => {
    const filePath = path.join(outputDir, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted existing file: ${filePath}`);
  });
}

// Read and parse tokens.json as utf8
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading tokens.json at ${inputFilePath}:`, err);
    return;
  }

  const tokens = JSON.parse(data);
  const globalProps = tokens.props.global;
  const lightTheme = tokens.props.theme.light;
  const darkTheme = tokens.props.theme.dark;

  // Generate global.css content
  const globalCSSContent = `/* Autogenerated from ${inputFilePath} */\n:root {\n${Object.entries(globalProps)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n')}\n}`;

  // Write global.css
  fs.writeFile(path.join(outputDir, 'global.css'), globalCSSContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing global.css:', err);
    } else {
      console.log('global.css has been generated successfully.');
    }
  });

  // Generate props.css content
  const propsCSSContent = `/* Autogenerated from ${inputFilePath} */\nhtml {\n${Object.keys(lightTheme)
    .map((key) => {
      if (key in darkTheme) {
        return `  --${key}: light-dark(${lightTheme[key]}, ${darkTheme[key]});`;
      }
      return `  --${key}: ${lightTheme[key]};`;
    })
    .join('\n')}\n}`;

  // Write props.css
  fs.writeFile(path.join(outputDir, 'props.css'), propsCSSContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing props.css:', err);
    } else {
      console.log('props.css has been generated successfully.');
    }
  });

  // Generate modes.css content
  const modesCSSContent = `/* Autogenerated from ${inputFilePath} */\n:where(html) {
  --light-scheme: initial;
  --dark-scheme: ;
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  :where(html) {
    --light-scheme: ;
    --dark-scheme: initial;
  }
}

:where([data-scheme="light"]) {
  color-scheme: light;
}

:where([data-scheme="dark"]) {
  color-scheme: dark;
}`;

  // Write modes.css
  fs.writeFile(path.join(outputDir, 'modes.css'), modesCSSContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing modes.css:', err);
    } else {
      console.log('modes.css has been generated successfully.');
    }
  });

  // Generate important.md content
  const importantMDContent = `# Important

Do not modify any files within the \`theme\` directory. Instead, visit the [/src/data/tokens.json](/src/data/tokens.json) file to make any changes.`;

  // Write important.md
  fs.writeFile(path.join(outputDir, 'important.md'), importantMDContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing important.md:', err);
    } else {
      console.log('important.md has been generated successfully.');
    }
  });

  // Generate index.css content with imports for modes.css, props.css, and global.css
  const indexCSSContent = `/* Autogenerated from ${inputFilePath} */\n@import './modes.css';\n@import './props.css';\n@import './global.css';`;

  // Write index.css
  fs.writeFile(path.join(outputDir, 'theme.css'), indexCSSContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing index.css:', err);
    } else {
      console.log('theme.css has been generated successfully.');
    }
  });
});
