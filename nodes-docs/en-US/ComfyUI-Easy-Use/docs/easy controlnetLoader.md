---
tags:
- ControlNet
- ControlNetLoader
---

# EasyControlnet
## Documentation
- Class name: `easy controlnetLoader`
- Category: `EasyUse/Loaders`
- Output node: `True`

This node is designed to apply control net configurations to a given pipeline, enhancing or modifying the generation process based on the control net's parameters. It allows for dynamic adjustment of the control net's influence through various parameters, enabling fine-tuned control over the generation outcome.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline to which the control net configurations will be applied, serving as the foundation for the generation process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Pipeline`
- **`image`**
    - The image that will be used in conjunction with the control net to influence the generation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`control_net_name`**
    - Specifies the name of the control net to be applied. This is crucial for identifying which control net configuration to load and apply to the pipeline.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`control_net`**
    - An optional parameter that allows for the direct passing of a control net object, bypassing the need for loading from a name. This is useful for advanced use cases where the control net is dynamically generated or modified.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `Optional[ControlNet]`
- **`strength`**
    - Determines the intensity of the control net's effect on the generation process, allowing for subtle to significant modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`scale_soft_weights`**
    - Adjusts the scaling of soft weights within the control net, offering another layer of control over how the control net influences the generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The modified pipeline after applying the control net, reflecting any changes or enhancements made by the control net's parameters.
    - Python dtype: `Pipeline`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning component of the pipeline, potentially altered by the control net's application.
    - Python dtype: `Conditioning`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning component of the pipeline, potentially altered by the control net's application.
    - Python dtype: `Conditioning`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class controlnetSimple:
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
                "scale_soft_weights": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001},),
            }
        }

    RETURN_TYPES = ("PIPE_LINE", "CONDITIONING", "CONDITIONING")
    RETURN_NAMES = ("pipe", "positive", "negative")
    OUTPUT_NODE = True

    FUNCTION = "controlnetApply"
    CATEGORY = "EasyUse/Loaders"

    def controlnetApply(self, pipe, image, control_net_name, control_net=None, strength=1, scale_soft_weights=1):

        positive, negative = easyControlnet().apply(control_net_name, image, pipe["positive"], pipe["negative"], strength, 0, 1, control_net, scale_soft_weights)

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
