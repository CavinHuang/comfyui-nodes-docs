---
tags:
- ControlNet
- ControlNetLoader
---

# Load ControlNet Model
## Documentation
- Class name: `ControlNetLoader`
- Category: `loaders`
- Output node: `False`

The ControlNetLoader node is designed to load a ControlNet model from a specified path. It plays a crucial role in initializing ControlNet models, which are essential for applying control mechanisms over generated content or modifying existing content based on control signals.
## Input types
### Required
- **`control_net_name`**
    - Specifies the name of the ControlNet model to be loaded. This name is used to locate the model file within a predefined directory structure.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - Returns the loaded ControlNet model, ready for use in controlling or modifying content generation processes.
    - Python dtype: `comfy.controlnet.ControlNet`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - Reroute
    - [ImpactControlNetApplySEGS](../../ComfyUI-Impact-Pack/Nodes/ImpactControlNetApplySEGS.md)



## Source code
```python
class ControlNetLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "control_net_name": (folder_paths.get_filename_list("controlnet"), )}}

    RETURN_TYPES = ("CONTROL_NET",)
    FUNCTION = "load_controlnet"

    CATEGORY = "loaders"

    def load_controlnet(self, control_net_name):
        controlnet_path = folder_paths.get_full_path("controlnet", control_net_name)
        controlnet = comfy.controlnet.load_controlnet(controlnet_path)
        return (controlnet,)

```
