
# Documentation
- Class name: Join XY Inputs of Same Type
- Category: Efficiency Nodes/XY Inputs
- Output node: False

该节点旨在将两个相同类型的XY输入合并成一个单一输出。它针对不同类型的XY数据采用特定的合并策略，在进行合并之前确保输入类型匹配。最终，它提供一个统一的XY输出，以适合各自类型的方式结合输入数据。

# Input types
## Required
- XY_i
    - 表示要合并的XY输入之一。其类型和值对于确定合并策略以及确保与另一个XY输入的兼容性至关重要。
    - Comfy dtype: XY
    - Python dtype: Tuple[str, List[Any]]

# Output types
- X or Y
    - 两个XY输入的合并输出，根据它们的类型和为每种类型实现的特定合并逻辑来组合数据。
    - Comfy dtype: XY
    - Python dtype: Tuple[str, List[Any]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_JoinInputs:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
            "XY_1": ("XY",),
            "XY_2": ("XY",),},
        }

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, XY_1, XY_2):
        xy_type_1, xy_value_1 = XY_1
        xy_type_2, xy_value_2 = XY_2

        if xy_type_1 != xy_type_2:
            print(f"{error('Join XY Inputs Error:')} Input types must match")
            return (None,)
        elif xy_type_1 == "Seeds++ Batch":
            xy_type = xy_type_1
            combined_length = len(xy_value_1) + len(xy_value_2)
            xy_value = list(range(combined_length))
        elif xy_type_1 == "Positive Prompt S/R" or xy_type_1 == "Negative Prompt S/R":
            xy_type = xy_type_1
            xy_value = xy_value_1 + [(xy_value_1[0][0], t[1]) for t in xy_value_2[1:]]
        else:
            xy_type = xy_type_1
            xy_value = xy_value_1 + xy_value_2
        return ((xy_type, xy_value),)

```
