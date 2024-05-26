# Documentation
- Class name: FrameConcatenate
- Category: FizzNodes 📅🅕🅝/FrameNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

FrameConcatenate 是一个旨在将帧数据合并为单一字符串表示的节点。它接受一个结构化的帧对象作为输入，并将每个帧数字关联的正面和负面文本串联起来，创建一个全面的文本摘要。这个节点在将复杂的帧数据转换为可读格式以进行进一步分析或展示中发挥着关键作用。

# Input types
## Required
- frame
    - ‘frame’参数对于FrameConcatenate节点至关重要，因为它作为主要输入，包含需要被串联的框架数据。节点依赖此参数来生成所需的输出，使其成为节点功能的基本组成部分。
    - Comfy dtype: FIZZFRAME
    - Python dtype: A custom object that contains frame data structured in a specific way, expected to be compatible with the Fizz framework.

# Output types
- text_list
    - ‘text_list’输出是一个字符串，代表串联起来的帧数据。它是节点处理的结果，包含了与每个帧数字关联的正面和负面文本。这个输出很重要，因为它提供了一个格式化的摘要，可以很容易地用于后续任务。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class FrameConcatenate:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'frame': ('FIZZFRAME', {'forceInput': True})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'frame_concatenate'
    CATEGORY = 'FizzNodes 📅🅕🅝/FrameNodes'

    def frame_concatenate(self, frame):
        text_list = ''
        for frame_digit in frame.frames:
            new_frame = frame.frames[frame_digit]
            text_list += f'''"{frame_digit}": "{new_frame['positive_text']}'''
            if new_frame.get('general_positive'):
                text_list += f", {new_frame['general_positive']}"
            if new_frame.get('negative_text') or new_frame.get('general_negative'):
                text_list += f', --neg '
                if new_frame.get('negative_text'):
                    text_list += f", {new_frame['negative_text']}"
                if new_frame.get('general_negative'):
                    text_list += f", {new_frame['general_negative']}"
            text_list += f'",\n'
        text_list = text_list[:-2]
        return (text_list,)
```