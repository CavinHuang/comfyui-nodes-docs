# Documentation
- Class name: PromptSimplification
- Category: ♾️Mixlab/Prompt
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点通过将词数减少到指定长度来简化提示，确保输入的简洁性和相关性，以便后续处理。

# Input types
## Required
- prompt
    - 输入提示是节点操作的基础，其内容直接影响简化过程。
    - Comfy dtype: STRING
    - Python dtype: str
- length
    - 该参数决定了简化提示所需的期望词长，从而控制输出的简洁性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- prompts
    - 输出展示了输入提示的精炼版本，去除了多余的词以满足指定的长度。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class PromptSimplification:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt': ('STRING', {'multiline': True, 'default': '', 'dynamicPrompts': False}), 'length': ('INT', {'default': 5, 'min': 1, 'max': 100, 'step': 1, 'display': 'number'})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('prompts',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Prompt'
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)
    OUTPUT_NODE = True

    def run(self, prompt, length):
        length = length[0]
        result = []
        for p in prompt:
            nps = prompt_delete_words(p, length)
            for n in nps:
                result.append(n)
        result = [elem.strip() for elem in result if elem.strip()]
        return {'ui': {'prompts': result}, 'result': (result,)}
```