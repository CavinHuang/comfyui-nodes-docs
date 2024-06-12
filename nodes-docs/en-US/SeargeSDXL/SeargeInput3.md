---
tags:
- Searge
---

# Advanced Parameters
## Documentation
- Class name: `SeargeInput3`
- Category: `Searge/_deprecated_/UI/Inputs`
- Output node: `False`

SeargeInput3 is designed to process and integrate various input types for generating or modifying content, focusing on combining different forms of prompts and styles to tailor the output according to specific requirements or preferences.
## Input types
### Required
- **`base_ratio`**
    - Specifies the base ratio for high-resolution image processing, influencing the balance between base and refined details in the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`refiner_strength`**
    - Determines the strength of the refinement process, affecting the intensity of details and textures in the final image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`refiner_intensity`**
    - Controls the intensity of the refiner's effect, allowing for finer adjustments to how much the refiner alters the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `float`
- **`precondition_steps`**
    - Defines the number of steps to precondition the image, preparing it for further processing or refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Sets the batch size for processing, impacting performance and the amount of data processed simultaneously.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`upscale_resolution_factor`**
    - Adjusts the factor by which the image resolution is increased, directly influencing the output image's clarity and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`save_upscaled_image`**
    - Determines whether the upscaled image is saved, providing control over the output management.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`inputs`**
    - Optional inputs for additional parameters or configurations, offering flexibility in the processing workflow.
    - Comfy dtype: `PARAMETER_INPUTS`
    - Python dtype: `str`
- **`denoise`**
    - Applies a denoising filter to the image, reducing noise and potentially improving visual quality.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`inputs`**
    - Comfy dtype: `PARAMETER_INPUTS`
    - The processed inputs, potentially including modified or additional parameters for further stages of content generation or modification.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeInput3:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "base_ratio": ("FLOAT", {"default": 0.8, "min": 0.0, "max": 1.0, "step": 0.01}),
            "refiner_strength": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 1.0, "step": 0.05}),
            "refiner_intensity": (SeargeParameterProcessor.REFINER_INTENSITY,
                                  {"default": SeargeParameterProcessor.REFINER_INTENSITY[1]}),
            "precondition_steps": ("INT", {"default": 0, "min": 0, "max": 10}),
            "batch_size": ("INT", {"default": 1, "min": 1, "max": 4}),
            "upscale_resolution_factor": ("FLOAT", {"default": 2.0, "min": 0.25, "max": 4.0, "step": 0.25}),
            "save_upscaled_image": (SeargeParameterProcessor.STATES, {"default": SeargeParameterProcessor.STATES[1]}),
        },
            "optional": {
                "inputs": ("PARAMETER_INPUTS",),
                "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("PARAMETER_INPUTS",)
    RETURN_NAMES = ("inputs",)
    FUNCTION = "mux"

    CATEGORY = "Searge/_deprecated_/UI/Inputs"

    def mux(self, base_ratio, refiner_strength, refiner_intensity, precondition_steps, batch_size,
            upscale_resolution_factor, save_upscaled_image, inputs=None, denoise=None):

        if inputs is None:
            parameters = {}
        else:
            parameters = inputs

        parameters["denoise"] = denoise
        parameters["base_ratio"] = base_ratio
        parameters["refiner_strength"] = refiner_strength
        parameters["refiner_intensity"] = refiner_intensity
        parameters["precondition_steps"] = precondition_steps
        parameters["batch_size"] = batch_size
        parameters["upscale_resolution_factor"] = upscale_resolution_factor
        parameters["save_upscaled_image"] = save_upscaled_image

        return (parameters,)

```
