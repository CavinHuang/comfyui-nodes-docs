
# Documentation
- Class name: XY Input: Add_Return Noise
- Category: Efficiency Nodes/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

TSC_XYplot_AddReturnNoise节点专门设计用于处理XY输入类型，特别是在给定过程中添加或返回噪声。它将输入类型映射到相应的噪声操作，根据指定的类型启用或禁用噪声。

# Input types
## Required
- XY_type
    - 指定要执行的噪声操作类型，可以是添加噪声或返回剩余噪声，这决定了节点如何处理输入。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- X or Y
    - 输出参数X or Y代表了节点处理后的结果，可能是添加了噪声的数据或返回的剩余噪声，具体取决于输入的XY_type。
    - Comfy dtype: XY
    - Python dtype: unknown


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_AddReturnNoise:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "XY_type": (["add_noise", "return_with_leftover_noise"],)}
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, XY_type):
        type_mapping = {
            "add_noise": "AddNoise",
            "return_with_leftover_noise": "ReturnNoise"
        }
        xy_type = type_mapping[XY_type]
        xy_value = ["enable", "disable"]
        return ((xy_type, xy_value),)

```
