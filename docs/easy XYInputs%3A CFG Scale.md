
# Documentation
- Class name: easy XYInputs: CFG Scale
- Category: EasyUse/XY Inputs
- Output node: False

该节点旨在简化和优化条件自由引导(CFG)尺度值在生成模型中的探索和调整过程。它允许用户动态地调整CFG尺度，从而实现对模型条件生成能力的精细调节，以更好地控制输出质量和符合指定条件。

# Input types
## Required
- batch_count
    - 指定CFG尺度调整将应用的批次数。此参数对于了解操作规模和确保调整在多个实例中均匀应用至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- first_cfg
    - 确定CFG尺度调整的起始值。这允许设置条件引导对生成过程的初始影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_cfg
    - 设置CFG尺度调整的结束值。此参数使得可以在指定范围内微调CFG尺度对生成过程的影响，从而实现渐进式调整。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- X or Y
    - 返回CFG尺度调整的结果，这可能是修改后的生成模型或特定的生成结果集，具体取决于操作的上下文。
    - Comfy dtype: X_Y
    - Python dtype: custom type


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class XYplot_CFG:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_count": ("INT", {"default": 3, "min": 0, "max": 50}),
                "first_cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0}),
                "last_cfg": ("FLOAT", {"default": 9.0, "min": 0.0, "max": 100.0}),
            }
        }

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, batch_count, first_cfg, last_cfg):
        axis = "advanced: CFG Scale"
        values = generate_floats(batch_count, first_cfg, last_cfg)
        return ({"axis": axis, "values": values},) if values else (None,)

```
