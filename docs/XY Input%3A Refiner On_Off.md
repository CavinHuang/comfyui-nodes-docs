
# Documentation
- Class name: XY Input: Refiner On_Off
- Category: Efficiency Nodes/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在根据指定的百分比精炼XY图的输入，使得在数据可视化或处理任务中能动态调整精炼过程，从而优化效率和准确性。

# Input types
## Required
- refine_at_percent
    - 指定开始精炼过程的百分比，允许精确控制何时对XY图应用精炼调整。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- X or Y
    - 输出一个元组，包含精炼类型（'Refiner On/Off'）和在指定百分比应用精炼后的相应XY值。此输出与预期的'X or Y'标识一致，表示X或Y值已被精炼。
    - Comfy dtype: XY
    - Python dtype: Tuple[str, List[float]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Refiner_OnOff:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "refine_at_percent": ("FLOAT",{"default": 0.80, "min": 0.00, "max": 1.00, "step": 0.01})},
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, refine_at_percent):
        xy_type = "Refiner On/Off"
        xy_value = [refine_at_percent, 1]
        return ((xy_type, xy_value),)

```
