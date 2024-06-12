---
tags:
- Sampling
---

# Mikey Sampler Base Only Advanced
## Documentation
- Class name: `Mikey Sampler Base Only Advanced`
- Category: `Mikey/Sampling`
- Output node: `False`

The MikeySamplerBaseOnlyAdvanced node is designed for advanced sampling operations, focusing on providing a base-only approach to sampling tasks. It aims to offer enhanced control and flexibility in generating samples, catering to specific needs without the complexity of additional layers or processes.
## Input types
### Required
- **`base_model`**
    - Specifies the base model used for sampling, serving as the foundation for generating new samples.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`positive_cond_base`**
    - Defines the positive conditioning to guide the sampling process towards desired attributes or content.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative_cond_base`**
    - Specifies the negative conditioning to avoid certain attributes or content in the generated samples.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`samples`**
    - Represents the initial set of samples or latent space from which the sampling process begins.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`vae`**
    - The variational autoencoder used in conjunction with the base model to refine and generate samples.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`add_noise`**
    - Determines whether noise should be added to the sampling process, enhancing diversity or realism in the generated samples.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Controls the level of denoising applied to the samples, affecting the clarity and quality of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`steps`**
    - The number of steps to perform in the sampling process, affecting the detail and quality of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`smooth_step`**
    - Adjusts the smoothness of the sampling steps, potentially enhancing the transition or variation between samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg_i`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`sampler_name`**
    - Specifies the sampler algorithm used, influencing the diversity and quality of the generated samples.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling algorithm for sampling, affecting the progression and variation of samples.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_model`**
    - The model used for upscaling the generated samples, enhancing their resolution or detail.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - A seed value for the random number generator, ensuring reproducibility of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`upscale_by`**
    - Defines the factor by which the samples are upscaled, affecting their final size and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hires_denoise`**
    - Controls the level of denoising applied to high-resolution samples, affecting their clarity and quality.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`hires_steps`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Represents the final generated samples after the sampling process, in a latent form.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)



## Source code
```python
class MikeySamplerBaseOnlyAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        s.image_scaler = ImageScaleBy()
        s.upscale_models = folder_paths.get_filename_list("upscale_models")
        s.all_upscale_models = s.upscale_models + s.image_scaler.upscale_methods
        try:
            default_model = 'lanczos' #'4x-UltraSharp.pth' if '4x-UltraSharp.pth' in s.upscale_models else s.upscale_models[0]
            um = (s.all_upscale_models, {'default': default_model})
        except:
            um = (folder_paths.get_filename_list("upscale_models"), )
        return {"required": {"base_model": ("MODEL",),
                             "positive_cond_base": ("CONDITIONING",),
                             "negative_cond_base": ("CONDITIONING",),
                             "samples": ("LATENT",),
                             "vae": ("VAE",),
                             "add_noise": (["enable","disable"], {"default": "enable"}),
                             "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                             "steps": ("INT", {"default": 31, "min": 1, "max": 1000}),
                             'smooth_step': ("INT", {"default": 0, "min": -1, "max": 100}),
                             "cfg_1": ("FLOAT", {"default": 5.0, "min": 0.1, "max": 100.0, "step": 0.1}),
                             "cfg_2": ("FLOAT", {"default": 9.5, "min": 0.1, "max": 100.0, "step": 0.1}),
                             "sampler_name": (comfy.samplers.KSampler.SAMPLERS, {'default': 'dpmpp_3m_sde_gpu'}),
                             "scheduler": (comfy.samplers.KSampler.SCHEDULERS, {'default': 'exponential'}),
                             "upscale_model": um,
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "upscale_by": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.1}),
                             "hires_denoise": ("FLOAT", {"default": 0.4, "min": 0.0, "max": 1.0, "step": 0.01}),
                             "hires_steps": ("INT", {"default": 31, "min": 1, "max": 1000}),
                             }}

    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Sampling'

    def run(self, seed, base_model, positive_cond_base, negative_cond_base,
            samples, vae, add_noise, denoise, steps, cfg_1, cfg_2, sampler_name,
            scheduler, upscale_model, upscale_by, hires_denoise, hires_steps, smooth_step):
        image_scaler = ImageScale()
        vaeencoder = VAEEncode()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        if upscale_model in image_scaler.upscale_methods:
            upscale_model = upscale_model
        else:
            upscale_model = uml.load_model(upscale_model)[0]
        iuwm = ImageUpscaleWithModel()
        # step 1 run base model low cfg
        start_step = int(steps - (steps * denoise))
        if start_step > steps // 2:
            last_step = steps - 1
        else:
            if start_step % 2 == 0:
                last_step = steps // 2 - 1
            else:
                last_step = steps // 2
        #print(f'base model start_step: {start_step}, last_step: {last_step}')
        sample1 = common_ksampler(base_model, seed, steps, cfg_1, sampler_name, scheduler,
                                  positive_cond_base, negative_cond_base, samples,
                                  start_step=start_step, last_step=last_step, force_full_denoise=False)[0]
        # step 2 run base model high cfg
        start_step = last_step + 1
        total_steps = steps + smooth_step
        sample2 = common_ksampler(base_model, seed+1, total_steps, cfg_2, sampler_name, scheduler,
                                  positive_cond_base, negative_cond_base, sample1,
                                  disable_noise=True, start_step=start_step, force_full_denoise=True)
        if upscale_by == 0:
            return sample2
        else:
            sample2 = sample2[0]
        # step 3 upscale
        pixels = vaedecoder.decode(vae, sample2)[0]
        org_width, org_height = pixels.shape[2], pixels.shape[1]
        if isinstance(upscale_model, str):
            img = self.image_scaler.upscale(pixels, upscale_model, upscale_by)[0]
        else:
            img = iuwm.upscale(upscale_model, image=pixels)[0]
        upscaled_width, upscaled_height = int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8)
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        if hires_denoise == 0:
            return (vaeencoder.encode(vae, img)[0],)
        # encode image
        latent = vaeencoder.encode(vae, img)[0]
        # step 3 run base model
        start_step = int(hires_steps - (hires_steps * hires_denoise))
        out = common_ksampler(base_model, seed, hires_steps, cfg_2, sampler_name, scheduler,
                              positive_cond_base, negative_cond_base, latent,
                              start_step=start_step, force_full_denoise=True)
        return out

```
