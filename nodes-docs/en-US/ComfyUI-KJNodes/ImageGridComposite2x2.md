---
tags:
- GridLayout
- Image
- Tiled
---

# ImageGridComposite2x2
## Documentation
- Class name: `ImageGridComposite2x2`
- Category: `KJNodes/image`
- Output node: `False`

This node is designed to concatenate four input images into a 2x2 grid, effectively creating a composite image that combines these inputs in a visually structured manner.
## Input types
### Required
- **`image1`**
    - The first image to be placed in the top-left corner of the 2x2 grid.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image2`**
    - The second image to be placed in the top-right corner of the 2x2 grid.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image3`**
    - The third image to be placed in the bottom-left corner of the 2x2 grid.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image4`**
    - The fourth image to be placed in the bottom-right corner of the 2x2 grid.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The composite image resulting from concatenating the four input images into a 2x2 grid.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageGridComposite2x2:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image1": ("IMAGE",),
            "image2": ("IMAGE",),
            "image3": ("IMAGE",),
            "image4": ("IMAGE",),   
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "compositegrid"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Concatenates the 4 input images into a 2x2 grid. 
"""

    def compositegrid(self, image1, image2, image3, image4):
        top_row = torch.cat((image1, image2), dim=2)
        bottom_row = torch.cat((image3, image4), dim=2)
        grid = torch.cat((top_row, bottom_row), dim=1)
        return (grid,)

```
