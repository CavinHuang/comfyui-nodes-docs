# Documentation
- Class name: WAS_Debug_Number_to_Console
- Category: WAS Suite/Debug
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

“debug_to_console”方法作为开发者的实用工具，允许他们将数字打印到控制台，并附带自定义标签以供调试之用。它通过为输出应用颜色编码来增强调试信息的可见性。

# Input types
## Required
- number
    - “number”参数对于节点的操作至关重要，因为它是将被打印到控制台的值。它在调试过程中扮演着关键角色，通过提供需要检查的特定数据点。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]
## Optional
- label
    - “label”参数用于在数字前加上描述性文本，使其更容易识别调试消息的上下文。当在脚本中使用多个调试语句时，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result
    - “result”参数代表用于调试的原始数字。它被返回以维持数据通过节点的流动，如果需要，允许进行进一步处理。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Debug_Number_to_Console:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number': ('NUMBER',), 'label': ('STRING', {'default': 'Debug to Console', 'multiline': False})}}
    RETURN_TYPES = ('NUMBER',)
    OUTPUT_NODE = True
    FUNCTION = 'debug_to_console'
    CATEGORY = 'WAS Suite/Debug'

    def debug_to_console(self, number, label):
        if label.strip() != '':
            cstr(f'\x1b[33m{label}\x1b[0m:\n{number}\n').msg.print()
        else:
            cstr(f'\x1b[33mDebug to Console\x1b[0m:\n{number}\n').msg.print()
        return (number,)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
```