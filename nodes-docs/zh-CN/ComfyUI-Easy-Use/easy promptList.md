# Documentation
- Class name: promptList
- Category: EasyUse/Prompt
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点简化了聚合和处理文本输入的过程，便于在各种应用中生成提示列表。它强调高效处理字符串数据，确保节点在工作流中的角色是集中和组织文本信息。

# Input types
## Required
- prompt_1
    - 主要的文本输入，作为节点操作的基础。它至关重要，因为它为后续的提示处理和聚合设定了初始上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_2
    - 额外的文本输入，增加了正在处理的提示的多样性和复杂性。它增强了节点处理各种文本输入的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_3
    - 进一步的文本输入，对于节点整合和管理多个提示的功能至关重要，确保对文本处理采取全面的方法。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_4
    - 另一个对于节点有效组织和构建提示至关重要的输入，影响最终输出的连贯性和相关性。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt_5
    - 最后的文本输入，完善了提示集，确保节点可以处理广泛的文本输入并保持整体提示列表的完整性。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- optional_prompt_list
    - 一个可选的提示列表，提供后，扩展了节点管理和处理更大量文本数据的能力，增强了输出的全面性。
    - Comfy dtype: LIST
    - Python dtype: List[str]

# Output types
- prompt_list
    - 一个整合的提示列表，代表节点的输出，以结构化和有序的方式封装了处理过的文本输入。
    - Comfy dtype: LIST
    - Python dtype: List[str]
- prompt_strings
    - 提示列表的序列化版本，将聚合的文本数据呈现为单个字符串，便于在后续应用中使用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class promptList:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'prompt_1': ('STRING', {'multiline': True, 'default': ''}), 'prompt_2': ('STRING', {'multiline': True, 'default': ''}), 'prompt_3': ('STRING', {'multiline': True, 'default': ''}), 'prompt_4': ('STRING', {'multiline': True, 'default': ''}), 'prompt_5': ('STRING', {'multiline': True, 'default': ''})}, 'optional': {'optional_prompt_list': ('LIST',)}}
    RETURN_TYPES = ('LIST', 'STRING')
    RETURN_NAMES = ('prompt_list', 'prompt_strings')
    OUTPUT_IS_LIST = (False, True)
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Prompt'

    def run(self, **kwargs):
        prompts = []
        if 'optional_prompt_list' in kwargs:
            for l in kwargs['optional_prompt_list']:
                prompts.append(l)
        for k in sorted(kwargs.keys()):
            v = kwargs[k]
            if isinstance(v, str) and v != '':
                prompts.append(v)
        return (prompts, prompts)
```