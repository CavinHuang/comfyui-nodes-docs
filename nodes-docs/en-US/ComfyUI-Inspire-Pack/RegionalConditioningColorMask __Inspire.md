---
tags:
- RegionalPrompt
---

# Regional Conditioning By Color Mask (Inspire)
## Documentation
- Class name: `RegionalConditioningColorMask __Inspire`
- Category: `InspirePack/Regional`
- Output node: `False`

The RegionalConditioningColorMask node in the Inspire Pack focuses on applying regional conditioning to an input CLIP representation based on a specified color mask. It allows for the targeted manipulation of image features by overlaying a color mask, adjusting its strength, and specifying the area of conditioning, thereby enabling more precise control over the generation process.
## Input types
### Required
- **`clip`**
    - The CLIP representation to which the regional conditioning is applied, serving as the basis for the targeted manipulation.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`color_mask`**
    - An image mask that specifies the region to be conditioned, based on the provided color.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`mask_color`**
    - The color value used to generate the mask from the color_mask image, defining the specific region for conditioning.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`strength`**
    - Determines the intensity of the conditioning applied to the specified region, allowing for fine-tuning of the effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`set_cond_area`**
    - Specifies the area of the image to be conditioned, either the default area or the bounds of the mask, providing flexibility in targeting.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`prompt`**
    - The text prompt that guides the conditioning process, influencing the characteristics of the generated content within the masked region.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The conditioned CLIP representation, modified according to the specified parameters and mask.
    - Python dtype: `tuple`
- **`mask`**
    - Comfy dtype: `MASK`
    - The generated mask based on the specified color, used for conditioning.
    - Python dtype: `Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RegionalConditioningColorMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "clip": ("CLIP", ),
                "color_mask": ("IMAGE",),
                "mask_color": ("STRING", {"multiline": False, "default": "#FFFFFF"}),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "set_cond_area": (["default", "mask bounds"],),
                "prompt": ("STRING", {"multiline": True, "placeholder": "prompt"}),
            },
        }

    RETURN_TYPES = ("CONDITIONING", "MASK")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, clip, color_mask, mask_color, strength, set_cond_area, prompt):
        mask = color_to_mask(color_mask, mask_color)

        conditioning = nodes.CLIPTextEncode().encode(clip, prompt)[0]
        conditioning = nodes.ConditioningSetMask().append(conditioning, mask, set_cond_area, strength)[0]
        return (conditioning, mask)

```
