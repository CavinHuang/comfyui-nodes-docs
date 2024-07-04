
# Documentation
- Class name: XY Input: CFG Scale
- Category: Efficiency Nodes/XY Inputs
- Output node: False

XY Input: CFG Scale节点用于生成和处理用于XY绘图的配置比例（CFG Scale）值。它在效率导向的环境中，根据输入参数生成一系列浮点数，确保这些值在指定范围内。该节点对于需要精确调整CFG Scale值并进行可视化表示的任务至关重要，有助于各种过程的优化和效率分析。

# Input types
## Required
- batch_count
    - 指定要生成的CFG Scale值的数量。它通过决定输出的CFG Scale值数组的大小来影响节点的执行。
    - Comfy dtype: INT
    - Python dtype: int
- first_cfg
    - 定义CFG Scale范围的起始点。它影响生成的CFG Scale值的下限，确保输出从这个指定值开始。
    - Comfy dtype: FLOAT
    - Python dtype: float
- last_cfg
    - 设置CFG Scale范围的终点。它影响生成的CFG Scale值的上限，确保输出在这个指定值结束。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- X or Y
    - 输出一个包含生成的CFG Scale值的数组，用于XY绘图目的。这些值在指定的范围内均匀分布。
    - Comfy dtype: XY
    - Python dtype: List[float]


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [XY Plot](../../efficiency-nodes-comfyui/Nodes/XY Plot.md)



## Source code
```python
class TSC_XYplot_CFG:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),
                "first_cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0}),
                "last_cfg": ("FLOAT", {"default": 9.0, "min": 0.0, "max": 100.0}),
            }
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, batch_count, first_cfg, last_cfg):
        xy_type = "CFG Scale"
        xy_value = generate_floats(batch_count, first_cfg, last_cfg)
        return ((xy_type, xy_value),) if xy_value else (None,)

```
