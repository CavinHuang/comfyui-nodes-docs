
# Documentation
- Class name: Disable Enable Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False

该节点根据两个整数值的比较和匹配条件在禁用和启用功能之间进行切换。

# Input types
## Required
- select
    - 指定要比较的第一个整数值，影响开关的结果。
    - Comfy dtype: INT
    - Python dtype: int
- compare
    - 指定要与第一个值进行比较的第二个整数值，影响开关的结果。
    - Comfy dtype: INT
    - Python dtype: int
- match
    - 决定控制开关行为的条件（'Set to Disable' 或 'Set to Enable'）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list of str

# Output types
- disable_enable
    - 根据输入值的比较和匹配条件输出 'disable' 或 'enable'。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Disable_Enable_Switch:
    match = ["Set to Disable","Set to Enable"]

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = (["disable","enable"],)
    RETURN_NAMES = ("disable_enable",)
    FUNCTION = "get_disenable"

    @classmethod
    def INPUT_TYPES(s):    
        return {
            "required": {
                "select": ("INT", {"default": 1, "min": 1, "max": 9, "step": 1}),
                "compare": ("INT", {"default": 1, "min": 1, "max": 9, "step": 1}),
                "match": (s.match,),
            }
        }

    def get_disenable(self,select,compare,match):
        disable_enable = "disable"
        if match == "Set to Enable" and (int(select) == int(compare)):
            disable_enable = "enable"
        elif match == "Set to Disable" and (int(select) == int(compare)):
            disable_enable = "disable"
        elif match == "Set to Enable" and (int(select) != int(compare)):
            disable_enable = "disable"
        elif match == "Set to Disable" and (int(select) != int(compare)):
            disable_enable = "enable"
        
        return (disable_enable, )

```
