---
tags:
- Sampling
---

# KSampler Efficient Fooocus
## Documentation
- Class name: `Fooocus_KSamplerEfficient`
- Category: `Art Venture/Sampling`
- Output node: `True`

The Fooocus_KSamplerEfficient node enhances the sampling process in art generation by incorporating a sharpness parameter, allowing for more precise control over the texture and detail level of generated images. This node builds upon the foundational sampling capabilities to offer an advanced, efficiency-focused approach to art creation.
## Input types
### Required
- **`model`**
    - Specifies the model used for the sampling process, integral to determining the art generation's foundational style and characteristics.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`seed`**
    - The seed parameter ensures reproducibility in the art generation process by initializing the random number generator to a specific state.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps in the sampling process, affecting the detail and quality of the generated art.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configures the conditioning factor for the sampling process, influencing the generation's creativity and coherence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Identifies the specific sampler algorithm to be used, affecting the texture and detail of the generated art.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler for controlling the sampling process, impacting the progression and quality of art generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Defines positive conditioning to guide the art generation towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Sets negative conditioning to avoid certain attributes in the generated art.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - Provides the initial latent image to be transformed by the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `object`
- **`denoise`**
    - Adjusts the level of denoising applied to the generated art, affecting clarity and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`preview_method`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`vae_decode`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
### Optional
- **`optional_vae`**
    - unknown
    - Comfy dtype: `VAE`
    - Python dtype: `unknown`
- **`script`**
    - unknown
    - Comfy dtype: `SCRIPT`
    - Python dtype: `unknown`
- **`sharpness`**
    - The sharpness parameter allows users to adjust the level of detail and texture in the generated art, providing a means to fine-tune the visual output for more precise artistic control.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - unknown
    - Python dtype: `unknown`
- **`CONDITIONING+`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`CONDITIONING-`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The output latent image represents the final generated art, encapsulating the visual characteristics specified through the input parameters.
    - Python dtype: `object`
- **`VAE`**
    - Comfy dtype: `VAE`
    - unknown
    - Python dtype: `unknown`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class KSamplerEfficientWithSharpness(TSC_KSampler):
        @classmethod
        def INPUT_TYPES(cls):
            inputs = TSC_KSampler.INPUT_TYPES()
            inputs["optional"]["sharpness"] = (
                "FLOAT",
                {"default": 2.0, "min": 0.0, "max": 100.0, "step": 0.01},
            )

            return inputs

        CATEGORY = "Art Venture/Sampling"

        def sample(self, *args, sharpness=2.0, **kwargs):
            patch.sharpness = sharpness
            patch.patch_all()
            results = super().sample(*args, **kwargs)
            patch.unpatch_all()
            return results

```
