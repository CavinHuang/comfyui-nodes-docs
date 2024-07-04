
# Documentation
- Class name: easy XYInputs: PositiveCond
- Category: EasyUse/XY Inputs
- Output node: False

该节点旨在处理XY图表的正向条件输入，允许用户指定影响图表轴和数值的正向情景条件。它简化了处理正向输入的条件逻辑复杂性，有助于创建反映特定正向条件的自定义图表。

# Input types
## Optional
- positive_i
    - 表示要应用的正向条件，其中'i'可以从1到4。每个条件都会逐步修改图表的轴和数值，提高图表的特异性，并允许采用分层方法来根据正向情景自定义图表的外观。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[str]

# Output types
- X or Y
    - 输出为图表配置的轴和数值，反映了应用的正向条件。这个输出展示了根据应用的条件选择X轴或Y轴的灵活性，提供了定制化的绘图体验。
    - Comfy dtype: X_Y
    - Python dtype: Tuple[Dict[str, Any]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class XYplot_Positive_Cond:

    @classmethod
    def INPUT_TYPES(cls):
        inputs = {
            "optional": {
                "positive_1": ("CONDITIONING",),
                "positive_2": ("CONDITIONING",),
                "positive_3": ("CONDITIONING",),
                "positive_4": ("CONDITIONING",),
            }
        }

        return inputs

    RETURN_TYPES = ("X_Y",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "EasyUse/XY Inputs"

    def xy_value(self, positive_1=None, positive_2=None, positive_3=None, positive_4=None):
        axis = "advanced: Pos Condition"
        values = []
        cond = []
        # Create base entry
        if positive_1 is not None:
            values.append("0")
            cond.append(positive_1)
        if positive_2 is not None:
            values.append("1")
            cond.append(positive_2)
        if positive_3 is not None:
            values.append("2")
            cond.append(positive_3)
        if positive_4 is not None:
            values.append("3")
            cond.append(positive_4)

        return ({"axis": axis, "values": values, "cond": cond},) if values is not None else (None,)

```
