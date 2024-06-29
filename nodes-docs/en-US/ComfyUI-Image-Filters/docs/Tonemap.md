---
tags:
- ImageEnhancement
---

# Tonemap
## Documentation
- Class name: `Tonemap`
- Category: `image/filters`
- Output node: `False`

The Tonemap node is designed to adjust the tonal range of images to make them suitable for display on different devices or for achieving specific visual effects. It supports conversion between linear and sRGB color spaces and allows for scaling of the tonemap effect.
## Input types
### Required
- **`images`**
    - The input images to be tonemapped. This is the primary data the node operates on, affecting the visual outcome based on the tonemap process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`input_mode`**
    - Specifies the color space of the input images, either linear or sRGB, determining the initial conversion step before tonemapping.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`output_mode`**
    - Defines the color space for the output images, choosing between linear and sRGB, to ensure the images are in the desired format after tonemapping.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`tonemap_scale`**
    - A scale factor that adjusts the intensity of the tonemap effect, allowing for finer control over the visual appearance of the output images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output images after applying the tonemap process, adjusted for tonal range and color space as specified by the input parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Tonemap:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "input_mode": (["linear", "sRGB"],),
                "output_mode": (["sRGB", "linear"],),
                "tonemap_scale": ("FLOAT", {"default": 1, "min": 0.1, "max": 10, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"

    CATEGORY = "image/filters"

    def apply(self, images, input_mode, output_mode, tonemap_scale):
        t = images.detach().clone().cpu().numpy().astype(np.float32)
        
        if input_mode == "sRGB":
            sRGBtoLinear(t[:,:,:,:3])
        
        linearToTonemap(t[:,:,:,:3], tonemap_scale)
        
        if output_mode == "sRGB":
            linearToSRGB(t[:,:,:,:3])
            t = np.clip(t, 0, 1)
        
        t = torch.from_numpy(t)
        return (t,)

```
