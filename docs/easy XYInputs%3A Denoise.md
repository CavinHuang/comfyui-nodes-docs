
# Documentation
- Class name: easy XYInputs: Denoise
- Category: EasyUse/XY Inputs
- Output node: False

该节点旨在帮助用户探索和可视化生成模型中的降噪效果。它允许用户在一批数据上调整降噪参数，从而提供不同降噪级别对生成输出影响的图形化表示。

# Input types
## Required
- batch_count
    - 指定要处理的批次数量，允许用户检查多组数据的降噪效果。
    - Comfy dtype: INT
    - Python dtype: int
- first_denoise
    - 设置初始降噪级别，标记降噪效果探索的起点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_denoise
    - 定义最终降噪级别，使用户能够观察增加或减少降噪强度如何影响输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- X or Y
    - 提供降噪过程的图形表示，展示不同降噪级别对数据的影响。
    - Comfy dtype: X_Y
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Denoise:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_count": ("INT", {"default": 3, "min": 0, "max": 50}),
                "first_denoise": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.1}),
                "last_denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.1}),
            }
        }

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, batch_count, first_denoise, last_denoise):
        axis = "advanced: Denoise"
        values = generate_floats(batch_count, first_denoise, last_denoise)
        return ({"axis": axis, "values": values},) if values else (None,)

```
