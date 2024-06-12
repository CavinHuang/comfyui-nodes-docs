// 解析yarml文件
// 生成node节点

const fs = require('fs');
const yaml = require('yaml');
const path = require('path');

const yamlPath = './mkdocs.yml';

const doc = yaml.parse
(fs.readFileSync(yamlPath, 'utf8'));


const nav = doc.nav;

const nodesDocsDir = path.join(__dirname, 'nodes-docs');

// D:\workspace\projects\webproject\SaltAI-Web-Docs
const originDocsDir = path.join(__dirname, '../SaltAI-Web-Docs/docs/');

const needAddFile = path.resolve(__dirname, 'needAddFile.json');

const nodeDocsDir = path.join(__dirname, 'docs');

const needAddFileContent = {};

// const nodeDocs = fs.readdirSync(nodeDocsDir);

const windowsPathIgnore = [
    // ['/', '%2F'],
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

const nodeGen = (nav) => {
    const NodeDocumentation = nav[4]['Node Documentation']
    console.log(NodeDocumentation);

    for (let i = 0; i < NodeDocumentation.length; i++) {
        const plugin = NodeDocumentation[i];
        // 获取object的key
        const pluginName = Object.keys(plugin)[0];
        // 获取object的value
        const pluginNodes = plugin[pluginName][2]['Nodes'];

        const enPluginDoc = path.join(nodesDocsDir, 'en-US', pluginName);
        const cnPluginDoc = path.join(nodesDocsDir, 'zh-CN', pluginName);
        console.log(cnPluginDoc);
        // 获取node的名称
        for (let j = 0; j < pluginNodes.length; j++) {
            const node = pluginNodes[j];

            const nodeName = Object.keys(node)[0];
            const enNodeDoc = node[nodeName];
            const enNodeDocPath = path.join(originDocsDir, repairePath(enNodeDoc));
            console.log(enNodeDocPath);

            const _nodeDocPath = path.join(nodeDocsDir, `${repairePath(nodeName)}.md`);
            const _enNodeDocPath = path.join(nodesDocsDir, 'en-US', pluginName, `${repairePath(nodeName)}.md`);
            const _cnNodeDocPath = path.join(cnPluginDoc, `${repairePath(nodeName)}.md`);
            console.log(_nodeDocPath);

            if (!fs.existsSync(_nodeDocPath)) {
                console.log('need add file:', nodeName);
                if (!needAddFileContent[pluginName]) {
                    needAddFileContent[pluginName] = [];
                }
                needAddFileContent[pluginName].push(nodeName);
            } else {
                if (!fs.existsSync(cnPluginDoc)) {
                    fs.mkdirSync(cnPluginDoc, { recursive: true });
                }
                fs.copyFileSync(_nodeDocPath, _cnNodeDocPath)
            }

            if (!fs.existsSync(enPluginDoc)) {
                fs.mkdirSync(enPluginDoc, { recursive: true });
            }
            if (!fs.existsSync(_enNodeDocPath)) {
              needAddFileContent[pluginName].push(nodeName);
            } else {
              fs.copyFileSync(enNodeDocPath, _enNodeDocPath);
            }
        }
    }

    // console.log(needAddFileContent);
    fs.writeFileSync(needAddFile, JSON.stringify(needAddFileContent, null, 2));
}

nodeGen(nav);