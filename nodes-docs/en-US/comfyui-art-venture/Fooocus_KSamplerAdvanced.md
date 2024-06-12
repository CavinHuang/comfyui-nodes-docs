---
tags:
- Sampling
---

# KSampler Adv. Fooocus
## Documentation
- Class name: `Fooocus_KSamplerAdvanced`
- Category: `Art Venture/Sampling`
- Output node: `False`

The `Fooocus_KSamplerAdvanced` node enhances the sampling process in art generation by incorporating a sharpness parameter, allowing for more precise control over the texture and detail in the generated artwork. This node builds upon the advanced sampling capabilities, integrating sharpness adjustments directly into the sampling workflow to refine the visual output.
## Input types
### Required
- **`model`**
    - Specifies the model used for the sampling process, serving as the core component for generating artwork.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`add_noise`**
    - Determines whether noise is added to the sampling process, affecting the texture and detail of the generated artwork.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`noise_seed`**
    - Sets the seed for noise generation, ensuring reproducibility in the artwork's texture and detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps in the sampling process, impacting the refinement and detail of the generated artwork.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the configuration for the sampling process, influencing the balance between the model's guidance and the generated detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler to use, affecting the method of traversing the model's latent space.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for the sampling process, determining the progression of steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Provides positive conditioning to guide the sampling towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Provides negative conditioning to steer the sampling away from undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - Inputs an initial latent image for the sampling process, serving as a starting point.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`start_at_step`**
    - Specifies the starting step for the sampling process, allowing for mid-process intervention.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Defines the ending step for the sampling process, determining its completion point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`return_with_leftover_noise`**
    - Controls whether the output includes leftover noise, affecting the final texture.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
### Optional
- **`sharpness`**
    - The `sharpness` parameter allows users to adjust the level of detail and texture in the generated artwork, offering a means to fine-tune the visual output for more precise artistic control.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output latent representation of the sampled artwork, reflecting the combined effects of all input parameters.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class KSamplerAdvancedWithSharpness(KSamplerAdvanced):
    @classmethod
    def INPUT_TYPES(cls):
        inputs = KSamplerAdvanced.INPUT_TYPES()
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
