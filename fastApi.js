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

const prompt = `
请将以下的Markdown文档翻译为中文，并按照给定的格式和示例进行修改。在翻译过程中，你需要注意以下几点：

1. 请保留所有的Markdown语法和代码块，只翻译文本内容。
2. 需要保留所有的原始格式和结构，包括标题、子标题和列表。
3. 你的翻译应该反映出原始文档的意思和目的，同时也要考虑到中文读者的理解。
4. 文档的结构应该需要完全的参考输出的示例按照以下顺序：“#Documentation”，“# Input types”， “## Required”，“## Optional“(可选的)，“# Output types”，“# Usage tips”(不翻译这个段落)，“# Source code”(不翻译这个段落)。

在文档说明部分，需要简洁明了地解释类的名称、分类、输出节点以及类的作用。

在输入类型部分，需要详细解释每个参数的作用、Comfy的数据类型和Python的数据类型。每个参数应该用列表的形式表示，并在每个参数下面详细解释其作用和数据类型。

在输出类型部分，需要详细解释输出参数的作用、Comfy的数据类型和Python的数据类型。

在使用提示部分，需要解释适用的设备类型。

在源代码部分，需要保留原始代码，不需要翻译。

下面是一个输出结果的示例：

\`\`\`markdown
\# Documentation
\- Class name: AddNoise
\- Category: _for_testing/custom_sampling/noise
\- Output node: False
\- Repo Ref: https://github.com/comfyanonymous/ComfyUI     

AddNoise节点旨在向潜在图像引入随机噪声，这是生成合成图像过程中的关键步骤。它通过根据指定的sigmas对噪声进行缩放，然后将噪声与潜在图像结合，以产生带噪声的输出。该节点对于模拟图像数据中固有的噪声特性至关重要，从而增强了生成图像的多样性和逼真度。

\# Input types
\#\# Required
\- model
    \- 模型参数对于AddNoise节点至关重要，因为它决定了用于采样和处理潜在图像的模型。它是节点执行的基础，直接影响生成的带噪声图像的质量和特性。
    \- Comfy dtype: MODEL
    \- Python dtype: torch.nn.Module
\- noise
   \ - 噪声参数对于AddNoise节点至关重要，因为它提供了将被整合到潜在图像中的随机性来源。噪声的类型和属性可以显著影响输出图像的多样性和不可预测性。
    \- Comfy dtype: NOISE
    \- Python dtype: Callable[..., torch.Tensor]
\- sigmas
    \- sigmas参数决定了要添加到潜在图像中的噪声的规模。它在控制噪声水平以及合成图像的视觉外观中起着关键作用。
    \- Comfy dtype: SIGMAS
    \- Python dtype: List[float]
\- latent_image
    \- latent_image参数是AddNoise节点的核心输入，代表将通过添加噪声进行修改的图像数据。其结构和内容对节点的功能以及图像合成过程的最终结果至关重要。
    \- Comfy dtype: LATENT
    \- Python dtype: Dict[str, torch.Tensor]

\# Output types
\- latent
    \- 输出的latent参数代表应用AddNoise节点后得到的带噪声图像。它封装了携带所需噪声特性的合成数据，可供进一步处理或分析。
    \- Comfy dtype: LATENT
    \- Python dtype: Dict[str, torch.Tensor]

\# Usage tips
\- Infra type: CPU

\# Source code
\`\`\`
class AddNoise:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'noise': ('NOISE',), 'sigmas': ('SIGMAS',), 'latent_image': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'add_noise'
    CATEGORY = '_for_testing/custom_sampling/noise'

    def add_noise(self, model, noise, sigmas, latent_image):
        if len(sigmas) == 0:
            return latent_image
        latent = latent_image
        latent_image = latent['samples']
        noisy = noise.generate_noise(latent)
        model_sampling = model.get_model_object('model_sampling')
        process_latent_out = model.get_model_object('process_latent_out')
        process_latent_in = model.get_model_object('process_latent_in')
        if len(sigmas) > 1:
            scale = torch.abs(sigmas[0] - sigmas[-1])
        else:
            scale = sigmas[0]
        if torch.count_nonzero(latent_image) > 0:
            latent_image = process_latent_in(latent_image)
        noisy = model_sampling.noise_scaling(scale, noisy, latent_image)
        noisy = process_latent_out(noisy)
        noisy = torch.nan_to_num(noisy, nan=0.0, posinf=0.0, neginf=0.0)
        out = latent.copy()
        out['samples'] = noisy
        return (out,)
\`\`\`
\`\`\`

请确保你的翻译准确、清晰，并且易于理解。你的翻译结果应该和给定的示例格式完全一致。
`

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