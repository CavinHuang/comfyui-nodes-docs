
# Documentation
- Class name: ConditioningMultiCombine
- Category: KJNodes/masking/conditioning
- Output node: False

该节点旨在将多个条件输入聚合成一个统一的条件输出。它利用其他条件节点的功能来顺序组合条件数据，以简化的方式实现复杂的条件场景。

# Input types
## Required
- inputcount
    - 指定要组合的条件输入数量。它通过规定将处理和合并的条件输入数量来决定执行流程。
    - Comfy dtype: INT
    - Python dtype: int
- conditioning_i
    - 表示一系列要组合的条件输入，从'conditioning_1'开始到'conditioning_{inputcount}'。每个输入都作为组合条件输出的增量添加，促进顺序组合过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: list of CONDITIONING

# Output types
- combined
    - 将指定的条件输入组合成单一条件输出的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING
- inputcount
    - 返回被组合的条件输入数量。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningMultiCombine:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "inputcount": ("INT", {"default": 2, "min": 2, "max": 20, "step": 1}),
                "conditioning_1": ("CONDITIONING", ),
                "conditioning_2": ("CONDITIONING", ),
            },
    }

    RETURN_TYPES = ("CONDITIONING", "INT")
    RETURN_NAMES = ("combined", "inputcount")
    FUNCTION = "combine"
    CATEGORY = "KJNodes/masking/conditioning"
    DESCRIPTION = """
Combines multiple conditioning nodes into one
"""

    def combine(self, inputcount, **kwargs):
        from nodes import ConditioningCombine
        cond_combine_node = ConditioningCombine()
        cond = kwargs["conditioning_1"]
        for c in range(1, inputcount):
            new_cond = kwargs[f"conditioning_{c + 1}"]
            cond = cond_combine_node.combine(new_cond, cond)[0]
        return (cond, inputcount,)

```
