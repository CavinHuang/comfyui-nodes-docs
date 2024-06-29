---
tags:
- Sampling
---

# KSampler Adv. Efficient Fooocus
## Documentation
- Class name: `Fooocus_KSamplerEfficientAdvanced`
- Category: `Art Venture/Sampling`
- Output node: `True`

This node enhances the sampling process with an added sharpness parameter, tailored for efficient advanced sampling in art creation. It leverages the underlying advanced KSampler's capabilities, integrating sharpness adjustments to refine the sampling output, aiming for higher precision and detail in generated art.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for sampling, serving as the foundation for generating art.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`seed`**
    - Determines the random seed for sampling, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the sampling process, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning factor, influencing the guidance and coherence of the generated art.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler algorithm to use, impacting the texture and characteristics of the generated art.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the sampling process, affecting the progression and variation of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Sets the positive conditioning to guide the sampling towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Sets the negative conditioning to steer the sampling away from undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - Provides an initial latent image to start the sampling from, offering a basis for further modifications.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`denoise`**
    - Adjusts the level of denoising applied to the sampling output, refining the clarity and sharpness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`preview_method`**
    - Specifies the method for previewing the sampling results, enhancing the user's ability to assess and adjust the process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_decode`**
    - Determines whether to decode the latent representation using a VAE model, affecting the final image quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
### Optional
- **`optional_vae`**
    - Optionally specifies a VAE model to be used for decoding, providing flexibility in the choice of model.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`script`**
    - Allows for the execution of custom scripts during the sampling process, offering extended customization and control.
    - Comfy dtype: `SCRIPT`
    - Python dtype: `str`
- **`sharpness`**
    - The sharpness parameter allows for fine-tuning the sharpness level of the sampling output, enhancing detail and clarity in the generated art. It plays a crucial role in achieving the desired level of detail and texture in the artwork.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The model used for the sampling process, encapsulating the computational framework.
    - Python dtype: `str`
- **`CONDITIONING+`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning applied during sampling, guiding the generation towards desired attributes.
    - Python dtype: `str`
- **`CONDITIONING-`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning applied during sampling, steering the generation away from undesired attributes.
    - Python dtype: `str`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The final latent representation of the sampled art, encapsulating the visual content and style.
    - Python dtype: `str`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The VAE model used for decoding the latent representation, if applicable, influencing the final image quality.
    - Python dtype: `str`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The final image output of the sampling process, representing the generated art.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class KSamplerEfficientAdvancedWithSharpness(TSC_KSamplerAdvanced):
        @classmethod
        def INPUT_TYPES(cls):
            inputs = TSC_KSampler.INPUT_TYPES()
            inputs["optional"]["sharpness"] = (
                "FLOAT",
                {"default": 2.0, "min": 0.0, "max": 100.0, "step": 0.01},
            )

            return inputs

        CATEGORY = "Art Venture/Sampling"

        def sampleadv(self, *args, sharpness=2.0, **kwargs):
            patch.sharpness = sharpness
            patch.patch_all()
            results = super().sampleadv(*args, **kwargs)
            patch.unpatch_all()
            return results

```
