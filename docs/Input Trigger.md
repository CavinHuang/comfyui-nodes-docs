# Documentation
- Class name: Trigger
- Category: 😺dzNodes
- Output node: True
- Repo Ref: https://github.com/chflame163/ComfyUI_MSSpeech_TTS

该节点充当条件门，评估输入以确定它们是否满足指定条件，从而控制数据流经系统。

# Input types
## Required
- always_true
    - 一个布尔标志，当为真时，直接触发节点的动作。它是一个关键参数，因为它代表了节点激活的主要条件。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- anything
    - 一个可选输入，如果存在，可以有助于触发节点，为节点激活所需的条件增加了灵活性。
    - Comfy dtype: ANY
    - Python dtype: Any

# Output types
- ret
    - 节点评估的结果，指示激活条件是否已满足。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class Trigger:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'always_true': ('BOOLEAN', {'default': False})}, 'optional': {'anything': (any, {})}}
    RETURN_TYPES = ('BOOLEAN',)
    FUNCTION = 'check_input'
    OUTPUT_NODE = True
    CATEGORY = '😺dzNodes'

    def check_input(self, always_true, anything=None):
        ret = False
        if always_true or anything is not None:
            ret = True
        print(f'# 😺dzNodes: Input Trigger: {ret}')
        return (ret,)
```