
# Documentation
- Class name: easy XYInputs: PositiveCondList
- Category: EasyUse/XY Inputs
- Output node: False

XYplot_Positive_Cond_List节点旨在处理一系列正面条件，将它们转化为适合绘图或进一步分析的结构化格式。它专注于根据正面属性识别和组织这些条件，便于在"正面"语境中对数据点进行可视化或操作。

# Input types
## Required
- positive
    - 'positive'输入接受一系列条件，每个条件代表一个正面属性或标准。这个输入对节点的运行至关重要，因为它决定了将要被处理和结构化以供输出的条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[str]

# Output types
- X or Y
    - 输出正面条件的结构化表示，包括它们的索引和相应的条件，可直接用于绘图或分析。
    - Comfy dtype: X_Y
    - Python dtype: Tuple[Dict[str, List[str]], ...]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Positive_Cond_List:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "positive": ("CONDITIONING",),
            }
        }

    INPUT_IS_LIST = True
    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, positive):
        axis = "advanced: Pos Condition"
        values = []
        cond = []
        for index, c in enumerate(positive):
            values.append(str(index))
            cond.append(c)

        return ({"axis": axis, "values": values, "cond": cond},) if values is not None else (None,)

```
