---
tags:
- Searge
---

# HiResFix Parameters
## Documentation
- Class name: `SeargeOutput6`
- Category: `Searge/_deprecated_/UI/Outputs`
- Output node: `False`

SeargeOutput6 is designed to output HiResFix parameters, facilitating the adjustment and optimization of high-resolution image generation processes within the SeargeSDXL framework.
## Input types
### Required
- **`parameters`**
    - This parameter contains HiResFix settings and configurations, playing a crucial role in determining the behavior of high-resolution image enhancements.
    - Comfy dtype: `PARAMETERS`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`parameters`**
    - Comfy dtype: `PARAMETERS`
    - Returns the HiResFix parameters, enabling fine-tuning of high-resolution image processing.
    - Python dtype: `Dict[str, Any]`
- **`hrf_steps`**
    - Comfy dtype: `INT`
    - Specifies the number of steps for the HiResFix process, impacting the detail level of the output image.
    - Python dtype: `int`
- **`hrf_denoise`**
    - Comfy dtype: `FLOAT`
    - Controls the denoising level applied during the HiResFix process, affecting image clarity.
    - Python dtype: `float`
- **`hrf_upscale_factor`**
    - Comfy dtype: `FLOAT`
    - Determines the upscaling factor, influencing the final image size in the HiResFix process.
    - Python dtype: `float`
- **`hrf_noise_offset`**
    - Comfy dtype: `INT`
    - Adjusts the noise offset, modifying the texture and noise characteristics of the output image.
    - Python dtype: `int`
- **`hrf_seed`**
    - Comfy dtype: `INT`
    - The seed value for random number generation, ensuring reproducibility of the HiResFix process.
    - Python dtype: `int`
- **`hires_fix`**
    - Comfy dtype: `ENABLE_STATE`
    - Indicates whether the high-resolution fix is enabled, toggling the application of HiResFix enhancements.
    - Python dtype: `str`
- **`hrf_smoothness`**
    - Comfy dtype: `FLOAT`
    - Sets the smoothness level, affecting the softness or sharpness of the final image.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeOutput6:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "parameters": ("PARAMETERS",),
        },
        }

    RETURN_TYPES = ("PARAMETERS", "INT", "FLOAT", "FLOAT", "INT", "INT", "ENABLE_STATE", "FLOAT",)
    RETURN_NAMES = ("parameters", "hrf_steps", "hrf_denoise", "hrf_upscale_factor", "hrf_noise_offset",
                    "hrf_seed", "hires_fix", "hrf_smoothness",)
    FUNCTION = "demux"

    CATEGORY = "Searge/_deprecated_/UI/Outputs"

    def demux(self, parameters):
        hrf_steps = parameters["hrf_steps"]
        hrf_denoise = parameters["hrf_denoise"]
        hrf_upscale_factor = parameters["hrf_upscale_factor"]
        hrf_noise_offset = parameters["hrf_noise_offset"]
        hrf_seed = parameters["hrf_seed"]
        hires_fix = parameters["hires_fix"]
        hrf_smoothness = parameters["hrf_smoothness"]

        return (parameters, hrf_steps, hrf_denoise, hrf_upscale_factor, hrf_noise_offset, hrf_seed, hires_fix,
                hrf_smoothness,)

```
