
# Documentation
- Class name: easy XYInputs: NegativeCond
- Category: EasyUse/XY Inputs
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

easy XYInputs: NegativeCond节点旨在处理XY绘图的负面条件输入。它根据指定的负面输入动态生成值和条件，有助于创建直观表示负面条件的图表。

# Input types
## Optional
- negative_i
    - 指定要在XY图中考虑的负面条件。它在确定图表对负面条件的表示中起着重要作用，其中'i'可以从1到4，最多代表四个负面条件。
    - Comfy dtype: C
    - Python dtype: str

# Output types
- X or Y
    - 输出处理后的XY值和条件，将负面条件封装成适合绘图的格式。
    - Comfy dtype: X_Y
    - Python dtype: Dict[str, List]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Negative_Cond:

    @classmethod
    def INPUT_TYPES(cls):
        inputs = {
            "optional": {
                "negative_1": ("CONDITIONING"),
                "negative_2": ("CONDITIONING"),
                "negative_3": ("CONDITIONING"),
                "negative_4": ("CONDITIONING"),
            }
        }

        return inputs

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, negative_1=None, negative_2=None, negative_3=None, negative_4=None):
        axis = "advanced: Neg Condition"
        values = []
        cond = []
        # Create base entry
        if negative_1 is not None:
            values.append(0)
            cond.append(negative_1)
        if negative_2 is not None:
            values.append(1)
            cond.append(negative_2)
        if negative_3 is not None:
            values.append(2)
            cond.append(negative_3)
        if negative_4 is not None:
            values.append(3)
            cond.append(negative_4)

        return ({"axis": axis, "values": values, "cond": cond},) if values is not None else (None,)

```
