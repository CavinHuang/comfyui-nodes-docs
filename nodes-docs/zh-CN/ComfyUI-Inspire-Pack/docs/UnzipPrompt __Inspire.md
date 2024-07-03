
# Documentation
- Class name: UnzipPrompt __Inspire
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

UnzipPrompt节点旨在解压缩并分离压缩的提示词，通常包括正面、负面和可选的名称部分。此功能对于在InspirePack框架内处理和利用复杂的提示词结构至关重要。

# Input types
## Required
- zipped_prompt
    - zipped_prompt参数是需要解压缩的提示词的压缩形式。它在节点操作中扮演着关键角色，作为被解包成各个组成部分的源数据。
    - Comfy dtype: ZIPPED_PROMPT
    - Python dtype: Tuple[str, str, str]

# Output types
- positive
    - 正面输出代表解压缩后提示词的正面方面。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面输出代表解压缩后提示词的负面方面。
    - Comfy dtype: STRING
    - Python dtype: str
- name
    - 名称输出代表解压缩后提示词的可选名称部分，提供额外的上下文或标识。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UnzipPrompt:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"zipped_prompt": ("ZIPPED_PROMPT",), }}

    RETURN_TYPES = ("STRING", "STRING", "STRING")
    RETURN_NAMES = ("positive", "negative", "name")

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    def doit(self, zipped_prompt):
        return zipped_prompt

```
