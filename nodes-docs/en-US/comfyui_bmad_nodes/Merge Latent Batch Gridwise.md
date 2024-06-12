---
tags:
- GridLayout
- Image
- Tiled
---

# Merge Latent Batch Gridwise
## Documentation
- Class name: `Merge Latent Batch Gridwise`
- Category: `Bmad/latent`
- Output node: `False`

This node is designed to merge a batch of latent representations into a single grid layout, allowing for the efficient organization and visualization of multiple latent samples. It utilizes a mask to determine the grid dimensions and placement of each sample within the grid, effectively creating a composite latent representation.
## Input types
### Required
- **`batch`**
    - The batch of latent representations to be merged into a grid. It plays a crucial role in determining the final merged output by providing the individual samples to be arranged.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`mask`**
    - An image mask used to fetch the sizes for the grid layout. Although not directly used in the merging process, it is essential for determining the dimensions of the grid.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`rows`**
    - The number of rows in the grid layout. It defines how the latent samples are vertically arranged within the grid.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`columns`**
    - The number of columns in the grid layout. It defines how the latent samples are horizontally arranged within the grid.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The merged latent representation in a grid layout, combining multiple individual samples into a single composite representation.
    - Python dtype: `Dict[str, torch.Tensor]`
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
