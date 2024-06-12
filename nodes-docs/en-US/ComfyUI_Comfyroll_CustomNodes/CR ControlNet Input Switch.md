---
tags:
- ControlNet
---

# 🔀 CR ControlNet Input Switch
## Documentation
- Class name: `CR ControlNet Input Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

This node serves as a dynamic switch between two control networks based on a specified input. It allows for the selection of one of two control networks to be used in a workflow, enhancing flexibility and control in the processing pipeline.
## Input types
### Required
- **`Input`**
    - Determines which control network to select for use in the workflow. The choice affects the control flow and the resulting control network output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`control_net1`**
    - The first control network option that can be selected based on the input. Provides a pathway for control flow based on the selection.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `CONTROL_NET`
- **`control_net2`**
    - The second control network option that can be selected. Offers an alternative pathway for control flow, enhancing the node's flexibility.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `CONTROL_NET`
### Optional
- **`control_net1`**
    - The first control network option that can be selected based on the input. Provides a pathway for control flow based on the selection.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `CONTROL_NET`
- **`control_net2`**
    - The second control network option that can be selected. Offers an alternative pathway for control flow, enhancing the node's flexibility.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `CONTROL_NET`
## Output types
- **`CONTROL_NET`**
    - Comfy dtype: `CONTROL_NET`
    - The control network selected based on the input. This output is used for further processing in the workflow.
    - Python dtype: `CONTROL_NET`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing documentation and help for using the CR_ControlNetInputSwitch node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ControlNetInputSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),
                "control_net1": ("CONTROL_NET",),
                "control_net2": ("CONTROL_NET",)
            },
            "optional": {
                "control_net1": ("CONTROL_NET",),
                "control_net2": ("CONTROL_NET",),   
            }
        }
        
    RETURN_TYPES = ("CONTROL_NET", "STRING", )
    RETURN_NAMES = ("CONTROL_NET", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, control_net1=None, control_net2=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-controlnet-input-switch"
        if Input == 1:
            return (control_net1, show_help, )
        else:
            return (control_net2, show_help, )

```
