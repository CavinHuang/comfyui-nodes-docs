---
tags:
- ImageEnhancement
- VisualEffects
---

# VividSharpen
## Documentation
- Class name: `VividSharpen`
- Category: `image/postprocessing`
- Output node: `False`

The VividSharpen node enhances the sharpness and clarity of images by applying a vivid sharpening effect. It utilizes a combination of Gaussian blur inversion and blending techniques to accentuate details and edges, making the image appear more vivid and defined.
## Input types
### Required
- **`images`**
    - Specifies the images to be sharpened. This is the primary input for the sharpening process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`radius`**
    - Determines the radius of the Gaussian blur used in the sharpening process. A larger radius results in a more pronounced sharpening effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength`**
    - Controls the intensity of the sharpening effect. A higher strength value leads to a more vivid and pronounced sharpening.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The sharpened images, enhanced with vivid sharpness and clarity.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class VividSharpen:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "radius": ("FLOAT", {"default": 1.5, "min": 0.01, "max": 64.0, "step": 0.01}),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    FUNCTION = "sharpen"

    CATEGORY = "image/postprocessing"

    def sharpen(self, images, radius, strength):
    
        results = []
        if images.size(0) > 1:
            for image in images:
                image = tensor2pil(image)
                results.append(pil2tensor(vivid_sharpen(image, radius=radius, strength=strength)))
            results = torch.cat(results, dim=0)
        else:
            results = pil2tensor(vivid_sharpen(tensor2pil(images), radius=radius, strength=strength))
            
        return (results,)

```
