---
tags:
- ControlNet
- ControlNetLoader
---

# EasyControlnet (Advanced)
## Documentation
- Class name: `easy controlnetLoaderADV`
- Category: `EasyUse/Loaders`
- Output node: `True`

This node specializes in loading advanced control networks, offering enhanced capabilities for fine-tuning and applying control nets to various models. It extends the functionality of standard control net loaders by supporting additional parameters and configurations, enabling more precise control and customization of the control net's application.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline context in which the control net is applied, affecting how the control net integrates with other components.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`image`**
    - The image to which the control net will be applied, serving as the target for control net adjustments.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`control_net_name`**
    - Specifies the name of the control net to be loaded. This parameter is crucial as it determines which control net is utilized for the operation, affecting the outcome significantly.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`control_net`**
    - The control net object to be applied, allowing for the customization and application of specific control net configurations.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `Any`
- **`strength`**
    - Defines the intensity of the control net's effect, allowing for dynamic adjustment of its impact on the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - Specifies the starting percentage of the effect, enabling phased application of the control net over the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Determines the ending percentage of the effect, facilitating a gradual application of the control net's influence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`scale_soft_weights`**
    - Adjusts the softness of the weights applied by the control net, allowing for finer control over its influence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The updated pipeline after applying the control net, reflecting changes and adjustments made.
    - Python dtype: `Dict[str, Any]`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning effect produced by the control net, enhancing certain aspects of the image.
    - Python dtype: `List[Tuple[str, Dict[str, Any]]]`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning effect produced by the control net, diminishing certain aspects of the image.
    - Python dtype: `List[Tuple[str, Dict[str, Any]]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class controlnetAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        def get_file_list(filenames):
            return [file for file in filenames if file != "put_models_here.txt" and "lllite" not in file]

        return {
            "required": {
                "pipe": ("PIPE_LINE",),
                "image": ("IMAGE",),
                "control_net_name": (get_file_list(folder_paths.get_filename_list("controlnet")),),
            },
            "optional": {
                "control_net": ("CONTROL_NET",),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "scale_soft_weights": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001},),
            }
        }

    RETURN_TYPES = ("PIPE_LINE", "CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("pipe", "positive", "negative")
    OUTPUT_NODE = True

    FUNCTION = "controlnetApply"
    CATEGORY = "EasyUse/Loaders"


    def controlnetApply(self, pipe, image, control_net_name, control_net=None, strength=1, start_percent=0, end_percent=1, scale_soft_weights=1):
        positive, negative = easyControlnet().apply(control_net_name, image, pipe["positive"], pipe["negative"],
                                                    strength, start_percent, end_percent, control_net, scale_soft_weights)

        new_pipe = {
            "model": pipe['model'],
            "positive": positive,
            "negative": negative,
            "vae": pipe['vae'],
            "clip": pipe['clip'],

            "samples": pipe["samples"],
            "images": pipe["images"],
            "seed": 0,

            "loader_settings": pipe["loader_settings"]
        }

        del pipe

        return (new_pipe, positive, negative)

```
