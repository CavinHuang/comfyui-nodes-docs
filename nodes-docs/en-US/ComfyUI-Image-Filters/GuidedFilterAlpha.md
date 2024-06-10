---
tags:
- AlphaChannel
- Image
---

# Guided Filter Alpha
## Documentation
- Class name: `GuidedFilterAlpha`
- Category: `image/filters`
- Output node: `False`

The GuidedFilterAlpha node applies a guided filter to images using a specified alpha channel and filter parameters. This process enhances the image by smoothing while preserving edges, guided by the alpha channel to control the blending and detail levels.
## Input types
### Required
- **`images`**
    - The input images to be filtered, where the alpha channel guides the filtering process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`alpha`**
    - The alpha channel used to guide the filtering process, influencing how the image details are blended and preserved.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`filter_radius`**
    - Specifies the radius of the filter, affecting the extent of smoothing and edge preservation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma`**
    - Controls the degree of smoothing, with higher values resulting in more blur.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The filtered images, where the guided filter has been applied according to the alpha channel and filter parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GuidedFilterAlpha:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "alpha": ("IMAGE",),
                "filter_radius": ("INT", {
                    "default": 8,
                    "min": 1,
                    "max": 64,
                    "step": 1
                }),
                "sigma": ("FLOAT", {
                    "default": 0.1,
                    "min": 0.01,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "guided_filter_alpha"

    CATEGORY = "image/filters"

    def guided_filter_alpha(self, images: torch.Tensor, alpha: torch.Tensor, filter_radius: int, sigma: float):
        
        d = filter_radius * 2 + 1
        s = sigma / 10
        
        i_dup = copy.deepcopy(images.cpu().numpy())
        a_dup = copy.deepcopy(alpha.cpu().numpy())
        
        for index, image in enumerate(i_dup):
            alpha_work = a_dup[index]
            i_dup[index] = guidedFilter(image, alpha_work, d, s)
        
        return (torch.from_numpy(i_dup),)

```
