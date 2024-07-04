
# Documentation
- Class name: Enable Disable Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False

本节点旨在基于特定条件在启用和禁用状态之间进行切换。它通过评估两个整数输入与预定义的匹配条件的相等性来确定输出状态，从而实现系统内的动态控制流。

# Input types
## Required
- select
    - 一个整数输入，用于与另一个输入进行比较以确定开关状态。其值影响节点启用或禁用的决策。
    - Comfy dtype: INT
    - Python dtype: int
- compare
    - 一个整数输入，用于与'select'输入进行比较以确定开关状态。这种比较对节点的功能至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- match
    - 一个预定义的条件，根据'select'和'compare'输入的比较结果决定开关是否应设置为启用或禁用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- enable_disable
    - 开关的输出状态，可以是'enable'或'disable'，由输入条件决定。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Enable_Disable_Switch:
    match = ["Set to Enable","Set to Disable"]

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = (["enable","disable"],)
    RETURN_NAMES = ("enable_disable",)
    FUNCTION = "get_endisable"

    @classmethod
    def INPUT_TYPES(s):    
        return {
            "required": {
                "select": ("INT", {"default": 1, "min": 1, "max": 9, "step": 1}),
                "compare": ("INT", {"default": 1, "min": 1, "max": 9, "step": 1}),
                "match": (s.match,),
            }
        }

    def get_endisable(self,select,compare,match):
        enable_disable = "disable"
        if match == "Set to Enable" and (int(select) == int(compare)):
            enable_disable = "enable"
        elif match == "Set to Disable" and (int(select) == int(compare)):
            enable_disable = "disable"
        elif match == "Set to Enable" and (int(select) != int(compare)):
            enable_disable = "disable"
        elif match == "Set to Disable" and (int(select) != int(compare)):
            enable_disable = "enable"
        
        return (enable_disable, )

```
