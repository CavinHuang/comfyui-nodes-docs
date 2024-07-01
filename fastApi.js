const axios = require('axios');
const fs = require('fs');
const path = require('path');

const needAddFile = require('./needAddFile.json');

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

            if (fs.existsSync(zhNodePath)) {
                console.log(`zh-CN: ${zhNodePath} is exist`);
                continue
            }
            console.log(`====================== 开始翻译 ${enNodePath} ======================`);
            const enNodeContent = fs.readFileSync(enNodePath, 'utf8');
            const docsTransContent = await transitionDoc(enNodeContent)
            console.log('====================== 翻译结果 ======================')
            console.log(docsTransContent)
            fs.writeFileSync(zhNodePath, docsTransContent, 'utf8');
            console.log(`zh-CN: ${zhNodePath} is created successfully`);
        }

    }
}

main()