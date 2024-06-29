---
tags:
- ConditionalSelection
---

# 🔂 CR Hires Fix Process Switch
## Documentation
- Class name: `CR Hires Fix Process Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔂 Process`
- Output node: `False`

The CR_HiResFixProcessSwitch node is designed to selectively process high-resolution images or upscale latent representations based on the input provided. It facilitates the choice between two distinct processing paths, either focusing on image upscaling or latent space manipulation, thereby enabling a flexible approach to enhancing image quality or detail.
## Input types
### Required
- **`Input`**
    - Determines the processing path to be taken by the node, choosing between latent upscaling and image upscaling based on the input value.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`latent_upscale`**
    - The latent representation to be upscaled if the 'Input' is set to 'latent_upscale'. This input directly influences the node's execution by determining the manipulation of the latent space, thereby affecting the detail and quality of the generated output.
    - Comfy dtype: `LATENT`
    - Python dtype: `tuple`
- **`image_upscale`**
    - The high-resolution image to be processed if the 'Input' is set to 'image_upscale'. This input determines the node's focus on enhancing the image's resolution or detail, directly impacting the visual quality of the output.
    - Comfy dtype: `LATENT`
    - Python dtype: `tuple`
## Output types
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The output of the node, which can be either the upscaled latent representation or the processed high-resolution image, based on the input path chosen.
    - Python dtype: `tuple`
- **`STRING`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the CR_HiResFixProcessSwitch node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_HiResFixProcessSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": (["latent_upscale", "image_upscale"],),
            },
            "optional": {
                "latent_upscale": ("LATENT",),
                "image_upscale": ("LATENT",),
            }
        }

    RETURN_TYPES = ("LATENT", "STRING", )
    RETURN_NAMES = ("LATENT", "STRING", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Process")

    def switch(self, Input, latent_upscale=None, image_upscale=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Process-Nodes#cr-hires-fix-process-switch"
        if Input == "latent_upscale":
            return (latent_upscale, show_help, )
        else:
            return (image_upscale, show_help, )  

```
