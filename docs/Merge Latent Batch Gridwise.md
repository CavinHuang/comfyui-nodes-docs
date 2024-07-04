
# Documentation
- Class name: Merge Latent Batch Gridwise
- Category: Bmad/latent
- Output node: False

该节点旨在将一批潜在表示合并成单一的网格布局，以实现多个潜在样本的高效组织和可视化。它利用掩码来确定网格尺寸和每个样本在网格中的位置，从而有效地创建一个组合潜在表示。

# Input types
## Required
- batch
    - 要合并到网格中的潜在表示批次。通过提供要排列的各个样本，它在确定最终合并输出中起着至关重要的作用。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- mask
    - 用于获取网格布局尺寸的图像掩码。虽然不直接用于合并过程，但对于确定网格的维度至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- rows
    - 网格布局中的行数。它定义了潜在样本如何在网格中垂直排列。
    - Comfy dtype: INT
    - Python dtype: int
- columns
    - 网格布局中的列数。它定义了潜在样本如何在网格中水平排列。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - 以网格布局合并的潜在表示，将多个单独的样本组合成单一的复合表示。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MergeLatentsBatchGridwise:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "batch": ("LATENT",),
            "mask": ("IMAGE",),  # only to fetch the sizes, not really needed.
            "rows": ("INT", {"default": 1, "min": 1, "max": 16}),
            "columns": ("INT", {"default": 1, "min": 1, "max": 16})
        }}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "merge"
    CATEGORY = "Bmad/latent"

    def merge(self, batch, mask, rows, columns):
        _, mask_height, mask_width, _ = mask.size()
        mask_height //= 8
        mask_width //= 8
        _, cs, hs, ws = batch["samples"].size()
        print(f'{batch["samples"].size()}')
        merged = torch.empty(size=(1, cs, hs, ws), dtype=batch["samples"].dtype, device=batch["samples"].device)
        for r in range(rows):
            for c in range(columns):
                x2 = x1 = mask_width * c
                x2 += mask_width
                y2 = y1 = mask_height * r
                y2 += mask_height
                merged[0, :, y1:y2, x1:x2] = batch["samples"][c + r * columns, :, y1:y2, x1:x2]

        return ({"samples": merged},)

```
