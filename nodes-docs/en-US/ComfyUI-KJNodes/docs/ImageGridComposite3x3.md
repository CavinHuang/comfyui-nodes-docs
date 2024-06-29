---
tags:
- GridLayout
- Image
- Tiled
---

# ImageGridComposite3x3
## Documentation
- Class name: `ImageGridComposite3x3`
- Category: `KJNodes/image`
- Output node: `False`

This node is designed to concatenate nine input images into a single 3x3 grid, effectively creating a composite image that showcases all inputs in a structured layout.
## Input types
### Required
- **`image1`**
    - The first image to be placed in the top-left corner of the 3x3 grid.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image2`**
    - The second image to be placed in the top row of the 3x3 grid, next to the first image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image3`**
    - The third image to be placed in the top row of the 3x3 grid, next to the second image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image4`**
    - The fourth image to be placed in the middle row of the 3x3 grid, starting from the left.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image5`**
    - The central image in the 3x3 grid, surrounded by the other eight images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image6`**
    - The sixth image to be placed in the middle row of the 3x3 grid, next to the fifth image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image7`**
    - The seventh image to be placed in the bottom row of the 3x3 grid, starting from the left.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image8`**
    - The eighth image to be placed in the bottom row of the 3x3 grid, next to the seventh image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image9`**
    - The ninth and final image to be placed in the bottom right corner of the 3x3 grid, completing the composite.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The composite image formed by concatenating the nine input images into a 3x3 grid.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageGridComposite3x3:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image1": ("IMAGE",),
            "image2": ("IMAGE",),
            "image3": ("IMAGE",),
            "image4": ("IMAGE",),
            "image5": ("IMAGE",),
            "image6": ("IMAGE",),
            "image7": ("IMAGE",),
            "image8": ("IMAGE",),
            "image9": ("IMAGE",),     
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "compositegrid"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Concatenates the 9 input images into a 3x3 grid. 
"""

    def compositegrid(self, image1, image2, image3, image4, image5, image6, image7, image8, image9):
        top_row = torch.cat((image1, image2, image3), dim=2)
        mid_row = torch.cat((image4, image5, image6), dim=2)
        bottom_row = torch.cat((image7, image8, image9), dim=2)
        grid = torch.cat((top_row, mid_row, bottom_row), dim=1)
        return (grid,)

```
