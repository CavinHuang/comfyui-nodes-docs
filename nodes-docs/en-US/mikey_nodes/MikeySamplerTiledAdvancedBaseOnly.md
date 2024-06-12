---
tags:
- Sampling
---

# Mikey Sampler Tiled Advanced Base Only
## Documentation
- Class name: `MikeySamplerTiledAdvancedBaseOnly`
- Category: `Mikey/Sampling`
- Output node: `False`

This node is designed for advanced tiled sampling without the need for smooth steps or a refiner, optimizing the generation process for specific scenarios where these elements are not required.
## Input types
### Required
- **`base_model`**
    - The base_model parameter specifies the primary model used for generating the tiles, serving as the foundation for the sampling process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`samples`**
    - The samples parameter represents the initial latent space inputs that the base model will use to generate the tiles.
    - Comfy dtype: `LATENT`
    - Python dtype: `list`
- **`vae`**
    - The vae parameter indicates the variational autoencoder used in conjunction with the base model to refine the generation of tiles.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`positive_cond_base`**
    - This parameter specifies the positive conditioning to guide the base model towards desired characteristics in the generated tiles.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative_cond_base`**
    - This parameter specifies the negative conditioning to steer the base model away from undesired characteristics in the generated tiles.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`model_name`**
    - The model_name parameter allows for the selection of a specific model configuration from a list of available upscale models, influencing the final output quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - The seed parameter ensures reproducibility of results by initializing the random number generator with a specific value, affecting the sampling outcome.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise_image`**
    - The denoise_image parameter controls the intensity of denoising applied to the image, influencing the clarity and smoothness of the final output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`steps`**
    - The steps parameter defines the number of iterations the model will perform during the sampling process, affecting the detail and quality of the generated tiles.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The cfg parameter adjusts the conditioning factor, allowing for finer control over the generation process by influencing the model's behavior based on the conditioning inputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The sampler_name parameter selects the specific sampling algorithm used during the generation process, impacting the efficiency and characteristics of the sampling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler parameter determines the scheduling algorithm for the sampling process, affecting the progression and variation of the generated tiles.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_by`**
    - The upscale_by parameter determines the factor by which the generated tiles are upscaled, affecting the resolution and detail of the final output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tiler_denoise`**
    - The tiler_denoise parameter adjusts the denoising level specifically for the tiling process, enhancing the visual quality of the tiles before they are stitched together.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`image_optional`**
    - The image_optional parameter allows for the optional inclusion of an initial image, which can be used instead of latent space samples for the generation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
## Output types
- **`output_image`**
    - Comfy dtype: `IMAGE`
    - The output_image is the final generated image after the advanced tiled sampling process, reflecting the combined effects of the input parameters on the generation.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MikeySamplerTiledAdvancedBaseOnly:
    # there is no step skipped, so no smooth steps are required
    # also no refiner for this
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"base_model": ("MODEL",),
                             "samples": ("LATENT",), "vae": ("VAE",),
                             "positive_cond_base": ("CONDITIONING",), "negative_cond_base": ("CONDITIONING",),
                             "model_name": (folder_paths.get_filename_list("upscale_models"), ),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "denoise_image": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                             "steps": ("INT", {"default": 30, "min": 1, "max": 1000}),
                             "cfg": ("FLOAT", {"default": 6.5, "min": 0.0, "max": 1000.0, "step": 0.1}),
                             "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                             "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                             "upscale_by": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 10.0, "step": 0.1}),
                             "tiler_denoise": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.05}),},
                "optional": {"image_optional": ("IMAGE",),}}

    RETURN_TYPES = ('IMAGE', )
    RETURN_NAMES = ('output_image', )
    FUNCTION = 'run'
    CATEGORY = 'Mikey/Sampling'

    def phase_one(self, base_model, samples, positive_cond_base, negative_cond_base,
                    upscale_by, model_name, seed, vae, denoise_image,
                    steps, cfg, sampler_name, scheduler):
            image_scaler = ImageScale()
            vaedecoder = VAEDecode()
            uml = UpscaleModelLoader()
            upscale_model = uml.load_model(model_name)[0]
            iuwm = ImageUpscaleWithModel()
            # step 1 run base model
            start_step = int(steps - (steps * denoise_image))
            #print(f'base model start_step: {start_step}, last_step: {last_step}')
            sample1 = common_ksampler(base_model, seed, steps, cfg, sampler_name, scheduler, positive_cond_base, negative_cond_base, samples,
                                    start_step=start_step, last_step=steps, force_full_denoise=False)[0]
            # step 3 upscale image using a simple AI image upscaler
            pixels = vaedecoder.decode(vae, sample1)[0]
            org_width, org_height = pixels.shape[2], pixels.shape[1]
            img = iuwm.upscale(upscale_model, image=pixels)[0]
            upscaled_width, upscaled_height = int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8)
            img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
            return img, upscaled_width, upscaled_height

    def upscale_image(self, samples, vae,
                    upscale_by, model_name):
            image_scaler = ImageScale()
            vaedecoder = VAEDecode()
            uml = UpscaleModelLoader()
            upscale_model = uml.load_model(model_name)[0]
            iuwm = ImageUpscaleWithModel()
            # step 3 upscale image using a simple AI image upscaler
            pixels = vaedecoder.decode(vae, samples)[0]
            org_width, org_height = pixels.shape[2], pixels.shape[1]
            img = iuwm.upscale(upscale_model, image=pixels)[0]
            upscaled_width, upscaled_height = int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8)
            img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
            return img, upscaled_width, upscaled_height

    def run(self, seed, base_model, vae, samples, positive_cond_base, negative_cond_base,
            model_name, upscale_by=2.0, tiler_denoise=0.4,
            upscale_method='normal', denoise_image=1.0, steps=30, cfg=6.5,
            sampler_name='dpmpp_sde_gpu', scheduler='karras', image_optional=None):
        # if image not none replace samples with decoded image
        if image_optional is not None:
            vaeencoder = VAEEncode()
            samples = vaeencoder.encode(vae, image_optional)[0]
        if denoise_image > 0:
            # phase 1: run base, refiner, then upscaler model
            img, upscaled_width, upscaled_height = self.phase_one(base_model, samples, positive_cond_base, negative_cond_base,
                                                                upscale_by, model_name, seed, vae, denoise_image,
                                                                steps, cfg, sampler_name, scheduler)
            img = tensor2pil(img)
        else:
            img = self.upscale_image(samples, vae, upscale_by, model_name)
            img = tensor2pil(img)
        # phase 2: run tiler
        tiled_image = run_tiler_for_steps(img, base_model, vae, seed, cfg, sampler_name, scheduler, positive_cond_base, negative_cond_base, steps, tiler_denoise)
        return (tiled_image, )

```
