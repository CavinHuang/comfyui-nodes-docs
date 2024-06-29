---
tags:
- ControlNet
- ControlNetLoader
---

# ControlNet Loader
## Documentation
- Class name: `AV_ControlNetEfficientLoader`
- Category: `Art Venture/Loaders`
- Output node: `False`

This node specializes in efficiently loading ControlNet configurations, optimizing the process for enhanced performance and resource utilization. It extends the capabilities of a standard ControlNet loader by incorporating advanced techniques to streamline the loading operation, making it suitable for scenarios requiring high efficiency.
## Input types
### Required
- **`control_net_name`**
    - Specifies the name of the ControlNet configuration to be loaded. This parameter is crucial for identifying which configuration file to access and load, directly influencing the node's operation by determining the specific ControlNet to be utilized.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`conditioning`**
    - The conditioning data to be applied in conjunction with the ControlNet, influencing the final output by adjusting the model's behavior based on specified conditions.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `list`
- **`image`**
    - The image input that the ControlNet will process, serving as a basis for the application of the ControlNet's effects or transformations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `object`
- **`strength`**
    - Determines the intensity of the ControlNet's application on the image, allowing for fine-tuned control over the effect's strength.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`preprocessor`**
    - Specifies the preprocessor to be used on the image before applying the ControlNet, affecting the input image's condition and potentially its compatibility with the ControlNet.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`control_net_override`**
    - Allows for the dynamic overriding of the specified ControlNet configuration. This flexibility is key for scenarios where conditional or runtime decisions may dictate the use of an alternative configuration, thereby affecting the outcome of the loading process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`timestep_keyframe`**
    - Defines a specific timestep or keyframe within the ControlNet configuration to be loaded. This parameter enables precise control over the loading process, allowing for targeted access to specific portions of the ControlNet, which can be critical for temporal or sequential applications.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `str`
- **`resolution`**
    - The resolution at which the image should be processed, impacting the quality and detail of the ControlNet's application.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`enabled`**
    - A flag to enable or disable the ControlNet loading and application process, providing a mechanism to conditionally bypass this node's operation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Returns the conditioning data after the application of the ControlNet, reflecting any modifications or enhancements made during the process.
    - Python dtype: `list`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVControlNetEfficientLoader(ControlNetApply):
    controlnets = folder_paths.get_filename_list("controlnet")
    preprocessors = list(control_net_preprocessors.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "control_net_name": (["None"] + s.controlnets,),
                "conditioning": ("CONDITIONING",),
                "image": ("IMAGE",),
                "strength": (
                    "FLOAT",
                    {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01},
                ),
                "preprocessor": (["None"] + s.preprocessors,),
            },
            "optional": {
                "control_net_override": ("STRING", {"default": "None"}),
                "timestep_keyframe": ("TIMESTEP_KEYFRAME",),
                "resolution": ("INT", {"default": 512, "min": 64, "max": 2048, "step": 64}),
                "enabled": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "load_controlnet"
    CATEGORY = "Art Venture/Loaders"

    def load_controlnet(
        self,
        control_net_name,
        conditioning,
        image,
        strength,
        preprocessor,
        control_net_override="None",
        timestep_keyframe=None,
        resolution=512,
        enabled=True,
    ):
        if not enabled:
            return (conditioning,)

        control_net = load_controlnet(control_net_name, control_net_override, timestep_keyframe=timestep_keyframe)
        if control_net is None:
            return (conditioning,)

        image = apply_preprocessor(image, preprocessor, resolution=resolution)

        return super().apply_controlnet(conditioning, control_net, image, strength)

```
