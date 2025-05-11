const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, '../template.html'), 'utf8');
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, '../pages.json'), 'utf8'));
const subpagesDir = path.join(__dirname, '..', 'subpages');

pages.forEach(page => {
    const contentPath = path.join(subpagesDir, `${page.namespace}.html`);
    if (!fs.existsSync(contentPath)) {
        console.warn(`⚠️ Skipping: ${page.file} not found`);
        return;
    }

    const content = fs.readFileSync(contentPath, 'utf8');
    const output = template
        .replace(/{TITLE}/g, page.title)
        .replace(/{NAMESPACE}/g, page.namespace)
        .replace(/{CONTENT}/g, content);

    const dirPath = path.join(__dirname, '..', page.folder);
    const filePath = path.join(dirPath, 'index.html');

    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(filePath, output, 'utf8');
    console.log(`✅ Built ${filePath}`);
});