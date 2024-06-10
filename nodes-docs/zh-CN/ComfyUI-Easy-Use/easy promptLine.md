# Documentation
- Class name: promptLine
- Category: EasyUse/Prompt
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点旨在根据给定的提示生成文本内容，并能够控制起始点和生成的行数。它通过将输入提示分割成行并提取指定范围来运作，从而使用户能够获得目标化的文本输出。

# Input types
## Required
- prompt
    - 提示是节点用来生成新内容的基础文本。它作为生成文本的上下文或灵感来源，没有它，节点将不会产出任何输出。
    - Comfy dtype: STRING
    - Python dtype: str
- start_index
    - 该参数指定节点将从哪一行开始提取文本。它对于确定将要处理的提示的具体部分并将其转化为输出至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- max_rows
    - 该参数设置了从提示中提取的最大行数。它直接影响节点生成的内容量，确保输出既不过于简短也不过于冗长。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- STRING
    - 输出是从输入提示中选取的文本，从指定的索引开始，跨越定义的行数。它代表了节点的主要功能和其处理的直接结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class promptLine:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt': ('STRING', {'multiline': True, 'default': 'text'}), 'start_index': ('INT', {'default': 0, 'min': 0, 'max': 9999}), 'max_rows': ('INT', {'default': 1000, 'min': 1, 'max': 9999})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('STRING',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'generate_strings'
    CATEGORY = 'EasyUse/Prompt'

    def generate_strings(self, prompt, start_index, max_rows):
        lines = prompt.split('\n')
        start_index = max(0, min(start_index, len(lines) - 1))
        end_index = min(start_index + max_rows, len(lines))
        rows = lines[start_index:end_index]
        return (rows,)
```