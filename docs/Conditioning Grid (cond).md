
# Documentation
- Class name: Conditioning Grid (cond)
- Category: Bmad/conditioning
- Output node: False

Conditioning Grid (cond) 节点旨在将条件控制应用于网格结构，使内容生成过程可以基于特定的网格坐标进行定制化操作。该节点能够实现复杂的基于网格的条件控制场景，从而在生成过程中实现细致入微的掌控。

# Input types
## Required
- columns
    - 指定网格的列数，决定了网格的横向维度。其值直接影响生成内容的水平方向上的复杂程度和精细度。
    - Comfy dtype: INT
    - Python dtype: int
- rows
    - 定义网格的行数，设置网格的纵向维度。这一参数对生成内容在垂直方向上的结构和细节分布起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 设置每个网格单元的宽度，影响应用条件控制的空间分辨率。较大的宽度值可能导致更粗糙的控制，而较小的值则可能实现更精细的调节。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 确定每个网格单元的高度，影响应用条件控制的空间分辨率。高度值的选择会影响垂直方向上的细节表现和控制精度。
    - Comfy dtype: INT
    - Python dtype: int
- strength
    - 决定条件控制效果的强度，允许对生成内容的特征进行微调。较高的强度值可能导致更显著的条件效果，而较低的值则可能产生更微妙的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- base
    - 作为进一步修改的起点的基础条件控制。这对于建立生成内容的初始上下文或主题至关重要，为后续的定制化操作奠定基础。
    - Comfy dtype: CONDITIONING
    - Python dtype: str

# Output types
- conditioning
    - 应用条件控制后的输出，表示经过修改的网格结构。这个输出封装了所有网格坐标的条件信息，可以被后续的生成过程直接利用。
    - Comfy dtype: CONDITIONING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ConditioningGridCond:
    """
    Does the job of multiple area conditions of the same size adjacent to each other.
    Saves space, and is easier and quicker to set up and modify.


    Inputs related notes
    ----------
    base : conditioning
        for most cases, you can set the base from a ClipTextEncode with an empty string.
        If you wish to have something between the cells as common ground, lower the strength and set
        the base with the shared elements.
    columns and rows : integer
        after setting the desired grid size, call the menu option "update inputs" to update
        the node's conditioning input sockets.

        In most cases, columns and rows, should not be converted to input.

        dev note: I've considered disabling columns and rows options to convert to input
        on the javascript side, which (that I am aware) could be done with a modification
        to the core/WidgetInputs.js -> isConvertableWidget(...).
        However, upon reflection, I think there may be use cases in which the inputs are set for the
        maximum size but only a selected number of columns or rows given via input are used.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "columns": grid_len_INPUT,
            "rows": grid_len_INPUT,
            "width": ("INT", {"default": 256, "min": 16, "max": 2048, "step": 1}),
            "height": ("INT", {"default": 256, "min": 16, "max": 2048, "step": 1}),
            "strength": ("FLOAT", {"default": 3, }),
            "base": ("CONDITIONING",)
        }}

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "set_conditioning"
    CATEGORY = "Bmad/conditioning"

    def set_conditioning(self, base, columns, rows, width, height, strength, **kwargs):
        cond = base
        cond_set_area_node = nodes.ConditioningSetArea()
        cond_combine_node = nodes.ConditioningCombine()

        for r in range(rows):
            for c in range(columns):
                arg_name = f"r{r + 1}_c{c + 1}"
                new_cond = kwargs[arg_name]
                new_cond_area = cond_set_area_node.append(new_cond, width, height, c * width, r * height, strength)[0]
                new_cond = cond_combine_node.combine(new_cond_area, cond)[0]

                cond = new_cond
        return (cond,)

```
