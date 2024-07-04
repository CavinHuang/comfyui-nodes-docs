
# Documentation
- Class name: easy XYInputs: Steps
- Category: EasyUse/XY Inputs
- Output node: False

该节点旨在简化步骤值的操作和可视化，使用户能够轻松指定和调整操作的步骤范围。它抽象了处理步骤间隔的复杂性，让用户能以直观的方式定义和可视化基于步骤的配置。

# Input types
## Required
- target_parameter
    - 指定步骤值将调整的目标参数，如'steps'、'start_at_step'或'end_at_step'，影响节点计算和呈现步骤间隔的方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_count
    - 确定要生成的步骤值数量，影响呈现的步骤间隔的粒度。
    - Comfy dtype: INT
    - Python dtype: int
- first_step
    - 步骤范围的起始值，设置步骤计算的下限。
    - Comfy dtype: INT
    - Python dtype: int
- last_step
    - 步骤范围的结束值，设置步骤计算的上限。
    - Comfy dtype: INT
    - Python dtype: int
- first_start_step
    - 当'start_at_step'是目标参数时，指定初始步骤值，定义此特定间隔的起点。
    - Comfy dtype: INT
    - Python dtype: int
- last_start_step
    - 当'start_at_step'是目标参数时，指定最终步骤值，标记此特定间隔的终点。
    - Comfy dtype: INT
    - Python dtype: int
- first_end_step
    - 当'end_at_step'是目标参数时，指定初始步骤值，定义此特定间隔的起点。
    - Comfy dtype: INT
    - Python dtype: int
- last_end_step
    - 当'end_at_step'是目标参数时，指定最终步骤值，标记此特定间隔的终点。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- X or Y
    - 输出指定范围内步骤值的结构化表示，便于在给定过程中轻松可视化和操作步骤。
    - Comfy dtype: X_Y
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Steps:
    parameters = ["steps", "start_at_step", "end_at_step",]

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "target_parameter": (cls.parameters,),
                "batch_count": ("INT", {"default": 3, "min": 0, "max": 50}),
                "first_step": ("INT", {"default": 10, "min": 1, "max": 10000}),
                "last_step": ("INT", {"default": 20, "min": 1, "max": 10000}),
                "first_start_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                "last_start_step": ("INT", {"default": 10, "min": 0, "max": 10000}),
                "first_end_step": ("INT", {"default": 10, "min": 0, "max": 10000}),
                "last_end_step": ("INT", {"default": 20, "min": 0, "max": 10000}),
            }
        }

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, target_parameter, batch_count, first_step, last_step, first_start_step, last_start_step,
                 first_end_step, last_end_step,):

        axis, xy_first, xy_last = None, None, None

        if target_parameter == "steps":
            axis = "advanced: Steps"
            xy_first = first_step
            xy_last = last_step
        elif target_parameter == "start_at_step":
            axis = "advanced: StartStep"
            xy_first = first_start_step
            xy_last = last_start_step
        elif target_parameter == "end_at_step":
            axis = "advanced: EndStep"
            xy_first = first_end_step
            xy_last = last_end_step

        values = generate_ints(batch_count, xy_first, xy_last)
        return ({"axis": axis, "values": values},) if values is not None else (None,)

```
