---
tags:
- ConditionalSelection
---

# 🔀 CR Model Input Switch
## Documentation
- Class name: `CR Model Input Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

This node allows for dynamic selection between two model inputs based on a specified integer input. It facilitates conditional model selection within a workflow, providing a link to further help and guidance.
## Input types
### Required
- **`Input`**
    - Determines which model input to select for the workflow based on its value. It plays a crucial role in conditional logic, affecting the node's execution path.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`model1`**
    - The first model option that can be selected as input. It's one of the conditional choices available for the workflow.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
- **`model2`**
    - The second model option that can be selected as input. It offers an alternative choice for the workflow's conditional logic.
    - Comfy dtype: `MODEL`
    - Python dtype: `MODEL`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The selected model input based on the 'Input' parameter. It's the outcome of the node's conditional logic.
    - Python dtype: `MODEL`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a link to further documentation and help for using this node effectively.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Reroute



## Source code
```python
class CR_ModelInputSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),
            },
            "optional": {
                "model1": ("MODEL",),
                "model2": ("MODEL",),   
            }
        }

    RETURN_TYPES = ("MODEL", "STRING", )
    RETURN_NAMES = ("MODEL", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, model1=None, model2=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-model-input-switch"
        if Input == 1:
            return (model1, show_help, )
        else:
            return (model2, show_help, )

```
