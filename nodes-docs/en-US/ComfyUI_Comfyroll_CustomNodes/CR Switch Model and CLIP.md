---
tags:
- ConditionalSelection
---

# 🔀 CR Switch Model and CLIP
## Documentation
- Class name: `CR Switch Model and CLIP`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

This node is designed to switch between two sets of models and CLIPs based on a given input. It facilitates dynamic selection within a workflow, allowing users to choose between alternative processing paths or resources.
## Input types
### Required
- **`Input`**
    - Determines which set of model and CLIP to use, enabling the selection between two predefined options.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`model1`**
    - The first model option that can be selected.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
- **`clip1`**
    - The first CLIP option that can be selected alongside the first model.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`model2`**
    - The second model option that can be selected.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
- **`clip2`**
    - The second CLIP option that can be selected alongside the second model.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The selected model based on the input choice.
    - Python dtype: `MODEL`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The selected CLIP based on the input choice.
    - Python dtype: `CLIP`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a link to further documentation or help related to this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - workflow/Input
    - workflow/Rescaled K Sampler



## Source code
```python
class CR_ModelAndCLIPInputSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),
                "model1": ("MODEL",),
                "clip1": ("CLIP",),                
                "model2": ("MODEL",),               
                "clip2": ("CLIP",)
            }
        }

    RETURN_TYPES = ("MODEL", "CLIP", "STRING", )
    RETURN_NAMES = ("MODEL", "CLIP", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, clip1, clip2, model1, model2):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-switch-model-and-clip"
        if Input == 1:
            return (model1, clip1, show_help, )
        else:
            return (model2, clip2, show_help, )

```
