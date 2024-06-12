---
tags:
- ImageEnhancement
- ImageTransformation
- VisualEffects
---

# Exposure Adjust
## Documentation
- Class name: `ExposureAdjust`
- Category: `image/filters`
- Output node: `False`

The ExposureAdjust node is designed to modify the exposure of images by adjusting their brightness levels. It supports different input and output color modes, and optionally applies tonemapping to adjust the dynamic range of the images.
## Input types
### Required
- **`images`**
    - The input images to be adjusted for exposure. This parameter is crucial for defining the visual content that will undergo exposure correction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`stops`**
    - Determines the exposure adjustment level. Positive values increase exposure (making the image brighter), while negative values decrease it (making the image darker).
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`input_mode`**
    - Specifies the color space of the input images, either 'sRGB' or 'linear', affecting how exposure adjustments are applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`output_mode`**
    - Defines the color space for the output images, allowing for flexibility in integrating the adjusted images into various workflows.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_tonemap`**
    - A boolean flag that indicates whether tonemapping should be applied to the images, useful for handling high dynamic range content.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`tonemap_scale`**
    - Adjusts the scale of the tonemapping effect, providing control over the dynamic range compression of the images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output images with adjusted exposure, potentially in a different color space and with optional tonemapping applied.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ExposureAdjust:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "stops": ("FLOAT", {"default": 0.0, "min": -100, "max": 100, "step": 0.01}),
                "input_mode": (["sRGB", "linear"],),
                "output_mode": (["sRGB", "linear"],),
                "use_tonemap": ("BOOLEAN", {"default": False}),
                "tonemap_scale": ("FLOAT", {"default": 1, "min": 0.1, "max": 10, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"

    CATEGORY = "image/filters"

    def apply(self, images, stops, input_mode, output_mode, use_tonemap, tonemap_scale):
        t = images.detach().clone().cpu().numpy().astype(np.float32)
        
        if input_mode == "sRGB":
            sRGBtoLinear(t[:,:,:,:3])
        
        if use_tonemap:
            tonemapToLinear(t[:,:,:,:3], tonemap_scale)
        
        exposure(t[:,:,:,:3], stops)
        
        if use_tonemap:
            linearToTonemap(t[:,:,:,:3], tonemap_scale)
        
        if output_mode == "sRGB":
            linearToSRGB(t[:,:,:,:3])
            t = np.clip(t, 0, 1)
        
        t = torch.from_numpy(t)
        return (t,)

```
