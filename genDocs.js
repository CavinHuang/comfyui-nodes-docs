const fs = require('fs')
const path = require('path')

const cnDocsPath = path.resolve(__dirname, './nodes-docs/zh-CN')
const rootDocsPath = path.resolve(__dirname, './docs')

const genDocs = (docsPath) => {
  const files = fs.readdirSync(docsPath)

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const pluginPath = path.resolve(docsPath, file)
    const nodeDOcs = path.resolve(pluginPath, 'docs')

    const docs = fs.readdirSync(nodeDOcs)

    for (let j = 0; j < docs.length; j++) {
      const doc = docs[j]
      const nodeFile = path.resolve(nodeDOcs, doc)
      const rootDocPath = path.resolve(rootDocsPath, doc)

      if (fs.existsSync(rootDocPath)) {
        console.log(`文件已存在: ${doc}`)
        continue
      } else {
        fs.copyFileSync(nodeFile, rootDocPath)
      }
    }
  }
}

genDocs(cnDocsPath)