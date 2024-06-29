const axios = require('axios');
const fs = require('fs');
const path = require('path');

const needAddFile = require('./needAddFile.json');

// const token = 'fastgpt-wp115NwJf38ytxxis4ELY7P9nuGFmxwt0Nh27uaDR0t2eMIwStzj'

// const url = 'http://localhost:3002/api/v1/chat/completions'

// const fsContent = fs.readFileSync(path.resolve(__dirname, './nodes-docs/en-US/Comfy/docs/AddNoise.md'), 'utf8')

// const postData = {
//     model: 'qwen2:7b',
//     chatId: '2',
//     messages: [
//         {
//             role: 'user',
//             content: fsContent
//         }
//     ]
// }

// const header = {
//     'Authorization': `Bearer ${token}`
// }

// const response = axios.post(url, postData, { headers: header }).then((res) => {
//     console.log(res.data)
//     const { choices } = res.data
//     const { message } = choices[0]
//     console.log(message)
// }).catch((err) => {
//     console.log(err)
// })

const url = 'http://localhost:3002/api/v1/chat/completions'
const token = 'fastgpt-wp115NwJf38ytxxis4ELY7P9nuGFmxwt0Nh27uaDR0t2eMIwStzj'

const transitionDoc = (content) => {
    const postData = {
        model: 'qwen2:7b',
        chatId: '2',
        messages: [
            {
                role: 'user',
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

            const enNodeContent = fs.readFileSync(enNodePath, 'utf8');
            const docsTransContent = await transitionDoc(enNodeContent)

            fs.writeFileSync(zhNodePath, docsTransContent, 'utf8');
            console.log(`zh-CN: ${zhNodePath} is created successfully`);
        }

    }
}

main()