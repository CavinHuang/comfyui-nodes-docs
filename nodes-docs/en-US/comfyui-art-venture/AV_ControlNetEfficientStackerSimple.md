---
tags:
- ControlNet
---

# ControlNet Stacker
## Documentation
- Class name: `AV_ControlNetEfficientStackerSimple`
- Category: `Art Venture/Loaders`
- Output node: `False`

This node is designed to streamline the process of stacking control networks for image manipulation, enabling the application of multiple control net transformations to an image based on specified parameters. It simplifies the integration of control nets into the image processing pipeline, focusing on efficiency and ease of use.
## Input types
### Required
- **`control_net_name`**
    - Specifies the control net to be applied. It includes options for automatic selection based on the model version or a custom selection from available control nets, influencing the control net's behavior and output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`image`**
    - The input image to be processed by the control net stack. It serves as the base for subsequent control net applications, determining the initial state of the image manipulation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`strength`**
    - Defines the intensity of the control net's effect on the image, allowing for fine-tuned adjustments to the impact of the control net application.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`preprocessor`**
    - Selects a preprocessor to be applied before the control net, affecting the image's preparation and potentially its compatibility with the control net.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`cnet_stack`**
    - An optional stack of control nets to be applied sequentially. This allows for the layering of multiple control net effects on the image.
    - Comfy dtype: `CONTROL_NET_STACK`
    - Python dtype: `CONTROL_NET_STACK`
- **`control_net_override`**
    - Overrides the selected control net with a specified one, offering flexibility in experimenting with different control nets.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`timestep_keyframe`**
    - Specifies keyframes for the control net application, enabling dynamic control over the effect's application over time.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `TIMESTEP_KEYFRAME`
- **`resolution`**
    - Sets the resolution for the image processing, impacting the detail level of the control net application.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`enabled`**
    - Toggles the control net stacker's operation, allowing it to be enabled or disabled as needed.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`CNET_STACK`**
    - Comfy dtype: `CONTROL_NET_STACK`
    - The resulting stack of control nets after processing. This output encapsulates the sequence of control net applications performed on the image, reflecting the cumulative effect of the specified transformations.
    - Python dtype: `CONTROL_NET_STACK`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVControlNetEfficientStackerSimple(AVControlNetEfficientStacker):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "control_net_name": (["None", "Auto: sd15", "Auto: sdxl", "Auto: sdxl_t2i"] + s.controlnets,),
                "image": ("IMAGE",),
                "strength": (
                    "FLOAT",
                    {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01},
                ),
                "preprocessor": (["None"] + s.preprocessors,),
            },
            "optional": {
                "cnet_stack": ("CONTROL_NET_STACK",),
                "control_net_override": ("STRING", {"default": "None"}),
                "timestep_keyframe": ("TIMESTEP_KEYFRAME",),
                "resolution": ("INT", {"default": 512, "min": 64, "max": 2048, "step": 64}),
                "enabled": ("BOOLEAN", {"default": True}),
            },
        }

    FUNCTION = "control_net_stacker_simple"

    def control_net_stacker_simple(
        self,
        *args,
        **kwargs,
    ):
        return self.control_net_stacker(*args, start_percent=0.0, end_percent=1.0, **kwargs)

```
