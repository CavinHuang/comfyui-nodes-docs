# Documentation
- Class name: LLMCLIPTextEncode
- Category: llm
- Output node: False
- Repo Ref: https://github.com/esheep/esheep_custom_nodes.git

该节点通过CLIP模型对文本输入进行编码，集成会话元素以完善下游任务的条件上下文。

# Input types
## Required
- clip
    - clip参数至关重要，它代表了CLIP模型本身，使得文本编码过程得以进行并提供上下文信息。
    - Comfy dtype: CLIP
    - Python dtype: CLIPModel
- text
    - text参数对于节点的操作至关重要，因为它是节点处理和编码的输入数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- CONDITIONING
    - 输出提供了一个条件化的表示，可以作为进一步处理的上下文或作为生成响应的基础。
    - Comfy dtype: POOLED_OUTPUT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class LLMCLIPTextEncode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'text': ('STRING', {'multiline': True})}, 'hidden': {}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'chat'
    CATEGORY = 'llm'

    def chat(self, clip, text):
        messages_copy = messages.copy()
        messages_copy.append({'role': 'user', 'content': text})
        data = {'messages': messages_copy, 'stops': ['[INST]', '</edit>', '</image>']}
        response = requests.post(url, headers=headers, data=json.dumps(data))
        if response.status_code != 200:
            (cond, pooled) = clip.encode_from_tokens(clip.tokenize(text), return_pooled=True)
            return ([[cond, {'pooled_output': pooled}]],)
        response_dict = json.loads(response.text)
        last_message = response_dict['messages'][-1]
        if last_message['role'] != 'assistant':
            (cond, pooled) = clip.encode_from_tokens(clip.tokenize(text), return_pooled=True)
            return ([[cond, {'pooled_output': pooled}]],)
        result = last_message['content']
        last_image_index = result.rfind('<image>')
        if last_image_index != -1:
            result = result[last_image_index + len('<image>'):]
        last_edit_index = result.rfind('<edit>')
        if last_edit_index != -1:
            result = result[last_edit_index + len('<edit>'):]
        print('result: ', result)
        tokens = clip.tokenize(result)
        (cond, pooled) = clip.encode_from_tokens(tokens, return_pooled=True)
        return ([[cond, {'pooled_output': pooled}]],)
```