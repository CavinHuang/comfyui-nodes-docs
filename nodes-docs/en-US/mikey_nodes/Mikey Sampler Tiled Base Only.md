---
tags:
- Sampling
---

# Mikey Sampler Tiled Base Only
## Documentation
- Class name: `Mikey Sampler Tiled Base Only`
- Category: `Mikey/Sampling`
- Output node: `False`

This node specializes in generating tiled samples based solely on base conditions, optimizing for scenarios where a straightforward, tile-based approach is preferred. It leverages the underlying MikeySamplerTiled framework to efficiently produce these samples, focusing on simplicity and direct application without the need for advanced refinements or smooth transitions.
## Input types
### Required
- **`base_model`**
    - The base_model parameter specifies the underlying model used for generating the tiled samples. It is crucial for defining the foundational architecture and capabilities that the sampling process will utilize.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`samples`**
    - The samples parameter represents the initial latent space inputs that the node will use to generate the tiled samples. It plays a key role in shaping the starting point of the generation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`positive_cond_base`**
    - This parameter provides the positive conditioning for the base model, influencing the generation towards desired attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative_cond_base`**
    - The negative_cond_base parameter offers a way to specify attributes or themes to avoid in the generation process, providing a counterbalance to the positive conditioning.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`vae`**
    - The vae parameter indicates the variational autoencoder used in conjunction with the base model to refine and adjust the generated samples.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`model_name`**
    - model_name allows for the selection of a specific model configuration or variant from a predefined list, tailoring the generation process to specific requirements or preferences.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - The seed parameter ensures the reproducibility of the generated samples. By providing a specific seed value, users can achieve consistent results across multiple runs, facilitating comparisons and iterative improvements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`upscale_by`**
    - upscale_by determines the scaling factor applied to the generated samples, affecting their resolution and detail level.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tiler_denoise`**
    - This parameter controls the denoising level applied to the tiled samples, influencing the clarity and quality of the final output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image or a set of images representing the generated tiled samples, visually encapsulating the content specified by the input parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MikeySamplerTiledBaseOnly(MikeySamplerTiled):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"base_model": ("MODEL",), "samples": ("LATENT",),
                             "positive_cond_base": ("CONDITIONING",), "negative_cond_base": ("CONDITIONING",),
                             "vae": ("VAE",),
                             "model_name": (folder_paths.get_filename_list("upscale_models"), ),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "upscale_by": ("FLOAT", {"default": 1.0, "min": 0.1, "max": 10.0, "step": 0.1}),
                             "tiler_denoise": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.05}),}}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)

    def phase_one(self, base_model, samples, positive_cond_base, negative_cond_base,
                  upscale_by, model_name, seed, vae):
        image_scaler = ImageScale()
        vaedecoder = VAEDecode()
        uml = UpscaleModelLoader()
        upscale_model = uml.load_model(model_name)[0]
        iuwm = ImageUpscaleWithModel()
        # step 1 run base model low cfg
        sample1 = common_ksampler(base_model, seed, 30, 5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, samples,
                                  start_step=0, last_step=14, force_full_denoise=False)[0]
        # step 2 run base model high cfg
        sample2 = common_ksampler(base_model, seed+1, 32, 9.5, 'dpmpp_3m_sde_gpu', 'exponential', positive_cond_base, negative_cond_base, sample1,
                                  disable_noise=True, start_step=15, force_full_denoise=True)[0]
        # step 3 upscale image using a simple AI image upscaler
        pixels = vaedecoder.decode(vae, sample2)[0]
        org_width, org_height = pixels.shape[2], pixels.shape[1]
        img = iuwm.upscale(upscale_model, image=pixels)[0]
        upscaled_width, upscaled_height = int(org_width * upscale_by // 8 * 8), int(org_height * upscale_by // 8 * 8)
        img = image_scaler.upscale(img, 'nearest-exact', upscaled_width, upscaled_height, 'center')[0]
        return img, upscaled_width, upscaled_height

    def adjust_start_step(self, image_complexity, hires_strength=1.0):
        image_complexity /= 24
        if image_complexity > 1:
            image_complexity = 1
        image_complexity = min([0.55, image_complexity]) * hires_strength
        return min([32, 32 - int(round(image_complexity * 32,0))])

    def run(self, seed, base_model, vae, samples, positive_cond_base, negative_cond_base,
            model_name, upscale_by=1.0, tiler_denoise=0.25,
            upscale_method='normal'):
        # phase 1: run base, refiner, then upscaler model
        img, upscaled_width, upscaled_height = self.phase_one(base_model, samples, positive_cond_base, negative_cond_base,
                                                              upscale_by, model_name, seed, vae)
        #print('img shape: ', img.shape)
        # phase 2: run tiler
        img = tensor2pil(img)
        tiled_image = run_tiler(img, base_model, vae, seed, positive_cond_base, negative_cond_base, tiler_denoise)
        #final_image = pil2tensor(tiled_image)
        return (tiled_image,)

```
