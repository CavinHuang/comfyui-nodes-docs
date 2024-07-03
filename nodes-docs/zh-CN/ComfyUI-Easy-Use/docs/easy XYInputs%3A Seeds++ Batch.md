
# Documentation
- Class name: easy XYInputs: Seeds++ Batch
- Category: EasyUse/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点旨在生成一批用于绘图或其他批处理任务的种子值，每个种子代表生成过程的一个独特起点。它允许指定批次大小，为生成和使用的种子数量提供了灵活性。

# Input types
## Required
- batch_count
    - 指定要在批次中生成的种子数量。此参数允许用户控制批处理操作的规模，影响可用于生成的独特起点的总数。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- X or Y
    - 输出一个包含坐标轴标签和种子值批次的字典，可直接用于绘图或进一步处理。
    - Comfy dtype: X_Y
    - Python dtype: Dict[str, Union[str, int]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_SeedsBatch:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
            "batch_count": ("INT", {"default": 3, "min": 1, "max": 50}), },
        }

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, batch_count):

        axis = "advanced: Seeds++ Batch"
        xy_values = {"axis": axis, "values": batch_count}
        return (xy_values,)

```
