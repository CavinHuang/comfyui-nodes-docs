---
tags:
- ControlNet
- ControlNetLoader
---

# ControlNet Loader
## Documentation
- Class name: `AV_ControlNetLoader`
- Category: `Art Venture/Loaders`
- Output node: `False`

The AV_ControlNetLoader node is designed to load control net configurations for use in art and design applications. It supports loading specific control net models by name, with optional overrides and timestep keyframe adjustments, facilitating dynamic and flexible control net application within creative workflows.
## Input types
### Required
- **`control_net_name`**
    - Specifies the name of the control net to be loaded. This parameter is essential for identifying which control net configuration to apply, enabling the customization of art generation processes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`control_net_override`**
    - Allows for the specification of an alternative control net to be used instead of the one named in 'control_net_name', providing flexibility in control net selection.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`timestep_keyframe`**
    - Optional parameter to specify a particular timestep keyframe for the control net, enabling fine-tuned adjustments to how the control net is applied.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `str`
## Output types
- **`control_net`**
    - Comfy dtype: `CONTROL_NET`
    - Returns the loaded control net configuration, ready for application in art generation processes.
    - Python dtype: `Optional[ControlNetType]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVControlNetLoader(ControlNetLoader):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {"control_net_name": (folder_paths.get_filename_list("controlnet"),)},
            "optional": {
                "control_net_override": ("STRING", {"default": "None"}),
                "timestep_keyframe": ("TIMESTEP_KEYFRAME",),
            },
        }

    RETURN_TYPES = ("CONTROL_NET",)
    FUNCTION = "load_controlnet"
    CATEGORY = "Art Venture/Loaders"

    def load_controlnet(self, control_net_name, control_net_override="None", timestep_keyframe=None):
        return load_controlnet(control_net_name, control_net_override, timestep_keyframe=timestep_keyframe)

```
