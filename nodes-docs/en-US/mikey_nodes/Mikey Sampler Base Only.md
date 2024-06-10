---
tags:
- Sampling
---

# Mikey Sampler Base Only
## Documentation
- Class name: `Mikey Sampler Base Only`
- Category: `Mikey/Sampling`
- Output node: `False`

The Mikey Sampler Base Only node is designed for basic sampling operations within a specific framework, focusing on generating samples from a given input without the advanced features found in other variants. It serves as a foundational element for more complex sampling processes, providing a streamlined and efficient approach to sample generation.
## Input types
### Required
- **`base_model`**
    - The 'base_model' parameter specifies the model used for the sampling process, serving as the foundation for generating samples. It is crucial for defining the behavior and capabilities of the sampling operation.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`samples`**
    - The 'samples' parameter represents the initial set of samples or data points that the sampling process will use or modify. It is essential for starting the sampling operation with a predefined set of conditions or states.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`positive_cond_base`**
    - Specifies the positive conditioning to guide the sampling towards desired attributes or features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative_cond_base`**
    - Specifies the negative conditioning to steer the sampling away from undesired attributes or features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`vae`**
    - The VAE (Variational Autoencoder) used in the sampling process for generating or refining samples.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`model_name`**
    - The name of the model used for upscaling the generated samples, enhancing their resolution or quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - The 'seed' parameter ensures the reproducibility of the sampling process by initializing the random number generator with a specific value. This allows for consistent results across multiple runs, making it essential for experiments and comparisons.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`upscale_by`**
    - The factor by which the samples are upscaled, improving their resolution or detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hires_strength`**
    - Determines the strength of high-resolution features in the upscaled samples, affecting their clarity and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`smooth_step`**
    - Controls the smoothness of the transition between steps in the sampling process, affecting the gradual evolution of samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output is a latent representation generated based on the input parameters, including the base model, samples, and seed. This latent representation captures the essence of the input in a form suitable for further processing or generation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MikeySamplerBaseOnly:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"base_model": ("MODEL",), "samples": ("LATENT",),
                             "positive_cond_base": ("CONDITIONING",), "negative_cond_base": ("CONDITIONING",),
                             "vae": ("VAE",),
                             "model_name": (folder_paths.get_filename_list("upscale_models"), ),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "upscale_by": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.1}),
                             "hires_strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.1}),
                             'smooth_step': ("INT", {"default": 0, "min": -1, "max": 100})}}

    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Sampling'

    def adjust_start_step(self, image_complexity, hires_strength=1.0):
        image_complexity /= 24
        if image_complexity > 1:
            image_complexity = 1
        image_complexity = min([0.55, image_complexity]) * hires_strength
        return min([31, 31 - int(round(image_complexity * 31,0))])

    def run(self, seed, base_model, vae, samples, positive_cond_base, negative_cond_base,
            model_name, upscale_by=1.0, hires_strength=1.0, upscale_method='normal', smooth_step=0):
        image_scaler = ImageScale()
        vaeencoder = VAEEncode()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        upscale_model = uml.load_model(model_name)[0]
        iuwm = ImageUpscaleWithModel()
        # common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent, denoise=1.0,
        # disable_noise=False, start_step=None, last_step=None, force_full_denoise=False)
        # step 1 run base model low cfg
        sample1 = common_ksampler(base_model, seed, 30, 5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, samples,
                                  start_step=0, last_step=14, force_full_denoise=False)[0]
        # step 2 run base model high cfg
        sample2 = common_ksampler(base_model, seed+1, 31 + smooth_step, 9.5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, sample1,
                                  disable_noise=True, start_step=15, force_full_denoise=True)
        if upscale_by == 0:
            return sample2
        else:
            sample2 = sample2[0]
        # step 3 upscale
        pixels = vaedecoder.decode(vae, sample2)[0]
        org_width, org_height = pixels.shape[2], pixels.shape[1]
        img = iuwm.upscale(upscale_model, image=pixels)[0]
        upscaled_width, upscaled_height = int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8)
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        if hires_strength == 0:
            return (vaeencoder.encode(vae, img)[0],)
        # Adjust start_step based on complexity
        image_complexity = calculate_image_complexity(img)
        #print('Image Complexity:', image_complexity)
        start_step = self.adjust_start_step(image_complexity, hires_strength)
        # encode image
        latent = vaeencoder.encode(vae, img)[0]
        # step 3 run base model
        out = common_ksampler(base_model, seed, 31, 9.5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, latent,
                                start_step=start_step, force_full_denoise=True)
        return out

```
