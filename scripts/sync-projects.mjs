// 00ProjectSun/scripts/sync-projects.mjs
// Synchronizes frontend assets from workspace project directories into public/projects/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const configPath = path.join(rootDir, 'projects.json');
if (!fs.existsSync(configPath)) {
  console.error(`Config file not found at ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

console.log('🚀 Synchronizing projects into portfolio...\n');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

for (const project of config.projects) {
  console.log(`📦 Processing project: ${project.name} (${project.slug})`);
  const targetDir = path.resolve(rootDir, project.targetDir);
  fs.mkdirSync(targetDir, { recursive: true });

  // 1. Copy static source directory if specified
  if (project.sourceDir) {
    const sourceDir = path.resolve(rootDir, project.sourceDir);
    if (fs.existsSync(sourceDir)) {
      console.log(`  -> Copying assets from ${sourceDir}`);
      copyRecursive(sourceDir, targetDir);

      // Also copy flattened css/style.css -> style.css and js/main.js -> main.js if present
      const nestedCss = path.join(targetDir, 'css', 'style.css');
      const rootCss = path.join(targetDir, 'style.css');
      if (fs.existsSync(nestedCss) && !fs.existsSync(rootCss)) {
        fs.copyFileSync(nestedCss, rootCss);
      }

      const nestedJs = path.join(targetDir, 'js', 'main.js');
      const rootJs = path.join(targetDir, 'main.js');
      if (fs.existsSync(nestedJs) && !fs.existsSync(rootJs)) {
        fs.copyFileSync(nestedJs, rootJs);
      }
    } else {
      console.warn(`  ⚠️ Source directory does not exist: ${sourceDir}`);
    }
  }

  // 2. Process HTML template if specified
  if (project.template) {
    const templatePath = path.resolve(rootDir, project.template);
    if (fs.existsSync(templatePath)) {
      console.log(`  -> Injecting runtime config into template ${templatePath}`);
      let html = fs.readFileSync(templatePath, 'utf8');

      // Adjust static asset paths to relative paths
      html = html.replace(/(href|src)=["']\/static\/css\/style\.css["']/g, '$1="./style.css"');
      html = html.replace(/(href|src)=["']\/static\/js\/main\.js["']/g, '$1="./main.js"');
      html = html.replace(/(href|src)=["']\/static\//g, '$1="./');

      // Inject runtime project config
      const configScript = `
    <!-- Injected by Portfolio Sync Pipeline -->
    <script>
      window.PROJECT_CONFIG = {
        name: ${JSON.stringify(project.name)},
        slug: ${JSON.stringify(project.slug)},
        apiBaseUrl: ${JSON.stringify(project.apiBaseUrl || '')}
      };
    </script>
`;
      if (html.includes('</head>')) {
        html = html.replace('</head>', `${configScript}</head>`);
      } else {
        html = configScript + html;
      }

      fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
      console.log(`  -> Generated ${path.join(targetDir, 'index.html')}`);
    } else {
      console.warn(`  ⚠️ Template not found: ${templatePath}`);
    }
  }

  // 3. Copy preview image if specified
  if (project.previewImage) {
    const previewSrc = path.resolve(rootDir, project.previewImage);
    const previewDest = path.join(targetDir, 'preview.webp');
    if (fs.existsSync(previewSrc) && previewSrc !== previewDest) {
      fs.copyFileSync(previewSrc, previewDest);
    }
  }

  console.log(`  ✅ Synced successfully.\n`);
}

console.log('✨ All projects synchronized.');

