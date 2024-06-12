---
tags:
- ControlNet
- ControlNetLoader
---

# Load Advanced ControlNet Model (diff) 🛂🅐🅒🅝
## Documentation
- Class name: `DiffControlNetLoaderAdvanced`
- Category: `Adv-ControlNet 🛂🅐🅒🅝`
- Output node: `False`

The DiffControlNetLoaderAdvanced node is designed for loading advanced control net models with specific modifications or differences. It focuses on enhancing the control net's capabilities by allowing the integration of additional parameters and customizations, thereby enabling more sophisticated control over the model's behavior.
## Input types
### Required
- **`model`**
    - Specifies the model to be used in conjunction with the control net, allowing for a tailored approach to loading and applying control nets.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`control_net_name`**
    - The name of the control net to be loaded. This parameter identifies the specific control net file within a predefined directory structure.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`timestep_keyframe`**
    - An optional parameter that allows for the specification of timestep keyframes, providing temporal control over the application of the control net.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `TimestepKeyframeGroup`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - Returns the loaded control net, enhanced with the specified model and optional timestep keyframes for advanced control.
    - Python dtype: `ControlNet`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DiffControlNetLoaderAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "control_net_name": (folder_paths.get_filename_list("controlnet"), )
            },
            "optional": {
                "timestep_keyframe": ("TIMESTEP_KEYFRAME", ),
            }
        }
    
    RETURN_TYPES = ("CONTROL_NET", )
    FUNCTION = "load_controlnet"

    CATEGORY = "Adv-ControlNet 🛂🅐🅒🅝"

    def load_controlnet(self, control_net_name, model,
                        timestep_keyframe: TimestepKeyframeGroup=None
                        ):
        controlnet_path = folder_paths.get_full_path("controlnet", control_net_name)
        controlnet = load_controlnet(controlnet_path, timestep_keyframe, model)
        if is_advanced_controlnet(controlnet):
            controlnet.verify_all_weights()
        return (controlnet,)

```
