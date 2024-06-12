# Documentation
- Class name: WAS_Text_Input_Switch
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Text_Input_Switch节点的'text_input_switch'方法旨在根据布尔标志有条件地在两个文本输入之间进行选择。它作为一个逻辑开关，在一个需要决策的流程或工作流中指导文本数据的流向。此节点在管理基于文本的操作中的条件逻辑中起着关键作用。

# Input types
## Required
- text_a
    - 'text_a'参数是节点根据布尔条件可以切换到的第一个文本输入。它对于节点的决策过程至关重要，因为它代表了布尔标志为真时可能的结果之一。
    - Comfy dtype: STRING
    - Python dtype: str
- text_b
    - 'text_b'参数是当布尔标志为假时节点可以选择的替代文本输入。它至关重要，因为它定义了条件未满足时文本数据的替代路径。
    - Comfy dtype: STRING
    - Python dtype: str
- boolean
    - 'boolean'参数作为一个标志，用以决定返回哪个文本输入。它是节点功能的关键组成部分，因为它的真值直接影响节点的输出。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- output_text
    - 'output_text'是节点操作的结果，根据'boolean'输入的值，它要么是'text_a'要么是'text_b'。它代表了节点决策过程后选定的文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Input_Switch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text_a': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'text_b': (TEXT_TYPE, {'forceInput': True if TEXT_TYPE == 'STRING' else False}), 'boolean': ('BOOLEAN', {'forceInput': True})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'text_input_switch'
    CATEGORY = 'WAS Suite/Logic'

    def text_input_switch(self, text_a, text_b, boolean=True):
        if boolean:
            return (text_a,)
        else:
            return (text_b,)
```