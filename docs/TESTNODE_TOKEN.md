# Documentation
- Class name: TESTNODE_TOKEN
- Category: ♾️Mixlab/__TEST
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点使用clip模型处理文本输入，将文本转换为结构化表示，以便在各种应用中进一步使用。

# Input types
## Required
- text
    - 文本输入对于节点执行其标记化功能至关重要。它是提取和构建标记的原材料。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- clip
    - clip模型是一个可选输入，提供后可以使节点更有效地对文本进行标记化，利用模型对语言结构的理解。
    - Comfy dtype: CLIP
    - Python dtype: module

# Output types
- tokens
    - 输出是一个代表输入文本标记化结构的JSON字符串。它是下游任务中进一步分析和处理的关键组成部分。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class TESTNODE_TOKEN:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'forceInput': True}), 'clip': ('CLIP',)}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/__TEST'
    OUTPUT_NODE = True
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, text, clip=None):
        tokens = clip.tokenize(text)
        tokens = [v for v in tokens.values()][0][0]
        tokens = json.dumps(tokens)
        return (tokens,)
```