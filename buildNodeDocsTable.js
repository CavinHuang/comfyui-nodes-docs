// build nodes docs table
// Usage: ./buildNodeDocsTable.sh
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, './docs');

const files = fs.readdirSync(docsDir);

let tableMd = `| Node | Description | Link  | \n| --- | --- | --- | \n`;

files.forEach((file) => {
  if (file.endsWith('.md')) {
    const fileName = file.split('.')[0];
    const link = file.replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/ /g, '%20');
    tableMd += `| ${fileName} | ${fileName} | [${fileName}](docs/${link}) | \n`;
  }
})

fs.writeFileSync(path.join(__dirname, 'nodesList.md'), tableMd);