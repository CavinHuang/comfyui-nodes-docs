---
tags:
- ConditionalSelection
---

# 🔂 CR Img2Img Process Switch
## Documentation
- Class name: `CR Img2Img Process Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔂 Process`
- Output node: `False`

The CR Img2Img Process Switch node is designed to dynamically select between two different processing paths based on the input mode, specifically targeting image-to-image transformations. It facilitates the flexible integration of distinct processing pipelines within a single workflow, enhancing the adaptability of image manipulation tasks.
## Input types
### Required
- **`Input`**
    - Determines the processing path to be taken, choosing between 'txt2img' and 'img2img' modes. This selection influences the subsequent processing steps and their outcomes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Union[str, Tuple[str]]`
### Optional
- **`txt2img`**
    - Specifies the latent representation to be used when the 'txt2img' mode is selected, enabling text-to-image conversion processes.
    - Comfy dtype: `LATENT`
    - Python dtype: `LATENT`
- **`img2img`**
    - Specifies the latent representation to be used when the 'img2img' mode is selected, enabling image-to-image conversion processes.
    - Comfy dtype: `LATENT`
    - Python dtype: `LATENT`
## Output types
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The latent representation resulting from the selected processing path, either from text-to-image or image-to-image conversion.
    - Python dtype: `LATENT`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the help documentation for this node, offering additional information and guidance.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_Img2ImgProcessSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": (["txt2img", "img2img"],),
            },
            "optional": {
                "txt2img": ("LATENT",),
                "img2img": ("LATENT",),
            }
        }

    RETURN_TYPES = ("LATENT", "STRING", )
    RETURN_NAMES = ("LATENT", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Process")

    def switch(self, Input, txt2img=None, img2img=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Process-Nodes#cr-img2img-process-switch"
        if Input == "txt2img":
            return (txt2img, show_help, )
        else:
            return (img2img, show_help, )            

```
