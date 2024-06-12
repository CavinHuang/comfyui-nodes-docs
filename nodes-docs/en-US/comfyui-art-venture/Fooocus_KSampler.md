---
tags:
- Sampling
---

# KSampler Fooocus
## Documentation
- Class name: `Fooocus_KSampler`
- Category: `Art Venture/Sampling`
- Output node: `False`

The Fooocus_KSampler node enhances the sampling process in art generation by introducing an adjustable sharpness parameter to the traditional KSampler functionality. This allows for more precise control over the sharpness of generated images, catering to the specific needs of art ventures.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for the sampling process, serving as the foundation for generating images.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`seed`**
    - Determines the initial seed for randomness in the sampling process, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the sampling process, affecting the detail and quality of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning-free guidance scale, influencing the adherence to specified conditions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler algorithm to be used, impacting the sampling behavior and output quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the sampling process, affecting the progression of image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Sets positive conditioning to guide the sampling towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Applies negative conditioning to steer the sampling away from undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - Provides an initial latent image to be refined or altered through the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`denoise`**
    - Adjusts the level of denoising applied to the generated images, affecting clarity and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`sharpness`**
    - The sharpness parameter allows users to adjust the sharpness level of the generated images, providing a means to fine-tune the visual output according to artistic preferences.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output latent representation of the generated image, ready for further processing or conversion to a visual format.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class KSamplerWithSharpness(KSampler):
    @classmethod
    def INPUT_TYPES(cls):
        inputs = KSampler.INPUT_TYPES()
        inputs["optional"] = {
            "sharpness": (
                "FLOAT",
                {"default": 2.0, "min": 0.0, "max": 100.0, "step": 0.01},
            )
        }

        return inputs

    CATEGORY = "Art Venture/Sampling"

    def sample(self, *args, sharpness=2.0, **kwargs):
        patch.sharpness = sharpness
        patch_all()
        results = super().sample(*args, **kwargs)
        unpatch_all()
        return results

```
