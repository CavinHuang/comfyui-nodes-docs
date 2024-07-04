
# Documentation
- Class name: XY Input: Steps
- Category: Efficiency Nodes/XY Inputs
- Output node: False

XY Input: Steps节点用于生成基于指定步进参数的值序列，这些序列适用于批处理或迭代操作。它简化了步进序列生成的复杂性，有助于在XY图中进行高效的数据处理和可视化。

# Input types
## Required
- target_parameter
    - 指定用于生成步进值的目标参数，影响序列生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_count
    - 确定要生成的值的数量，直接影响输出序列的长度。
    - Comfy dtype: INT
    - Python dtype: int
- first_step
    - 步进序列的起始值，设置生成的初始点。
    - Comfy dtype: INT
    - Python dtype: int
- last_step
    - 步进序列的结束值，定义生成序列的最终点。
    - Comfy dtype: INT
    - Python dtype: int
- first_start_step
    - 定义start_at_step参数的初始步进值，影响序列的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- last_start_step
    - 指定start_at_step参数的最终步进值，影响序列的开始点。
    - Comfy dtype: INT
    - Python dtype: int
- first_end_step
    - 设置end_at_step参数的起始步进值，影响序列的终止点。
    - Comfy dtype: INT
    - Python dtype: int
- last_end_step
    - 确定end_at_step参数的最终步进值，定义序列的结束点。
    - Comfy dtype: INT
    - Python dtype: int
- first_refine_step
    - 表示refine_at_step参数的初始步进值，影响序列的精炼起始点。
    - Comfy dtype: INT
    - Python dtype: int
- last_refine_step
    - 指定refine_at_step参数的最终步进值，影响序列的精炼结束点。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- X or Y
    - 包含生成的步进序列类型（X或Y）和序列本身的元组，便于进一步处理或可视化。
    - Comfy dtype: XY
    - Python dtype: Tuple[str, List[int]]


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [XY Plot](../../efficiency-nodes-comfyui/Nodes/XY Plot.md)



## Source code
```python
class TSC_XYplot_Steps:
    parameters = ["steps","start_at_step", "end_at_step", "refine_at_step"]
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "target_parameter": (cls.parameters,),
                "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "first_step": ("INT", {"default": 10, "min": 1, "max": 10000}),
                "last_step": ("INT", {"default": 20, "min": 1, "max": 10000}),
                "first_start_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                "last_start_step": ("INT", {"default": 10, "min": 0, "max": 10000}),
                "first_end_step": ("INT", {"default": 10, "min": 0, "max": 10000}),
                "last_end_step": ("INT", {"default": 20, "min": 0, "max": 10000}),
                "first_refine_step": ("INT", {"default": 10, "min": 0, "max": 10000}),
                "last_refine_step": ("INT", {"default": 20, "min": 0, "max": 10000}),
            }
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_parameter, batch_count, first_step, last_step, first_start_step, last_start_step,
                 first_end_step, last_end_step, first_refine_step, last_refine_step):

        if target_parameter == "steps":
            xy_type = "Steps"
            xy_first = first_step
            xy_last = last_step
        elif target_parameter == "start_at_step":
            xy_type = "StartStep"
            xy_first = first_start_step
            xy_last = last_start_step
        elif target_parameter == "end_at_step":
            xy_type = "EndStep"
            xy_first = first_end_step
            xy_last = last_end_step
        elif target_parameter == "refine_at_step":
            xy_type = "RefineStep"
            xy_first = first_refine_step
            xy_last = last_refine_step

        xy_value = generate_ints(batch_count, xy_first, xy_last)
        return ((xy_type, xy_value),) if xy_value else (None,)

```
