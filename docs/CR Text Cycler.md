# Documentation
- Class name: CR_TextCycler
- Category: Comfyroll/List
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextCycler 节点旨在在给定的循环结构内复制文本行指定的次数。它用于自动化文本复制过程，以提高文本处理工作流程的效率。

# Input types
## Required
- text
    - 'text' 参数是需要循环的输入文本。它可以包含多行，对于节点的操作至关重要，因为它决定了将被重复的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- repeats
    - 'repeats' 参数指示每行文本将被复制的次数。它是一个关键元素，直接影响输出文本的数量。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- loops
    - 'loops' 参数指定整个文本块将通过其重复次数循环的次数。它为文本处理增加了额外的重复层。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- show_text
    - 'show_text' 输出在所有重复和循环处理完成后提供最终的循环文本。它代表了节点文本操作能力的结果。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextCycler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': ''}), 'repeats': ('INT', {'default': 1, 'min': 1, 'max': 99999}), 'loops': ('INT', {'default': 1, 'min': 1, 'max': 99999})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('STRING', 'show_text')
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = 'cycle'
    CATEGORY = icons.get('Comfyroll/List')

    def cycle(self, text, repeats, loops=1):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-cycler'
        lines = text.split('\n')
        list_out = []
        for i in range(loops):
            for text_item in lines:
                for _ in range(repeats):
                    list_out.append(text_item)
        return (list_out, show_help)
```