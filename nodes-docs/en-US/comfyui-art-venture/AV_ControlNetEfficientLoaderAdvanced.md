---
tags:
- ControlNet
- ControlNetLoader
---

# ControlNet Loader Adv.
## Documentation
- Class name: `AV_ControlNetEfficientLoaderAdvanced`
- Category: `Art Venture/Loaders`
- Output node: `False`

This node represents an advanced version of the ControlNet loader, designed to efficiently load and apply ControlNet configurations for enhanced image manipulation and generation tasks. It extends the capabilities of its base loader with additional functionalities, aiming to provide more sophisticated control and optimization options for processing and applying ControlNet models.
## Input types
### Required
- **`control_net_name`**
    - Specifies the name of the ControlNet to be loaded. This parameter is crucial for identifying which ControlNet model to apply, directly influencing the outcome of the image manipulation or generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - The positive conditioning input for the ControlNet, representing the desired attributes or features to enhance or maintain in the image.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[str, Dict]]`
- **`negative`**
    - The negative conditioning input for the ControlNet, representing the attributes or features to diminish or remove from the image.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[Tuple[str, Dict]]`
- **`image`**
    - The image to be processed by the ControlNet, serving as the basis for the application of the conditioning effects.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Any`
- **`strength`**
    - Determines the intensity of the ControlNet's effect on the image, allowing for fine-tuned control over the manipulation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - Specifies the starting percentage of the effect's application, enabling phased or gradual application of the ControlNet.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Specifies the ending percentage of the effect's application, allowing for a controlled conclusion to the ControlNet's influence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`preprocessor`**
    - Selects the preprocessor to be used on the image before applying the ControlNet, affecting the final outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`control_net_override`**
    - Allows for the override of the selected ControlNet model. This parameter offers flexibility in dynamically choosing different ControlNet models, potentially enhancing the adaptability of the node to various scenarios.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`timestep_keyframe`**
    - Defines a specific timestep or keyframe for the ControlNet application. This parameter enables precise control over the timing of the ControlNet's effects, allowing for more targeted and effective image manipulations.
    - Comfy dtype: `TIMESTEP_KEYFRAME`
    - Python dtype: `Optional[str]`
- **`resolution`**
    - Defines the resolution of the image to be processed, impacting the detail and quality of the ControlNet's application.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`enabled`**
    - Enables or disables the application of the ControlNet, providing a mechanism to bypass processing when necessary.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The modified positive conditioning after the ControlNet application, reflecting the enhanced or maintained attributes.
    - Python dtype: `List[Tuple[str, Dict]]`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The modified negative conditioning after the ControlNet application, reflecting the diminished or removed attributes.
    - Python dtype: `List[Tuple[str, Dict]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVControlNetEfficientLoaderAdvanced(ControlNetApplyAdvanced):
    controlnets = folder_paths.get_filename_list("controlnet")
    preprocessors = list(control_net_preprocessors.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "control_net_name": (["None"] + s.controlnets,),
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
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
                "control_net_override": ("STRING", {"default": "None"}),
                "timestep_keyframe": ("TIMESTEP_KEYFRAME",),
                "resolution": ("INT", {"default": 512, "min": 64, "max": 2048, "step": 64}),
                "enabled": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("positive", "negative")
    FUNCTION = "load_controlnet"
    CATEGORY = "Art Venture/Loaders"

    def load_controlnet(
        self,
        control_net_name,
        positive,
        negative,
        image,
        strength,
        start_percent,
        end_percent,
        preprocessor,
        control_net_override="None",
        timestep_keyframe=None,
        resolution=512,
        enabled=True,
    ):
        if not enabled:
            return (positive, negative)

        control_net = load_controlnet(control_net_name, control_net_override, timestep_keyframe=timestep_keyframe)
        if control_net is None:
            return (positive, negative)

        image = apply_preprocessor(image, preprocessor, resolution=resolution)

        return super().apply_controlnet(positive, negative, control_net, image, strength, start_percent, end_percent)

```
