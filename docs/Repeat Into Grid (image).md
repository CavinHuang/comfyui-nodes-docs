
# Documentation
- Class name: `Repeat Into Grid (image)`
- Category: `Bmad/image`
- Output node: `False`

Repeat Into Grid (image)节点将输入的图像样本平铺到一个可配置维度的网格中，有效地在指定的行数和列数上重复图像，从而创建一个更大的、网格状的组合图像。

# Input types
## Required
- image
    - 需要在网格中平铺的输入图像。它决定了将在指定的网格维度上重复的基本图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- columns
    - 指定网格中的列数。它决定了输入图像在水平方向上重复的次数。
    - Comfy dtype: INT
    - Python dtype: int
- rows
    - 指定网格中的行数。它决定了输入图像在垂直方向上重复的次数。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个单一的图像，由根据指定的行数和列数平铺的输入图像组成，形成一个网格。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RepeatIntoGridImage:
    """
    Tiles the input samples into a grid of configurable dimensions.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image": ("IMAGE",),
                             "columns": grid_len_INPUT,
                             "rows": grid_len_INPUT,
                             }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "repeat_into_grid"
    CATEGORY = "Bmad/image"

    def repeat_into_grid(self, image, columns, rows):
        samples = image.movedim(-1, 1)
        samples = samples.repeat(1, 1, rows, columns)
        samples = samples.movedim(1, -1)
        return (samples,)

```
