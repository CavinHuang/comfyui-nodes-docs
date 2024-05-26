# Documentation
- Class name: UnzipPrompt
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在处理和解压缩提示，便于内容的提取以供进一步使用。它是需要处理压缩数据的工作流中的关键组件，确保数据随时可用且格式正确以供后续操作。

# Input types
## Required
- zipped_prompt
    - zipped_prompt参数是必需的，因为它包含了节点设计处理的压缩数据。它直接影响节点的运作和输出质量，因为节点的主要功能是提取和处理此输入的内容。
    - Comfy dtype: ZIPPED_PROMPT
    - Python dtype: bytes

# Output types
- positive
    - positive输出代表从zipped_prompt中成功提取和处理的内容。它是节点操作的关键结果，表明数据已被适当处理并准备供进一步使用。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - negative输出提供了在处理zipped_prompt期间遇到的任何问题或错误的信息。此输出对于理解节点操作的成功或失败以及必要时进行故障排除非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- name
    - name输出通常包含zipped_prompt的文件名或标识符。此输出对于在工作流中跟踪和引用处理后的数据非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class UnzipPrompt:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'zipped_prompt': ('ZIPPED_PROMPT',)}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('positive', 'negative', 'name')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Prompt'

    def doit(self, zipped_prompt):
        return zipped_prompt
```