
# Documentation
- Class name: XY Input: Clip Skip
- Category: Efficiency Nodes/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

XY Input: Clip Skip节点专门用于处理和验证用于生成XY图的clip skip值。它的主要功能是在指定范围内调整clip skip值，并确保这些值适用于目标检查点（"Base"或"Refiner"）。该节点通过微调clip skip参数来优化生成过程，这对控制图表数据的精细度至关重要。

# Input types
## Required
- target_ckpt
    - 指定调整clip skip值的目标检查点。它决定了应用clip skip值的上下文（"Base"或"Refiner"），从而影响XY图的输出精度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: Tuple[str]
- batch_count
    - 定义生成clip skip值的批次数量。这影响了处理的数据量和最终XY图的详细程度。
    - Comfy dtype: INT
    - Python dtype: int
- first_clip_skip
    - clip skip范围的起始点。它设置了clip skip调整的下限，影响图表的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- last_clip_skip
    - clip skip范围的终止点。它设置了clip skip调整的上限，影响图表的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- X or Y
    - 输出XY图的数据，包含经过处理和验证的clip skip值。这些数据直接用于生成最终的XY图。
    - Comfy dtype: XY
    - Python dtype: unknown


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_ClipSkip:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "target_ckpt": (["Base","Refiner"],),
                "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "first_clip_skip": ("INT", {"default": -1, "min": -24, "max": -1, "step": 1}),
                "last_clip_skip": ("INT", {"default": -3, "min": -24, "max": -1, "step": 1}),
            },
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_ckpt, batch_count, first_clip_skip, last_clip_skip):
        if target_ckpt == "Base":
            xy_type = "Clip Skip"
        else:
            xy_type = "Clip Skip (Refiner)"
        xy_value = generate_ints(batch_count, first_clip_skip, last_clip_skip)
        return ((xy_type, xy_value),) if xy_value else (None,)

```
