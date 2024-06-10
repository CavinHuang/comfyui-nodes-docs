# Documentation
- Class name: CR_SimplePromptList
- Category: Comfyroll/Animation/Legacy
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimplePromptList 是一个设计用来高效聚合和管理提示列表的节点。它的目的是将多个提示堆叠成一个单一的列表，这些列表可以用于下游的各种处理任务。节点的功能集中在合并文本提示上，强调其在为动画工作流程简化提示管理方面的作用。

# Input types
## Required
- prompt_1
    - prompt_1 是节点的第一个文本输入，允许用户将特定的提示注入到处理流程中。它的包含至关重要，因为它直接贡献于最终聚合的提示列表，影响节点的输出和后续操作。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- simple_prompt_list
    - simple_prompt_list 是一个可选参数，它允许节点接受一个预先存在的提示列表。这个特性通过允许用户用额外的条目扩展或修改提示列表，增强了节点的灵活性，从而影响整体的提示聚合过程。
    - Comfy dtype: SIMPLE_PROMPT_LIST
    - Python dtype: List[str]

# Output types
- SIMPLE_PROMPT_LIST
    - SIMPLE_PROMPT_LIST 输出代表了节点操作产生的聚合提示列表。它是一个关键组件，因为它构成了动画工作流程中进一步处理或分析的基础，突出了节点在提示管理方面的贡献。
    - Comfy dtype: SIMPLE_PROMPT_LIST
    - Python dtype: List[str]
- show_help
    - show_help 输出提供了一个链接到文档页面的URL，以供进一步帮助。它作为一个有用的资源，供用户寻求如何有效地在他们的动画项目中使用节点的更多信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimplePromptList:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'prompt_1': ('STRING', {'multiline': True, 'default': 'prompt'}), 'prompt_2': ('STRING', {'multiline': True, 'default': 'prompt'}), 'prompt_3': ('STRING', {'multiline': True, 'default': 'prompt'}), 'prompt_4': ('STRING', {'multiline': True, 'default': 'prompt'}), 'prompt_5': ('STRING', {'multiline': True, 'default': 'prompt'})}, 'optional': {'simple_prompt_list': ('SIMPLE_PROMPT_LIST',)}}
    RETURN_TYPES = ('SIMPLE_PROMPT_LIST', 'STRING')
    RETURN_NAMES = ('SIMPLE_PROMPT_LIST', 'show_help')
    FUNCTION = 'prompt_stacker'
    CATEGORY = icons.get('Comfyroll/Animation/Legacy')

    def prompt_stacker(self, prompt_1, prompt_2, prompt_3, prompt_4, prompt_5, simple_prompt_list=None):
        prompts = list()
        if simple_prompt_list is not None:
            prompts.extend([l for l in simple_prompt_list])
        if prompt_1 != '':
            (prompts.extend([prompt_1]),)
        if prompt_2 != '':
            (prompts.extend([prompt_2]),)
        if prompt_3 != '':
            (prompts.extend([prompt_3]),)
        if prompt_4 != '':
            (prompts.extend([prompt_4]),)
        if prompt_5 != '':
            (prompts.extend([prompt_5]),)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Prompt-Nodes#cr-simple-prompt-list'
        return (prompts, show_help)
```