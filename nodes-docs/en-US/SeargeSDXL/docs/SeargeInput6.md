---
tags:
- Searge
---

# HiResFix Parameters
## Documentation
- Class name: `SeargeInput6`
- Category: `Searge/_deprecated_/UI/Inputs`
- Output node: `False`

SeargeInput6 is designed to handle high-resolution fix parameters, providing a specialized interface for adjusting and applying high-definition enhancements to generated content.
## Input types
### Required
- **`hires_fix`**
    - Specifies whether high-resolution fixes are enabled or disabled, allowing for toggling of high-definition enhancements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`hrf_steps`**
    - Determines the number of steps for the high-resolution fix process, affecting the detail and quality of enhancements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`hrf_denoise`**
    - Sets the denoise level for high-resolution fixes, impacting the clarity and noise reduction in the enhanced output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hrf_upscale_factor`**
    - Defines the upscale factor, controlling the degree of size increase for high-resolution enhancements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hrf_intensity`**
    - Adjusts the intensity of the refiner, influencing the strength of high-resolution enhancements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`hrf_seed_offset`**
    - Specifies the seed offset for noise generation, affecting the randomness and variation in the high-resolution enhancements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`hrf_smoothness`**
    - Controls the smoothness level of the high-resolution fix, impacting the softness or sharpness of the enhanced output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`inputs`**
    - Optional additional parameters that can be included for more granular control over the high-resolution fix process.
    - Comfy dtype: `PARAMETER_INPUTS`
    - Python dtype: `dict`
## Output types
- **`inputs`**
    - Comfy dtype: `PARAMETER_INPUTS`
    - Returns a dictionary of parameters, including high-resolution fix settings, ready for further processing or application.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeInput6:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "hires_fix": (SeargeParameterProcessor.STATES, {"default": SeargeParameterProcessor.STATES[1]}),
            "hrf_steps": ("INT", {"default": 0, "min": 0, "max": 100}),
            "hrf_denoise": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.01}),
            "hrf_upscale_factor": ("FLOAT", {"default": 1.5, "min": 0.25, "max": 4.0, "step": 0.25}),
            "hrf_intensity": (SeargeParameterProcessor.REFINER_INTENSITY,
                              {"default": SeargeParameterProcessor.REFINER_INTENSITY[1]}),
            "hrf_seed_offset": (SeargeParameterProcessor.HRF_SEED_OFFSET,
                                {"default": SeargeParameterProcessor.HRF_SEED_OFFSET[1]}),
            "hrf_smoothness": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05}),
        },
            "optional": {
                "inputs": ("PARAMETER_INPUTS",),
            },
        }

    RETURN_TYPES = ("PARAMETER_INPUTS",)
    RETURN_NAMES = ("inputs",)
    FUNCTION = "mux"

    CATEGORY = "Searge/_deprecated_/UI/Inputs"

    def mux(self, hires_fix, hrf_steps, hrf_denoise, hrf_upscale_factor, hrf_intensity, hrf_seed_offset,
            hrf_smoothness, inputs=None):

        if inputs is None:
            parameters = {}
        else:
            parameters = inputs

        parameters["hires_fix"] = hires_fix
        parameters["hrf_steps"] = hrf_steps
        parameters["hrf_denoise"] = hrf_denoise
        parameters["hrf_upscale_factor"] = hrf_upscale_factor
        parameters["hrf_intensity"] = hrf_intensity
        parameters["hrf_seed_offset"] = hrf_seed_offset
        parameters["hrf_smoothness"] = hrf_smoothness

        return (parameters,)

```
