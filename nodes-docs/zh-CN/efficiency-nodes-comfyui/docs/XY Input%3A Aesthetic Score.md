
# Documentation
- Class name: XY Input: Aesthetic Score
- Category: Efficiency Nodes/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点用于生成XY绘图的美学分数值，使用户能够根据指定标准对图像或输出的美学质量进行可视化和分析。它支持正面和负面的美学分数，从而能够对美学属性进行全面评估。

# Input types
## Required
- target_ascore
    - 指定目标美学分数类型，可以是"正面"或"负面"，用于确定美学评估的性质。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_count
    - 确定要生成的美学分数值的数量，便于批量处理以提高效率和可扩展性。
    - Comfy dtype: INT
    - Python dtype: int
- first_ascore
    - 设置美学分数范围的起始点，允许自定义评估范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_ascore
    - 定义美学分数范围的终点，允许精确控制评估区间。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- X or Y
    - 输出生成的美学分数值，分类为"AScore+"（正面）或"AScore-"（负面），适用于XY绘图。
    - Comfy dtype: XY
    - Python dtype: Tuple[str, List[float]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_AScore:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "target_ascore": (["positive", "negative"],),
                "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "first_ascore": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
                "last_ascore": ("FLOAT", {"default": 10.0, "min": 0.0, "max": 1000.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_ascore, batch_count, first_ascore, last_ascore):
        if target_ascore == "positive":
            xy_type = "AScore+"
        else:
            xy_type = "AScore-"
        xy_value = generate_floats(batch_count, first_ascore, last_ascore)
        return ((xy_type, xy_value),) if xy_value else (None,)

```
