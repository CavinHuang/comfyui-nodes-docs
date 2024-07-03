
# Documentation
- Class name: FlatLatentsIntoSingleGrid
- Category: Bmad/latent
- Output node: False

FlatLatentsIntoSingleGrid节点旨在将一批潜在表示转换为单一的平面网格布局。这种操作对于集体可视化和处理多个潜在样本非常有用，因为它将它们在空间上重新排列成一个统一的结构。

# Input types
## Required
- latents
    - 'latents'输入代表一批将被排列成网格的潜在样本。这个输入对于确定结果网格的结构和大小至关重要，影响潜在样本在空间上的组织方式。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- latent
    - 输出是以网格形式呈现的单一潜在表示，包含重新排列后的输入潜在批次。这种整合形式有利于对整个批次进行进一步的操作或可视化。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FlatLatentsIntoSingleGrid:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"latents": ("LATENT",), }}

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "flat_into_grid"
    CATEGORY = "Bmad/latent"

    def flat_into_grid(self, latents):
        n, lc, lh, lw = latents['samples'].size()
        length_in_tiles = math.ceil(math.sqrt(n))
        new_latent = torch.zeros((1, lc, lh * math.ceil(n / length_in_tiles), lw * length_in_tiles),
                                 dtype=latents["samples"].dtype, device=latents["samples"].device)
        r = c = 0  # row and column indexes
        for i in range(n):
            x1 = x2 = lw * c
            x2 += lw
            y1 = y2 = lh * r
            y2 += lh
            new_latent[0, :, y1:y2, x1:x2] = latents["samples"][i, :, :, :]
            c += 1
            if c >= length_in_tiles:
                c = 0
                r += 1

        return ({"samples": new_latent},)

```
