---
tags:
- ImageTransformation
---

# Remap Range
## Documentation
- Class name: `RemapRange`
- Category: `image/filters`
- Output node: `False`

The RemapRange node is designed to adjust the intensity range of an image by remapping its black and white points. This process can enhance the visual contrast or adjust the overall brightness and darkness levels of the image.
## Input types
### Required
- **`image`**
    - The input image to be processed. This image will have its intensity levels adjusted based on the specified black and white points.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`blackpoint`**
    - The lower bound of the intensity range to remap to black. Values below this point will be adjusted to black, affecting the image's contrast and brightness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`whitepoint`**
    - The upper bound of the intensity range to remap to white. Values above this point will be adjusted to white, influencing the image's contrast and brightness levels.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after the intensity levels have been remapped according to the specified black and white points.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RemapRange:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "blackpoint": ("FLOAT", {
                    "default": 0.0,
                    "min": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "whitepoint": ("FLOAT", {
                    "default": 1.0,
                    "min": 0.01,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "remap"

    CATEGORY = "image/filters"

    def remap(self, image: torch.Tensor, blackpoint: float, whitepoint: float):
        
        bp = min(blackpoint, whitepoint - 0.001)
        scale = 1 / (whitepoint - bp)
        
        i_dup = copy.deepcopy(image.cpu().numpy())
        i_dup = np.clip((i_dup - bp) * scale, 0.0, 1.0)
        
        return (torch.from_numpy(i_dup),)

```
