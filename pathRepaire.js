const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, './');
const docs = path.resolve(root, './docs');

const windowsPathIgnore = [
  ['/', '%2F'],
  ['\\', '%5C'],
  [':', '%3A'],
  ['*', '%2A'],
  ['|', '%7C'],
  ['<', '%3C'],
  ['>', '%3E'],
  ['"', '%22'],
  ['?', '%3F']]

const repairePath = (fileName) => {
  let name = fileName;
  windowsPathIgnore.forEach((item) => {
    name = name.replace(item[0], item[1]);
  })
  return name;
}

const repaireFilePath = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const newPath = repairePath(file);
    const oldPath = path.resolve(dir, file);
    const newFilePath = path.resolve(dir, newPath);
    fs.renameSync(oldPath, newFilePath);
  })
}

repaireFilePath(docs)