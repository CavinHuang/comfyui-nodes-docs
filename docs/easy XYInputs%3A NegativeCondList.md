
# Documentation
- Class name: easy XYInputs: NegativeCondList
- Category: EasyUse/XY Inputs
- Output node: False

此节点用于处理XY绘图的负面条件列表，将其转换为适合进一步处理或可视化的结构化格式。它通过将多个负面条件封装成统一的表示形式，简化了处理多个负面条件的复杂性。

# Input types
## Required
- negative
    - 'negative'输入接受一个用于XY绘图中负面场景的条件列表。它在定义某些行为或事件被视为负面的条件方面起着至关重要的作用，从而影响绘图过程的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[str]

# Output types
- X or Y
    - 输出负面条件的结构化表示，包括它们的索引和对应的条件，格式化后便于与XY绘图功能集成。
    - Comfy dtype: X_Y
    - Python dtype: Tuple[Dict[str, List[str]], ...]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Negative_Cond_List:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "negative": ("CONDITIONING",),
            }
        }

    INPUT_IS_LIST = True
    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, negative):
        axis = "advanced: Neg Condition"
        values = []
        cond = []
        for index, c in enumerate(negative):
            values.append(index)
            cond.append(c)

        return ({"axis": axis, "values": values, "cond": cond},) if values is not None else (None,)

```
