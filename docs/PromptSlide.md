# Documentation
- Class name: PromptSlide
- Category: ♾️Mixlab/Prompt
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

PromptSlide节点旨在通过应用权重因子调整给定提示关键词的影响力。此过程允许微调输入提示，增强文本中特定关键词的相关性和强调。该节点的主要功能是修改输入提示，以更好地适应期望的输出，而不改变其基本含义或上下文。

# Input types
## Required
- prompt_keyword
    - prompt_keyword参数至关重要，因为它定义了节点功能围绕的核心文本。它是权重调整的基础，确保结果提示与预期的强调和焦点一致。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- weight
    - weight参数在确定要应用于prompt_keyword的强调程度中起着关键作用。它修改了关键词的影响力，允许根据期望的重要性水平对输出进行细微控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- prompt
    - 输出参数'prompt'是节点操作的结果，反映了应用权重后调整的提示。它是关键元素，因为它传达了提示的最终形式，这直接影响了后续过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PromptSlide:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt_keyword': ('STRING', {'multiline': False, 'default': '', 'dynamicPrompts': False}), 'weight': ('FLOAT', {'default': 1, 'min': -3, 'max': 3, 'step': 0.01, 'display': 'slider'})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('prompt',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Prompt'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)
    OUTPUT_NODE = False

    def run(self, prompt_keyword, weight):
        p = addWeight(prompt_keyword, weight)
        return (p,)
```