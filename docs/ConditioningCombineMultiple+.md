
# Documentation
- Class name: ConditioningCombineMultiple+
- Category: essentials
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在将多个条件输入合并为单一条件输出。它支持组合最多五个条件输入，允许灵活地将各种条件元素整合成一个统一的表示。

# Input types
## Required
- conditioning_i
    - 未知类型的条件输入。该参数是节点的核心输入，代表将被合并的多个条件数据。每个条件输入的结构和内容对节点的功能以及最终合并结果都至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: unknown

## Optional

# Output types
- conditioning
    - 合并后的条件输出，将最多五个独立的条件输入整合成一个统一的表示。这个输出封装了所有输入条件的综合特性，可用于后续的处理或分析。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningCombineMultiple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "conditioning_1": ("CONDITIONING",),
                "conditioning_2": ("CONDITIONING",),
            }, "optional": {
                "conditioning_3": ("CONDITIONING",),
                "conditioning_4": ("CONDITIONING",),
                "conditioning_5": ("CONDITIONING",),
            },
        }
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, conditioning_1, conditioning_2, conditioning_3=None, conditioning_4=None, conditioning_5=None):
        c = conditioning_1 + conditioning_2

        if conditioning_3 is not None:
            c += conditioning_3
        if conditioning_4 is not None:
            c += conditioning_4
        if conditioning_5 is not None:
            c += conditioning_5
        
        return (c,)

```
