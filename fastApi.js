const axios = require('axios');
const fs = require('fs');
const path = require('path');

const needAddFile = require('./needAddFile.json');

const { sleep, getCompletion } = require('./fastApi2')

const token = 'fastgpt-szpsv90SJftbX699P4lpDtvSNzH7GvwSoMJcMz8pAl3aEcPAxfh4GYFZlzTYvU7'
const url = 'http://localhost:3002/api/v1/chat/completions'
const randomId = () => Math.random().toString(36).substr(2, 10)

// const fsContent = fs.readFileSync(path.resolve(__dirname, './nodes-docs/en-US/Comfy/docs/AddNoise.md'), 'utf8')


// const postData = {
//     model: 'qwen2:7b',
//     chatId: 'kudm64gieTFH',
//     appId: '6680ba4c6ebed5735c5eb611',
//     messages: [
//         {
//             content: "",
//             dataId: randomId(),
//             role: "assistant"
//         },
//         {
//             role: 'user',
//             dataId: randomId(),
//             content: fsContent
//         }
//     ]
// }

// const header = {
//     'Authorization': `Bearer ${token}`
// }

// const response = axios.post(url, postData, { headers: header }).then((res) => {
//     // console.log(res.data)
//     const { choices } = res.data
//     const { message } = choices[0]
//     console.log(message)
// }).catch((err) => {
//     console.log(err)
// })

const transitionDoc = (content) => {
    const postData = {
        model: 'qwen2:7b',
        chatId: '2001',
        appId: '6680ba4c6ebed5735c5eb611',
        messages: [
            {
                content: "",
                dataId: randomId(),
                role: "assistant"
            },
            {
                role: 'user',
                dataId: randomId(),
                content: content
            }
        ]
    }

    const header = {
        'Authorization': `Bearer ${token}`
    }

    return axios.post(url, postData, { headers: header }).then((res) => {
        const { choices } = res.data
        const { message } = choices[0]
        return message.content
    }).catch((err) => {
        console.log(err)
    })
}

const windowsPathIgnore = [
    // ['/', '%2F'],
    ['\\', '%5C'],
    [':', '%3A'],
    ['*', '%2A'],
    ['|', '%7C'],
    ['<', '%3C'],
    ['>', '%3E'],
    ['"', '%22'],
    ['?', '%3F']
  ]

const repairePath = (fileName) => {
let name = fileName;
windowsPathIgnore.forEach((item) => {
    name = name.replace(item[0], item[1]);
})
return name;
}

const enPaths = path.resolve(__dirname, './nodes-docs/en-US');
const zhPaths = path.resolve(__dirname, './nodes-docs/zh-CN');


async function main() {
    for (let key in needAddFile) {
        const enDocPath = path.join(enPaths, key, 'docs');
        const zhDocPath = path.join(zhPaths, key, 'docs');

        const nodes = needAddFile[key];
        for (let i = 0; i < nodes.length; i++) {
            const nodeNamePath = repairePath(nodes[i]);

            const enNodePath = path.join(enDocPath, `${nodeNamePath}.md`);
            const zhNodePath = path.join(zhDocPath, `${nodeNamePath}.md`);

            if (!fs.existsSync(enNodePath)) {
                console.log(`en-US: ${enNodePath} is not exist`);
                continue
            }

            const znNodeContent = fs.readFileSync(zhNodePath, 'utf8');
            if (fs.existsSync(zhNodePath) && znNodeContent) {
                console.log(`zh-CN: ${zhNodePath} is exist`);
                continue
            }
            console.log(`====================== 开始翻译 ${enNodePath} ======================`);
            const enNodeContent = fs.readFileSync(enNodePath, 'utf8');
            const enNodeFileSize = fs.statSync(enNodePath).size;
            // const file = {
            //   file_nam: "paste.txt",
            //   file_size: enNodeFileSize,
            //   file_type: "txt",
            //   extracted_content: enNodeContent
            // }

            const { newContent, sourceCodeContent } = spliteSourceCode(enNodeContent)
            let docsTransContent = await getCompletion(newContent)
            console.log('====================== 翻译结果 ======================')
            console.log(docsTransContent)

            if(docsTransContent) {
              docsTransContent = docsTransContent.replace(/```markdown/g, '').replace(/```/g, '')
              docsTransContent = sourceCodeContent + '\n\n' + docsTransContent
              fs.writeFileSync(zhNodePath, docsTransContent || '', 'utf8');
              console.log(`zh-CN: ${zhNodePath} is created successfully`);
            } else {
              console.log(`zh-CN: ${zhNodePath} is created failed`);
            }

            await sleep(5000)
        }

    }
}

/**
 *
 * @param {string} content
 * @returns
 */
const spliteSourceCode = (content) => {
  const flagText = '## Usage tips'
  const sourceCodeHeadIndex = content.indexOf(flagText)
  if (sourceCodeHeadIndex === -1) {
    return {
      sourceCodeContent: '',
      content,
      newContent: content
    }
  }

  const spliteIndex = sourceCodeHeadIndex + flagText.length

  const newContent = content.slice(0, sourceCodeHeadIndex)

  const sourceCodeContent = content.slice(sourceCodeHeadIndex, content.length)


  return {
    sourceCodeContent,
    content,
    newContent
  }
}

main()