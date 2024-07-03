
# Documentation
- Class name: XY Input: Seeds++ Batch
- Category: Efficiency Nodes/XY Inputs
- Output node: False

该节点旨在生成一系列数值，代表一批种子，可用于控制批量处理中的初始化或变异。它允许指定批次大小，并输出一个结构化的种子值表示，以便进行批处理。

# Input types
## Required
- batch_count
    - 指定要为批次生成的种子数量。此计数直接影响输出种子序列的大小，从而能够控制处理的批次大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- X or Y
    - 输出一个元组，包含批次类型（'Seeds++ Batch'）和一个整数列表，表示每个批次条目的种子值。
    - Comfy dtype: XY
    - Python dtype: Tuple[str, List[int]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_SeedsBatch:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
            "batch_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM}),},
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, batch_count):
        if batch_count == 0:
            return (None,)
        xy_type = "Seeds++ Batch"
        xy_value = list(range(batch_count))
        return ((xy_type, xy_value),)

```
