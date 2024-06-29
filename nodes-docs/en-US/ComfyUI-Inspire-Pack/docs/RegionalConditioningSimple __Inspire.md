---
tags:
- RegionalPrompt
---

# Regional Conditioning Simple (Inspire)
## Documentation
- Class name: `RegionalConditioningSimple __Inspire`
- Category: `InspirePack/Regional`
- Output node: `False`

This node specializes in applying regional conditioning to a given input, utilizing a combination of text prompts and masks to influence the generation process in specific areas. It integrates text encoding and mask application to create conditioned inputs tailored to regional specifications.
## Input types
### Required
- **`clip`**
    - Represents the CLIP model used for encoding the text prompt into a format suitable for conditioning.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`mask`**
    - A mask that defines the area within the input where the conditioning should be applied.
    - Comfy dtype: `MASK`
    - Python dtype: `numpy.ndarray`
- **`strength`**
    - Determines the intensity of the conditioning effect within the specified region.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`set_cond_area`**
    - Specifies the method for setting the conditioning area, either to the default or based on mask bounds.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`prompt`**
    - The text prompt used for generating the conditioning. This is encoded using the CLIP model.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a conditioned input, ready for further processing or generation tasks, tailored to the specified regional conditions.
    - Python dtype: `object`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalConditioningSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "clip": ("CLIP", ),
                "mask": ("MASK",),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "set_cond_area": (["default", "mask bounds"],),
                "prompt": ("STRING", {"multiline": True, "placeholder": "prompt"}),
            },
        }

    RETURN_TYPES = ("CONDITIONING", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, clip, mask, strength, set_cond_area, prompt):
        conditioning = nodes.CLIPTextEncode().encode(clip, prompt)[0]
        conditioning = nodes.ConditioningSetMask().append(conditioning, mask, set_cond_area, strength)[0]
        return (conditioning, )

```
