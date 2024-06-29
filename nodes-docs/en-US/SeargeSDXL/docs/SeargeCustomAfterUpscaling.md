---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# After Upscaling
## Documentation
- Class name: `SeargeCustomAfterUpscaling`
- Category: `Searge/Magic/Custom Stages`
- Output node: `False`

This node is designed to process the output of an upscaling stage, specifically handling the transformation of upscaled images into a final image format. It encapsulates the functionality to decode and retrieve the final upscaled image from a given set of custom outputs.
## Input types
### Required
- **`custom_output`**
    - Represents the output from a previous upscaling stage, serving as the essential input for generating the final image. It is crucial for the node's operation as it contains the data needed to extract and construct the final image.
    - Comfy dtype: `SRG_STAGE_OUTPUT`
    - Python dtype: `dict`
### Optional
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final image produced after processing the upscaled output. It signifies the completion of the upscaling process, ready for further use or display.
    - Python dtype: `PIL.Image.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeCustomAfterUpscaling:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "custom_output": ("SRG_STAGE_OUTPUT",),
            },
            "optional": {
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "output"

    CATEGORY = UI.CATEGORY_MAGIC_CUSTOM_STAGES

    def output(self, custom_output):
        if custom_output is None:
            return (None,)

        vae_decoded = retrieve_parameter(Names.S_UPSCALED, custom_output)
        image = retrieve_parameter(Names.F_UPSCALED_IMAGE, vae_decoded)

        return (image,)

```
