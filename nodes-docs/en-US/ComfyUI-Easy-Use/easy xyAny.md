---
tags:
- DataVisualization
- XYPlotData
---

# XYAny
## Documentation
- Class name: `easy xyAny`
- Category: `EasyUse/Logic`
- Output node: `False`

The `easy xyAny` node is designed to facilitate the exploration and manipulation of data points or conditions across two dimensions, X and Y, within a customizable pipeline. It abstracts the complexity of handling various types of inputs and conditions, enabling users to easily plot, modify, or analyze data in a two-dimensional space, tailored to specific needs or experiments.
## Input types
### Required
- **`X`**
    - Specifies one of the dimensions in a two-dimensional space, serving as a basis for plotting, modifying, or analyzing data.
    - Comfy dtype: `*`
    - Python dtype: `str`
- **`Y`**
    - Specifies the other dimension in a two-dimensional space, complementing X to enable a comprehensive analysis or visualization of data.
    - Comfy dtype: `*`
    - Python dtype: `str`
- **`direction`**
    - Determines the orientation or sequence in which data points are processed or plotted, affecting the visualization or analysis outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`X`**
    - Comfy dtype: `*`
    - Outputs data points or conditions along the X axis, reflecting modifications or analyses performed by the node.
    - Python dtype: `dict`
- **`Y`**
    - Comfy dtype: `*`
    - Outputs data points or conditions along the Y axis, complementing the X output for a full two-dimensional perspective.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class xyAny:

    @classmethod
    def INPUT_TYPES(s):

        return {
            "required": {
                "X": (AlwaysEqualProxy("*"), {}),
                "Y": (AlwaysEqualProxy("*"), {}),
                "direction": (["horizontal", "vertical"], {"default": "horizontal"})
            }
        }

    RETURN_TYPES = (AlwaysEqualProxy("*"), AlwaysEqualProxy("*"))
    RETURN_NAMES = ("X", "Y")
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, True)
    CATEGORY = "EasyUse/Logic"
    FUNCTION = "to_xy"

    def to_xy(self, X, Y, direction):
        new_x = list()
        new_y = list()
        if direction[0] == "horizontal":
            for y in Y:
                for x in X:
                    new_x.append(x)
                    new_y.append(y)
        else:
            for x in X:
                for y in Y:
                    new_x.append(x)
                    new_y.append(y)

        return (new_x, new_y)

```
