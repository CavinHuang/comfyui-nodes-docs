---
tags:
- Searge
---

# Advanced Parameters
## Documentation
- Class name: `SeargeOutput3`
- Category: `Searge/_deprecated_/UI/Outputs`
- Output node: `False`

SeargeOutput3 is designed to demultiplex and extract advanced parameters from a given input, facilitating the customization and fine-tuning of generative models or processes.
## Input types
### Required
- **`parameters`**
    - Represents the advanced parameters for generative processes, playing a crucial role in customizing and fine-tuning the output.
    - Comfy dtype: `PARAMETERS`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`parameters`**
    - Comfy dtype: `PARAMETERS`
    - Returns the original set of advanced parameters provided as input.
    - Python dtype: `Dict[str, Any]`
- **`denoise`**
    - Comfy dtype: `FLOAT`
    - Specifies the denoise level for the generative process, influencing the clarity and detail of the generated output.
    - Python dtype: `float`
- **`base_ratio`**
    - Comfy dtype: `FLOAT`
    - Determines the base model's contribution ratio in the generative process, balancing between base and refiner models.
    - Python dtype: `float`
- **`refiner_strength`**
    - Comfy dtype: `FLOAT`
    - Adjusts the strength of the refiner model, affecting the refinement level of the generated output.
    - Python dtype: `float`
- **`noise_offset`**
    - Comfy dtype: `INT`
    - Controls the offset of noise applied during the generation, impacting the variation and uniqueness of the output.
    - Python dtype: `int`
- **`precondition_steps`**
    - Comfy dtype: `INT`
    - Defines the number of preconditioning steps to prepare the model before generation, optimizing the output quality.
    - Python dtype: `int`
- **`batch_size`**
    - Comfy dtype: `INT`
    - Sets the batch size for the generation process, affecting the processing speed and resource utilization.
    - Python dtype: `int`
- **`upscale_resolution_factor`**
    - Comfy dtype: `FLOAT`
    - Specifies the factor by which the output resolution is upscaled, enhancing the detail and quality of the final image.
    - Python dtype: `float`
- **`save_upscaled_image`**
    - Comfy dtype: `ENABLE_STATE`
    - Indicates whether the upscaled image should be saved, providing an option to retain higher resolution outputs.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeOutput3:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "parameters": ("PARAMETERS",),
        },
        }

    RETURN_TYPES = ("PARAMETERS", "FLOAT", "FLOAT", "FLOAT", "INT", "INT", "INT", "FLOAT", "ENABLE_STATE",)
    RETURN_NAMES = ("parameters", "denoise", "base_ratio", "refiner_strength", "noise_offset", "precondition_steps",
                    "batch_size", "upscale_resolution_factor", "save_upscaled_image",)
    FUNCTION = "demux"

    CATEGORY = "Searge/_deprecated_/UI/Outputs"

    def demux(self, parameters):
        denoise = parameters["denoise"]
        base_ratio = parameters["base_ratio"]
        refiner_strength = parameters["refiner_strength"]
        noise_offset = parameters["noise_offset"]
        precondition_steps = parameters["precondition_steps"]
        batch_size = parameters["batch_size"]
        upscale_resolution_factor = parameters["upscale_resolution_factor"]
        save_upscaled_image = parameters["save_upscaled_image"]

        return (parameters, denoise, base_ratio, refiner_strength, noise_offset, precondition_steps, batch_size,
                upscale_resolution_factor, save_upscaled_image,)

```
