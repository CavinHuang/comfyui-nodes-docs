---
tags:
- Sampling
---

# Mikey Sampler Tiled Advanced
## Documentation
- Class name: `MikeySamplerTiledAdvanced`
- Category: `Mikey/Sampling`
- Output node: `False`

The MikeySamplerTiledAdvanced node is designed for advanced sampling in a tiled manner, optimizing the generation process by handling complex patterns and structures efficiently. It extends the capabilities of basic sampling methods by incorporating advanced techniques to improve the quality and coherence of the generated tiles.
## Input types
### Required
- **`base_model`**
    - The 'base_model' parameter specifies the foundational model used for generating the initial set of tiles. It is crucial for defining the starting point of the generation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`refiner_model`**
    - The 'refiner_model' parameter indicates the model used to refine the initially generated tiles, enhancing their quality and coherence. It plays a key role in the advanced sampling process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`samples`**
    - The 'samples' parameter represents the latent representations to be used as input for tile generation. It is essential for the node's ability to produce diverse and complex tile patterns.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The 'vae' parameter specifies the variational autoencoder used in the process, crucial for encoding and decoding the latent representations.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`positive_cond_base`**
    - The 'positive_cond_base' parameter specifies the positive conditioning for the base model, influencing the generation of initial tiles.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`negative_cond_base`**
    - The 'negative_cond_base' parameter specifies the negative conditioning for the base model, influencing the generation of initial tiles.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`positive_cond_refiner`**
    - The 'positive_cond_refiner' parameter specifies the positive conditioning for the refiner model, enhancing the refinement process of the tiles.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`negative_cond_refiner`**
    - The 'negative_cond_refiner' parameter specifies the negative conditioning for the refiner model, enhancing the refinement process of the tiles.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `torch.Tensor`
- **`model_name`**
    - The 'model_name' parameter specifies the name of the model used for upscaling, crucial for selecting the appropriate model for the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - The 'seed' parameter ensures the reproducibility of the generation process. By setting a specific seed value, users can achieve consistent results across multiple runs, facilitating comparisons and iterations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise_image`**
    - The 'denoise_image' parameter controls the level of denoising applied to the image, affecting the clarity and quality of the generated tiles.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`steps`**
    - The 'steps' parameter determines the number of steps in the generation process, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`smooth_step`**
    - The 'smooth_step' parameter controls the smoothness of the transition between steps, affecting the coherence of the generated tiles.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The 'cfg' parameter specifies the configuration for the generation process, affecting the style and characteristics of the generated tiles.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The 'sampler_name' parameter specifies the sampling method used, affecting the diversity and quality of the generated tiles.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The 'scheduler' parameter specifies the scheduling method used, affecting the efficiency and quality of the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_by`**
    - The 'upscale_by' parameter controls the upscaling factor, affecting the resolution and detail of the final image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tiler_denoise`**
    - The 'tiler_denoise' parameter controls the level of denoising applied by the tiler, affecting the clarity and quality of the tiled image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tiler_model`**
    - The 'tiler_model' parameter specifies which model ('base' or 'refiner') is used by the tiler, affecting the refinement process of the tiles.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_complexity_score`**
    - The 'use_complexity_score' parameter indicates whether a complexity score is used to adjust the start step, affecting the detail and quality of the generated tiles.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
### Optional
- **`image_optional`**
    - The 'image_optional' parameter allows for an optional image input that, if provided, replaces the 'samples' input, offering flexibility in the generation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`tiled_image`**
    - Comfy dtype: `IMAGE`
    - The 'tiled_image' output is the result of the initial tiling process, providing a composite image made up of individual tiles.
    - Python dtype: `torch.Tensor`
- **`upscaled_image`**
    - Comfy dtype: `IMAGE`
    - The 'upscaled_image' output is the result of the refinement and upscaling process, delivering a high-resolution image composed of the refined tiles.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MikeySamplerTiledAdvanced:
    @classmethod
    def INPUT_TYPES(s):

        return {"required": {"base_model": ("MODEL",),
                             "refiner_model": ("MODEL",),
                             "samples": ("LATENT",), "vae": ("VAE",),
                             "positive_cond_base": ("CONDITIONING",), "negative_cond_base": ("CONDITIONING",),
                             "positive_cond_refiner": ("CONDITIONING",), "negative_cond_refiner": ("CONDITIONING",),
                             "model_name": (folder_paths.get_filename_list("upscale_models"), ),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "denoise_image": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                             "steps": ("INT", {"default": 30, "min": 1, "max": 1000}),
                             "smooth_step": ("INT", {"default": 1, "min": -1, "max": 100}),
                             "cfg": ("FLOAT", {"default": 6.5, "min": 0.0, "max": 1000.0, "step": 0.1}),
                             "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                             "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                             "upscale_by": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 10.0, "step": 0.1}),
                             "tiler_denoise": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.05}),
                             "tiler_model": (["base", "refiner"], {"default": "base"}),
                             "use_complexity_score": (['true','false'], {"default": 'true'}),},
                "optional": {"image_optional": ("IMAGE",),}}

    RETURN_TYPES = ('IMAGE', 'IMAGE',)
    RETURN_NAMES = ('tiled_image', 'upscaled_image',)
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Sampling'

    #def phase_one(self, base_model, refiner_model, samples, positive_cond_base, negative_cond_base,
    #              positive_cond_refiner, negative_cond_refiner, upscale_by, model_name, seed, vae):
    # updated phase_one
    def phase_one(self, base_model, refiner_model, samples, positive_cond_base, negative_cond_base,
                  positive_cond_refiner, negative_cond_refiner, upscale_by, model_name, seed, vae, denoise_image,
                  steps, smooth_step, cfg, sampler_name, scheduler):
        image_scaler = ImageScale()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        upscale_model = uml.load_model(model_name)[0]
        iuwm = ImageUpscaleWithModel()
        # step 1 run base model
        start_step = int(steps - (steps * denoise_image))
        if start_step > steps // 2:
            last_step = steps - 1
        else:
            # last step should be 1/2 of steps - 1 step
            if start_step % 2 == 0:
                last_step = steps // 2 - 1
            else:
                last_step = steps // 2
        #print(f'base model start_step: {start_step}, last_step: {last_step}')
        sample1 = common_ksampler(base_model, seed, steps, cfg, sampler_name, scheduler, positive_cond_base, negative_cond_base, samples,
                                  start_step=start_step, last_step=last_step, force_full_denoise=False)[0]
        # step 2 run refiner model
        start_step = last_step + 1
        total_steps = steps + smooth_step
        #print(f'refiner model start_step: {start_step}, last_step: {total_steps}')
        sample2 = common_ksampler(refiner_model, seed, total_steps, cfg, sampler_name, scheduler, positive_cond_refiner, negative_cond_refiner, sample1,
                                  disable_noise=True, start_step=start_step, force_full_denoise=True)[0]
        # step 3 upscale image using a simple AI image upscaler
        pixels = vaedecoder.decode(vae, sample2)[0]
        org_width, org_height = pixels.shape[2], pixels.shape[1]
        img = iuwm.upscale(upscale_model, image=pixels)[0]
        upscaled_width, upscaled_height = int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8)
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        return img, upscaled_width, upscaled_height

    #def run(self, seed, base_model, refiner_model, vae, samples, positive_cond_base, negative_cond_base,
    #        positive_cond_refiner, negative_cond_refiner, model_name, upscale_by=1.0, tiler_denoise=0.25,
    #        upscale_method='normal', tiler_model='base'):
    # updated run
    def run(self, seed, base_model, refiner_model, vae, samples, positive_cond_base, negative_cond_base,
            positive_cond_refiner, negative_cond_refiner, model_name, upscale_by=1.0, tiler_denoise=0.25,
            upscale_method='normal', tiler_model='base', denoise_image=0.25, steps=30, smooth_step=0, cfg=6.5,
            sampler_name='dpmpp_3m_sde_gpu', scheduler='exponential', use_complexity_score='true', image_optional=None):
        # if image not none replace samples with decoded image
        if image_optional is not None:
            vaeencoder = VAEEncode()
            samples = vaeencoder.encode(vae, image_optional)[0]
        # phase 1: run base, refiner, then upscaler model
        img, upscaled_width, upscaled_height = self.phase_one(base_model, refiner_model, samples, positive_cond_base, negative_cond_base,
                                                              positive_cond_refiner, negative_cond_refiner, upscale_by, model_name, seed, vae, denoise_image,
                                                              steps, smooth_step, cfg, sampler_name, scheduler)
        # phase 2: run tiler
        img = tensor2pil(img)
        if tiler_model == 'base':
            tiled_image = run_tiler(img, base_model, vae, seed, positive_cond_base, negative_cond_base, tiler_denoise, use_complexity_score)
        else:
            tiled_image = run_tiler(img, refiner_model, vae, seed, positive_cond_refiner, negative_cond_refiner, tiler_denoise, use_complexity_score)
        return (tiled_image, img)

```
