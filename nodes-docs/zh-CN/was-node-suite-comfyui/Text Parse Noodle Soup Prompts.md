# Documentation
- Class name: WAS_Text_Parse_NSP
- Category: WAS Suite/Text/Parse
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Parse_NSP 节点旨在根据指定模式处理和转换文本。它利用 'Noodle Soup Prompts' 的功能进行创造性的文本操作，或使用通配符替换方法进行更结构化的处理。此节点对于需要文本解析或增强的任务至关重要，为各种基于文本的应用程序提供了一种多功能的解决方案。

# Input types
## Required
- text
    - 文本参数是节点的核心输入。它决定了将经历解析和转换的内容。节点的操作严重依赖此输入，使其对于实现期望的输出至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- mode
    - 模式参数决定了节点采用的解析策略。它可以设置为 'Noodle Soup Prompts' 进行创造性方法，或者设置为 'Wildcards' 进行更结构化的文本操作。此参数对于指导节点的处理行为至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- noodle_key
    - noodle_key 参数用作 'Noodle Soup Prompts' 模式下文本中的分隔符。它标志着可以被替换或操作的术语的开始和结束，因此在解析过程中扮演着重要角色。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - seed 参数是一个可选的整数，可用于在解析过程中引入随机性。它通过为随机操作提供一致的起点，确保结果的可复现性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- new_text
    - new_text 输出代表了节点应用指定解析方法后处理过的文本。它是节点功能的最终成果，对后续操作或分析具有重要价值。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Parse_NSP:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mode': (['Noodle Soup Prompts', 'Wildcards'],), 'noodle_key': ('STRING', {'default': '__', 'multiline': False}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'text': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False})}}
    OUTPUT_NODE = True
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'text_parse_nsp'
    CATEGORY = 'WAS Suite/Text/Parse'

    def text_parse_nsp(self, text, mode='Noodle Soup Prompts', noodle_key='__', seed=0):
        if mode == 'Noodle Soup Prompts':
            new_text = nsp_parse(text, seed, noodle_key)
            cstr(f'Text Parse NSP:\n{new_text}').msg.print()
        else:
            new_text = replace_wildcards(text, None if seed == 0 else seed, noodle_key)
            cstr(f'CLIPTextEncode Wildcards:\n{new_text}').msg.print()
        return (new_text,)
```