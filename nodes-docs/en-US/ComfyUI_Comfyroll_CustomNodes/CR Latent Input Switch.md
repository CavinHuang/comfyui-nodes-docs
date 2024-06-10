---
tags:
- ConditionalSelection
---

# 🔀 CR Latent Input Switch
## Documentation
- Class name: `CR Latent Input Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

The CR_LatentInputSwitch node is designed to switch between two latent inputs based on a specified condition. It facilitates dynamic workflow paths in generative models by allowing the selection of different latent representations.
## Input types
### Required
- **`Input`**
    - Determines which latent input to select. A value of 1 selects the first latent input, while a value of 2 selects the second.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`latent1`**
    - The first latent input option. This input is selected if the 'Input' parameter is set to 1.
    - Comfy dtype: `LATENT`
    - Python dtype: `LATENT`
- **`latent2`**
    - The second latent input option. This input is selected if the 'Input' parameter is set to 2.
    - Comfy dtype: `LATENT`
    - Python dtype: `LATENT`
## Output types
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The selected latent input based on the 'Input' parameter.
    - Python dtype: `LATENT`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on using the CR_LatentInputSwitch node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_LatentInputSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),
            },
            "optional": {
                "latent1": ("LATENT",),
                "latent2": ("LATENT",)          
            }
        }

    RETURN_TYPES = ("LATENT", "STRING", )
    RETURN_NAMES = ("LATENT", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, latent1=None, latent2=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-latent-input-switch"
        if Input == 1:
            return (latent1, show_help, )
        else:
            return (latent2, show_help, )

```
