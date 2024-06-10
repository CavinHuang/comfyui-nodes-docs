---
tags:
- ControlNet
- ControlNetLoader
---

# Load Advanced ControlNet Model 🛂🅐🅒🅝
## Documentation
- Class name: `ControlNetLoaderAdvanced`
- Category: `Adv-ControlNet 🛂🅐🅒🅝`
- Output node: `False`

This node is designed to load an advanced ControlNet model, optionally incorporating a timestep keyframe group for enhanced control. It abstracts the complexities of fetching and initializing ControlNet models, ensuring they are ready for further manipulation or application within a broader system.
## Input types
### Required
- **`control_net_name`**
    - Specifies the name of the ControlNet model to be loaded. This name is used to locate the model within a predefined directory structure.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`timestep_keyframe`**
    - An optional parameter that allows for the inclusion of a timestep keyframe group, providing additional control and customization capabilities for the loaded ControlNet model.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `TimestepKeyframeGroup or None`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - Returns the loaded ControlNet model, ready for use in various applications that require advanced control mechanisms.
    - Python dtype: `ControlNet`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [ACN_AdvancedControlNetApply](../../ComfyUI-Advanced-ControlNet/Nodes/ACN_AdvancedControlNetApply.md)
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)
    - [Control Net Stacker](../../efficiency-nodes-comfyui/Nodes/Control Net Stacker.md)
    - [ImpactControlNetApplySEGS](../../ComfyUI-Impact-Pack/Nodes/ImpactControlNetApplySEGS.md)



## Source code
```python
class ControlNetLoaderAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "control_net_name": (folder_paths.get_filename_list("controlnet"), ),
            },
            "optional": {
                "timestep_keyframe": ("TIMESTEP_KEYFRAME", ),
            }
        }

    RETURN_TYPES = ("CONTROL_NET", )
    FUNCTION = "load_controlnet"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝"

    def load_controlnet(self, control_net_name,
                        timestep_keyframe: TimestepKeyframeGroup=None
                        ):
        controlnet_path = folder_paths.get_full_path("controlnet", control_net_name)
        controlnet = load_controlnet(controlnet_path, timestep_keyframe)
        return (controlnet,)

```
