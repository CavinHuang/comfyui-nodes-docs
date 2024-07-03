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

const url2 = 'https://api.chat-plus.net/v1/chat/completions'
const model2 = 'claude-3-5-sonnet-20240620'
const token2 = 'sk-qzV9ma6pvqgapUqDE247Dc12A3A8435e8bC98451C9D74791'

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

const prompts = fs.readFileSync(path.resolve(__dirname, './prompt.md'), 'utf8')
const initModel2  = async () => {
    const postData = {
        model: model2,
        chatId: '2001',
        messages: [
            {
                role: 'user',
                dataId: randomId(),
                content: prompts
            }
        ],
        stream: false
    }

    const header = {
        'Authorization': `Bearer ${token2}`
    }

    return axios.post(url2, postData, { headers: header }).then((res) => {
        const { choices, id } = res.data
        const { message } = choices[0]
        console.log(res.data)
        return {
            id,
            message: message.content
        }
    }).catch((err) => {
        console.log(err)
    })

}
let isInit = false
const transitionDoc2 = async (content) => {
    let conversation_id = '2001'
    // if (!isInit) {
    //     const { id } = await initModel2()
    //     isInit = true
    //     conversation_id = id
    // }
    const postData = {
        model: model2,
        conversation_id,
        messages: [
            {
                role: 'system',
                content: prompts
            },
            {
                role: 'user',
                content: content
            }
        ],
        stream: false
    }

    const header = {
        'Authorization': `Bearer ${token2}`
    }

    return axios.post(url2, postData, { headers: header }).then((res) => {
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
            // let docsTransContent = await getCompletion(newContent)
            console.log(newContent)
            // return
            let docsTransContent = await transitionDoc2(newContent)
            console.log('====================== 翻译结果 ======================')
            console.log(docsTransContent)

            if(docsTransContent) {
              docsTransContent = docsTransContent.replace(/```markdown/g, '').replace(/```/g, '')
              docsTransContent = docsTransContent + '\n\n' + sourceCodeContent
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
  const flagText2 = '## Source code'
  let sourceCodeHeadIndex = content.indexOf(flagText)
  if (sourceCodeHeadIndex === -1) {
    sourceCodeHeadIndex = content.indexOf(flagText2)
    if (sourceCodeHeadIndex === -1) {
      return {
        sourceCodeContent: '',
        content,
        newContent: content
      }
    }
  }

  const newContent = content.slice(0, sourceCodeHeadIndex)

  const sourceCodeContent = content.slice(sourceCodeHeadIndex, content.length)


  return {
    sourceCodeContent,
    content,
    newContent
  }
}

main()