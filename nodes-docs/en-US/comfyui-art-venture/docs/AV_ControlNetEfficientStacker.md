---
tags:
- ControlNet
---

# ControlNet Stacker Adv.
## Documentation
- Class name: `AV_ControlNetEfficientStacker`
- Category: `Art Venture/Loaders`
- Output node: `False`

The AV_ControlNetEfficientStacker node is designed to streamline the process of integrating and managing control networks within an image processing pipeline. It facilitates the efficient stacking of control networks by allowing for dynamic selection based on predefined criteria, application of preprocessing steps, and adjustment of control network strength and resolution, thereby enhancing the flexibility and effectiveness of image manipulation tasks.
## Input types
### Required
- **`control_net_name`**
    - Specifies the name of the control network to be used, including options for automatic selection based on the model version. This parameter is crucial for determining the appropriate control network and preprocessing requirements for the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image`**
    - The input image to be processed. This parameter is essential as it serves as the base for applying the control network transformations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`strength`**
    - Defines the intensity of the control network's effect on the image, allowing for fine-tuned manipulation of the image's attributes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - Specifies the starting percentage of the control network's effect, allowing for gradual application over the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Specifies the ending percentage of the control network's effect, enabling precise control over how the network's influence fades.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`preprocessor`**
    - Specifies the preprocessing method to be applied to the image before the control network is applied, ensuring the image is in the optimal format for manipulation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`cnet_stack`**
    - An optional stack of control networks to be applied. This allows for the layering of multiple control networks for complex image transformations.
    - Comfy dtype: `CONTROL_NET_STACK`
    - Python dtype: `Optional[List[Tuple[Any]]]`
- **`control_net_override`**
    - Allows for the manual override of the selected control network, providing flexibility in the choice of control networks.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`timestep_keyframe`**
    - Optionally specifies a keyframe for the control network, enabling temporal control over the image manipulation process.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `Optional[str]`
- **`resolution`**
    - Sets the resolution for the image processing, allowing for control over the detail level of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`enabled`**
    - A flag to enable or disable the control network processing, offering a straightforward way to bypass the control network application.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`CNET_STACK`**
    - Comfy dtype: `CONTROL_NET_STACK`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVControlNetEfficientStacker:
    controlnets = folder_paths.get_filename_list("controlnet")
    preprocessors = list(control_net_preprocessors.keys())

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
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
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

    RETURN_TYPES = ("CONTROL_NET_STACK",)
    RETURN_NAMES = ("CNET_STACK",)
    FUNCTION = "control_net_stacker"
    CATEGORY = "Art Venture/Loaders"

    def control_net_stacker(
        self,
        control_net_name: str,
        image,
        strength,
        start_percent,
        end_percent,
        preprocessor,
        cnet_stack=None,
        control_net_override="None",
        timestep_keyframe=None,
        resolution=512,
        enabled=True,
    ):
        if not enabled:
            return (cnet_stack,)

        # If control_net_stack is None, initialize as an empty list
        if cnet_stack is None:
            cnet_stack = []

        if control_net_name.startswith("Auto: "):
            assert preprocessor != "None", "preprocessor must be set when using Auto mode"

            sd_version = control_net_name[len("Auto: ") :]
            control_net_name = detect_controlnet(preprocessor, sd_version)

        control_net = load_controlnet(control_net_name, control_net_override, timestep_keyframe=timestep_keyframe)

        # Extend the control_net_stack with the new tuple
        if control_net is not None:
            image = apply_preprocessor(image, preprocessor, resolution=resolution)
            cnet_stack.extend([(control_net, image, strength, start_percent, end_percent)])

        return (cnet_stack,)

```
