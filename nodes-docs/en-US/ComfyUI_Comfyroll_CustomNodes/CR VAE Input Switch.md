---
tags:
- VAE
---

# 🔀 CR VAE Input Switch
## Documentation
- Class name: `CR VAE Input Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

This node allows for dynamic selection between two VAE inputs based on a specified condition, facilitating flexible workflow configurations and enabling users to switch between different VAE models or settings.
## Input types
### Required
- **`Input`**
    - Determines which VAE input to select, enabling conditional logic within the workflow.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`VAE1`**
    - The first VAE input option. This input is optional and allows for the selection of a VAE model when the condition is met.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
- **`VAE2`**
    - The second VAE input option. This input is optional and provides an alternative VAE model selection based on the specified condition.
    - Comfy dtype: `VAE`
    - Python dtype: `VAE`
## Output types
- **`VAE`**
    - Comfy dtype: `VAE`
    - The selected VAE input based on the specified condition.
    - Python dtype: `VAE`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing documentation and help for using the CR VAE Input Switch node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)



## Source code
```python
class CR_VAEInputSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),            
            },
            "optional": {
                "VAE1": ("VAE", {"forceInput": True}),
                "VAE2": ("VAE", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("VAE", "STRING", )   
    RETURN_NAMES = ("VAE", "show_help", ) 
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, VAE1=None, VAE2=None,):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-vae-input-switch"
        if Input == 1:
            return (VAE1, show_help, )
        else:
            return (VAE2, show_help, )

```
