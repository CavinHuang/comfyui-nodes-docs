---
tags:
- Searge
---

# Generation Parameters
## Documentation
- Class name: `SeargeInput2`
- Category: `Searge/_deprecated_/UI/Inputs`
- Output node: `False`

The node is designed to facilitate the integration and manipulation of various input types for generating or modifying content, focusing on enhancing user interaction with the system by providing a structured way to input data.
## Input types
### Required
- **`seed`**
    - Specifies the initial value for random number generation, ensuring reproducibility and consistency in the generated content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_width`**
    - Determines the width of the generated image, allowing for customization of the output's dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_height`**
    - Sets the height of the generated image, enabling control over the output's size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps the generation process should take, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the configuration setting for the generation process, influencing the output's characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the sampling algorithm used during generation, impacting the diversity and quality of results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduling algorithm for the generation process, affecting the progression and quality of outputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`save_image`**
    - Determines whether the generated image should be saved, facilitating content preservation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`save_directory`**
    - Specifies the directory where generated images will be saved, organizing output management.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`inputs`**
    - Optional additional inputs that can be provided for the generation process, offering further customization.
    - Comfy dtype: `PARAMETER_INPUTS`
    - Python dtype: `dict`
## Output types
- **`inputs`**
    - Comfy dtype: `PARAMETER_INPUTS`
    - Outputs the parameters used in the generation process, encapsulating the configured inputs for potential reuse or analysis.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeInput2:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            "image_width": ("INT", {"default": 1024, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "image_height": ("INT", {"default": 1024, "min": 0, "max": nodes.MAX_RESOLUTION, "step": 8}),
            "steps": ("INT", {"default": 20, "min": 0, "max": 200}),
            "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 30.0, "step": 0.5}),
            "sampler_name": (comfy.samplers.KSampler.SAMPLERS, {"default": "ddim"}),
            "scheduler": (comfy.samplers.KSampler.SCHEDULERS, {"default": "ddim_uniform"}),
            "save_image": (SeargeParameterProcessor.STATES, {"default": SeargeParameterProcessor.STATES[1]}),
            "save_directory": (SeargeParameterProcessor.SAVE_TO,
                               {"default": SeargeParameterProcessor.SAVE_TO[0]}),
        },
            "optional": {
                "inputs": ("PARAMETER_INPUTS",),
            },
        }

    RETURN_TYPES = ("PARAMETER_INPUTS",)
    RETURN_NAMES = ("inputs",)
    FUNCTION = "mux"

    CATEGORY = "Searge/_deprecated_/UI/Inputs"

    def mux(self, seed, image_width, image_height, steps, cfg, sampler_name, scheduler, save_image, save_directory,
            inputs=None):

        if inputs is None:
            parameters = {}
        else:
            parameters = inputs

        parameters["seed"] = seed
        parameters["image_width"] = image_width
        parameters["image_height"] = image_height
        parameters["steps"] = steps
        parameters["cfg"] = cfg
        parameters["sampler_name"] = sampler_name
        parameters["scheduler"] = scheduler
        parameters["save_image"] = save_image
        parameters["save_directory"] = save_directory

        return (parameters,)

```
