# Documentation
- Class name: LLMNode
- Category: llm
- Output node: True
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

该节点便于与语言模型进行交互式通信，能够处理用户输入并生成响应，实现信息的交流。

# Input types
## Required
- text
    - 文本输入对于启动与语言模型的对话至关重要，它为AI的响应设定了上下文。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result
    - 结果输出包含语言模型对用户输入的响应，是节点功能的核心结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class LLMNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True})}, 'hidden': {}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'chat'
    CATEGORY = 'llm'
    OUTPUT_IS_LIST = (True,)
    OUTPUT_NODE = True

    def chat(self, text):
        messages_copy = messages.copy()
        messages_copy.append({'role': 'user', 'content': text})
        data = {'messages': messages_copy, 'stops': ['[INST]', '</edit>', '</image>']}
        response = requests.post(url, headers=headers, data=json.dumps(data))
        if response.status_code != 200:
            return {'ui': {'result': [text]}, 'result': ([text],)}
        response_dict = json.loads(response.text)
        last_message = response_dict['messages'][-1]
        if last_message['role'] != 'assistant':
            return {'ui': {'result': [text]}, 'result': ([text],)}
        result = last_message['content']
        last_image_index = result.rfind('<image>')
        if last_image_index != -1:
            result = result[last_image_index + len('<image>'):]
        last_edit_index = result.rfind('<edit>')
        if last_edit_index != -1:
            result = result[last_edit_index + len('<edit>'):]
        print('result: ', result)
        return {'ui': {'result': [result]}, 'result': ([result],)}
```