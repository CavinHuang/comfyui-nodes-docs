---
tags:
- Color
---

# CLAHE
## Documentation
- Class name: `CLAHE`
- Category: `Bmad/CV/Thresholding`
- Output node: `False`

The CLAHE node applies the Contrast Limited Adaptive Histogram Equalization algorithm to enhance the contrast of images. It adjusts image intensities to enhance the contrast locally, taking into account specific parameters like clip limit and tile grid size for finer control over the process.
## Input types
### Required
- **`src`**
    - The source image to be processed. It serves as the input on which the CLAHE algorithm is applied to enhance local contrast.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`clip_limit`**
    - Defines the threshold for contrast limiting. This parameter helps in controlling the enhancement of contrast, preventing it from amplifying noise in relatively homogeneous regions of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_grid_x`**
    - Specifies the number of tiles in the horizontal direction for dividing the image. It determines the granularity of the contrast enhancement process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_grid_y`**
    - Specifies the number of tiles in the vertical direction for dividing the image. Similar to tile_grid_x, it affects the granularity of the contrast enhancement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying CLAHE. It is the enhanced version of the input image with improved local contrast.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CLAHE:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",),
                "clip_limit": ("INT", {"default": 2, "step": 1}),
                # 40 is the default in documentation, but prob. a bit high no?
                "tile_grid_x": ("INT", {"default": 8, "min": 2, "step": 1}),
                "tile_grid_y": ("INT", {"default": 8, "min": 2, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "eq"
    CATEGORY = "Bmad/CV/Thresholding"

    def eq(self, src, clip_limit, tile_grid_x, tile_grid_y):
        src = tensor2opencv(src, 1)
        clahe = cv.createCLAHE(clipLimit=clip_limit, tileGridSize=(tile_grid_x, tile_grid_y))
        eq = clahe.apply(src)
        eq = cv.cvtColor(eq, cv.COLOR_GRAY2RGB)
        eq = opencv2tensor(eq)
        return (eq,)

```
