---
tags:
- Crop
- Image
- ImageTransformation
---

# Crop Latent
## Documentation
- Class name: `LatentCrop`
- Category: `latent/transform`
- Output node: `False`

The LatentCrop node is designed to perform cropping operations on latent representations of images. It allows for the specification of the crop dimensions and position, enabling targeted modifications of the latent space.
## Input types
### Required
- **`samples`**
    - The 'samples' parameter represents the latent representations to be cropped. It is crucial for defining the data on which the cropping operation will be performed.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`width`**
    - Specifies the width of the crop area. It directly influences the dimensions of the output latent representation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the crop area, affecting the size of the resulting cropped latent representation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`x`**
    - Determines the starting x-coordinate of the crop area, influencing the position of the crop within the original latent representation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - Determines the starting y-coordinate of the crop area, setting the position of the crop within the original latent representation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a modified latent representation with the specified crop applied.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LatentCrop:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",),
                              "width": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                              "x": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                              "y": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                              }}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "crop"

    CATEGORY = "latent/transform"

    def crop(self, samples, width, height, x, y):
        s = samples.copy()
        samples = samples['samples']
        x =  x // 8
        y = y // 8

        #enfonce minimum size of 64
        if x > (samples.shape[3] - 8):
            x = samples.shape[3] - 8
        if y > (samples.shape[2] - 8):
            y = samples.shape[2] - 8

        new_height = height // 8
        new_width = width // 8
        to_x = new_width + x
        to_y = new_height + y
        s['samples'] = samples[:,:,y:to_y, x:to_x]
        return (s,)

```
