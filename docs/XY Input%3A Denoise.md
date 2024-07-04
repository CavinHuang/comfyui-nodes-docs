
# Documentation
- Class name: XY Input: Denoise
- Category: Efficiency Nodes/XY Inputs
- Output node: False

XY Input: Denoise节点用于生成一组表示去噪级别的浮点值，用于数据批处理。它抽象了在指定范围内计算去噪值的过程，有助于在计算效率背景下对去噪效果进行可视化或分析。

# Input types
## Required
- batch_count
    - 指定要生成的去噪值数量，允许控制去噪分析的粒度。
    - Comfy dtype: INT
    - Python dtype: int
- first_denoise
    - 定义去噪范围的起点，允许自定义去噪过程的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_denoise
    - 设置去噪范围的终点，允许调整去噪分析的上限。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- X or Y
    - 输出一个元组，包含值的类型('Denoise')和生成的浮点去噪值，适用于绘图或进一步分析。
    - Comfy dtype: XY
    - Python dtype: Tuple[str, List[float]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Denoise:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "first_denoise": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "last_denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, batch_count, first_denoise, last_denoise):
        xy_type = "Denoise"
        xy_value = generate_floats(batch_count, first_denoise, last_denoise)
        return ((xy_type, xy_value),) if xy_value else (None,)

```
