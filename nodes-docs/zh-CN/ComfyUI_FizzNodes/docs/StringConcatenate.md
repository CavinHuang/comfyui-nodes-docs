# Documentation
- Class name: StringConcatenate
- Category: FizzNodes 📅🅕🅝/FrameNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

StringConcatenate节点旨在高效地将具有相关帧编号的字符串进行拼接。它通过结合文本输入及其对应的帧，发挥着创建结构化数据表示的关键作用。该节点简化了为各种应用生成格式化字符串输出的过程。

# Input types
## Required
- text_a
    - 'text_a'参数是一个强制性的字符串输入，代表要被拼接的第一个文本内容。它对节点的操作至关重要，因为它构成了结构化数据的初始部分。
    - Comfy dtype: STRING
    - Python dtype: str
- frame_a
    - 'frame_a'参数是一个整数，它指定与'text_a'关联的帧编号。这对于以帧特定的方式组织文本数据至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- text_b
    - 'text_b'参数是另一个强制性的字符串输入，代表要被拼接的第二个文本内容。它对于用额外信息扩展结构化数据很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- frame_b
    - 'frame_b'参数是一个整数，它指定与'text_b'关联的帧编号。它在基于帧组织文本数据方面扮演着重要角色。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- text_c
    - 'text_c'参数是一个可选的字符串输入，可以被包含以进行进一步的拼接。它提供了将更多文本内容添加到结构化数据中的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- frame_c
    - 'frame_c'参数是一个可选的整数，如果提供了'text_c'，则指定一个帧编号。它用于基于帧组织额外的文本数据。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - 'result'参数代表节点的拼接字符串输出。它是将所有提供的文本输入及其各自的帧编号组合成单一的结构化格式的结果。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class StringConcatenate:

    def __init__(self):
        pass
    defaultPrompt = '"0" :"",\n    "12" :"",\n    "24" :"",\n    "36" :"",\n    "48" :"",\n    "60" :"",\n    "72" :"",\n    "84" :"",\n    "96" :"",\n    "108" :"",\n    "120" :""\n    '

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text_a': ('STRING', {'forceInput': True, 'multiline': True, 'default': ''}), 'frame_a': ('INT', {'default': 0}), 'text_b': ('STRING', {'forceInput': True, 'multiline': True, 'default': ''}), 'frame_b': ('INT', {'default': 12})}, 'optional': {'text_c': ('STRING', {'forceInput': True, 'multiline': True, 'default': ''}), 'frame_c': ('INT', {'default': 24}), 'text_d': ('STRING', {'forceInput': True, 'multiline': True, 'default': ''}), 'frame_d': ('INT', {'default': 36}), 'text_e': ('STRING', {'forceInput': True, 'multiline': True, 'default': ''}), 'frame_e': ('INT', {'default': 48}), 'text_f': ('STRING', {'forceInput': True, 'multiline': True, 'default': ''}), 'frame_f': ('INT', {'default': 60}), 'text_g': ('STRING', {'forceInput': True, 'multiline': True, 'default': ''}), 'frame_g': ('INT', {'default': 72})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'frame_concatenate_list'
    CATEGORY = 'FizzNodes 📅🅕🅝/FrameNodes'

    def frame_concatenate_list(self, text_a, frame_a, text_b, frame_b, text_c=None, frame_c=None, text_d=None, frame_d=None, text_e=None, frame_e=None, text_f=None, frame_f=None, text_g=None, frame_g=None):
        text_a = text_a.replace('\n', '')
        text_b = text_b.replace('\n', '')
        text_c = text_c.replace('\n', '') if text_c is not None else None
        text_d = text_d.replace('\n', '') if text_d is not None else None
        text_e = text_e.replace('\n', '') if text_e is not None else None
        text_f = text_f.replace('\n', '') if text_f is not None else None
        text_g = text_g.replace('\n', '') if text_g is not None else None
        text_list = f'"{frame_a}": "{text_a}",'
        text_list += f'"{frame_b}": "{text_b}",'
        if frame_c is not None and text_c is not None:
            text_list += f'"{frame_c}": "{text_c}",'
        if frame_d is not None and text_d is not None:
            text_list += f'"{frame_d}": "{text_d}",'
        if frame_e is not None and text_e is not None:
            text_list += f'"{frame_e}": "{text_e}",'
        if frame_f is not None and text_f is not None:
            text_list += f'"{frame_f}": "{text_f}",'
        if frame_g is not None and text_g is not None:
            text_list += f'"{frame_g}": "{text_g}",'
        return (text_list,)
```