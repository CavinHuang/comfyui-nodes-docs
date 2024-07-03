
# Documentation
- Class name: Repeat Into Grid (latent)
- Category: Bmad/latent
- Output node: False

该节点将输入的潜在样本平铺到一个可配置尺寸的网格中,通过在指定数量的行和列上重复样本,有效地创建一个更大的网格状结构。

# Input types
## Required
- samples
    - 需要被平铺到网格中的潜在样本。这个输入对于决定最终网格的模式和内容至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- columns
    - 指定网格中的列数。这会影响样本在水平方向上的重复次数。
    - Comfy dtype: INT
    - Python dtype: int
- rows
    - 指定网格中的行数。这会影响样本在垂直方向上的重复次数。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - 按照指定的行数和列数重复排列的潜在样本网格。
    - Comfy dtype: LATENT
    - Python dtype: Tuple[Dict[str, torch.Tensor]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RepeatIntoGridLatent:
    """
    Tiles the input samples into a grid of configurable dimensions.
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"samples": ("LATENT",),
                             "columns": grid_len_INPUT,
                             "rows": grid_len_INPUT,
                             }}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "repeat_into_grid"
    CATEGORY = "Bmad/latent"

    def repeat_into_grid(self, samples, columns, rows):
        s = samples.copy()
        samples = samples['samples']
        tiled_samples = samples.repeat(1, 1, rows, columns)
        s['samples'] = tiled_samples
        return (s,)

```
