# Documentation
- Class name: WAS_Text_Concatenate
- Category: WAS Suite/Text
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Concatenate节点旨在高效地将多个文本输入合并为一个单独的字符串。它通过使用指定的分隔符连接提供的文本输入来实现这一点，可选择性地去除首尾空白，以获得更清洁的输出。此节点在简化文本处理工作流程中扮演着关键角色，通过简化文本数据的聚合来实现这一点。

# Input types
## Required
- delimiter
    - 分隔符参数定义了在连接各个文本输入时使用的字符或字符串。它对于确定最终输出字符串的格式至关重要，并影响组合文本的可读性和结构。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- clean_whitespace
    - clean_whitespace参数是一个可选的标，当设置为'true'时，指示节点在连接之前从文本输入中去除任何首尾空白。这确保了结果文本没有不必要的空格，并且格式整洁。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: str
- text_a
    - text_a参数代表可以提供给节点的可选文本输入之一。它作为连接过程的一部分，用于贡献最终合并的文本。包含此参数允许将多个不同的文本段添加到组合输出中。
    - Comfy dtype: STRING
    - Python dtype: str
- text_b
    - text_b参数与text_a具有类似的目的，允许在连接过程中包含另一个不同的文本段。它增强了节点处理各种文本输入并创建全面最终文本的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- text_c
    - text_c参数与text_a和text_b类似，是节点的另一个可选文本输入。它为连接更广泛的文本输入提供了额外的灵活性，使得能够创建一个更复杂和详细的最终文本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_d
    - text_d参数是节点可以处理的最后一个可选文本输入。它为连接提供了进一步的定制选项，允许用户包含更多的文本段，并制作出详细和微妙的最终文本输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- merged_text
    - merged_text输出是使用指定的分隔符连接所有提供的文本输入的结果。它代表了节点生成的最终组合文本，可以用于进一步处理或作为文本处理流水线的最终输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Concatenate:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'delimiter': ('STRING', {'default': ', '}), 'clean_whitespace': (['true', 'false'],)}, 'optional': {'text_a': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'text_b': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'text_c': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'text_d': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'text_concatenate'
    CATEGORY = 'WAS Suite/Text'

    def text_concatenate(self, delimiter, clean_whitespace, **kwargs):
        text_inputs: list[str] = []
        if delimiter == '\\n':
            delimiter = '\n'
        for k in sorted(kwargs.keys()):
            v = kwargs[k]
            if isinstance(v, str):
                if clean_whitespace == 'true':
                    v = v.strip()
                if v != '':
                    text_inputs.append(v)
        merged_text = delimiter.join(text_inputs)
        return (merged_text,)
```