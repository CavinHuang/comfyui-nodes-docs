---
tags:
- Sampling
---

# PreSampling (Cascade)
## Documentation
- Class name: `easy preSamplingCascade`
- Category: `EasyUse/PreSampling`
- Output node: `True`

The node 'easy preSamplingCascade' is designed to perform a pre-sampling process specifically tailored for cascade models. It integrates advanced sampling techniques to prepare the model for generating outputs, optimizing the sampling process by adjusting parameters and conditions based on the cascade model's requirements.
## Input types
### Required
- **`pipe`**
    - Provides the pipeline configuration for the pre-sampling process, serving as the foundation for further adjustments and sampling.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`encode_vae_name`**
    - Specifies the VAE model used for encoding in the pre-sampling process, allowing for customization of the encoding step.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`decode_vae_name`**
    - Determines the VAE model used for decoding, enabling tailored decoding strategies in the pre-sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps`**
    - Specifies the number of steps for the pre-sampling process, influencing the granularity and quality of the generated output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning factor, adjusting the influence of the conditioning on the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler to be used, from a predefined list of samplers suitable for cascade models.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduling algorithm for the sampling process, affecting the progression of steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Adjusts the denoising level applied during the pre-sampling process, affecting the clarity and detail of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - Sets the initial seed for the sampling process, ensuring reproducibility of the results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image_to_latent_c`**
    - Optional input for providing an image to be converted to a latent representation, facilitating specific image-based adjustments.
    - Comfy dtype: `IMAGE`
    - Python dtype: `optional[torch.Tensor]`
- **`latent_c`**
    - Optional input for providing a latent representation directly, bypassing the need for initial image encoding.
    - Comfy dtype: `LATENT`
    - Python dtype: `optional[torch.Tensor]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs the configured pipeline, ready for further processing or generation tasks.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class cascadeSettings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
            {"pipe": ("PIPE_LINE",),
             "encode_vae_name": (["None"] + folder_paths.get_filename_list("vae"),),
             "decode_vae_name": (["None"] + folder_paths.get_filename_list("vae"),),
             "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
             "cfg": ("FLOAT", {"default": 4.0, "min": 0.0, "max": 100.0}),
             "sampler_name": (comfy.samplers.KSampler.SAMPLERS, {"default":"euler_ancestral"}),
             "scheduler": (comfy.samplers.KSampler.SCHEDULERS, {"default":"simple"}),
             "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
             "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
             },
            "optional": {
                "image_to_latent_c": ("IMAGE",),
                "latent_c": ("LATENT",),
            },
            "hidden":{"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("pipe",)
    OUTPUT_NODE = True

    FUNCTION = "settings"
    CATEGORY = "EasyUse/PreSampling"

    def settings(self, pipe, encode_vae_name, decode_vae_name, steps, cfg, sampler_name, scheduler, denoise, seed, model=None, image_to_latent_c=None, latent_c=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        images, samples_c = None, None
        samples = pipe['samples']
        batch_size = pipe["loader_settings"]["batch_size"] if "batch_size" in pipe["loader_settings"] else 1

        encode_vae_name = encode_vae_name if encode_vae_name is not None else pipe['loader_settings']['encode_vae_name']
        decode_vae_name = decode_vae_name if decode_vae_name is not None else pipe['loader_settings']['decode_vae_name']

        if image_to_latent_c is not None:
            if encode_vae_name != 'None':
                encode_vae = easyCache.load_vae(encode_vae_name)
            else:
                encode_vae = pipe['vae'][0]
            if "compression" not in pipe["loader_settings"]:
                raise Exception("compression is not found")
            compression = pipe["loader_settings"]['compression']
            width = image_to_latent_c.shape[-2]
            height = image_to_latent_c.shape[-3]
            out_width = (width // compression) * encode_vae.downscale_ratio
            out_height = (height // compression) * encode_vae.downscale_ratio

            s = comfy.utils.common_upscale(image_to_latent_c.movedim(-1, 1), out_width, out_height, "bicubic",
                                           "center").movedim(1,
                                                             -1)
            c_latent = encode_vae.encode(s[:, :, :, :3])
            b_latent = torch.zeros([c_latent.shape[0], 4, height // 4, width // 4])

            samples_c = {"samples": c_latent}
            samples_c = RepeatLatentBatch().repeat(samples_c, batch_size)[0]

            samples_b = {"samples": b_latent}
            samples_b = RepeatLatentBatch().repeat(samples_b, batch_size)[0]
            samples = (samples_c, samples_b)
            images = image_to_latent_c
        elif latent_c is not None:
            samples_c = latent_c
            samples = (samples_c, samples[1])
            images = pipe["images"]
        if samples_c is not None:
            samples = (samples_c, samples[1])

        new_pipe = {
            "model": pipe['model'],
            "positive": pipe['positive'],
            "negative": pipe['negative'],
            "vae": pipe['vae'],
            "clip": pipe['clip'],

            "samples": samples,
            "images": images,
            "seed": seed,

            "loader_settings": {
                **pipe["loader_settings"],
                "encode_vae_name": encode_vae_name,
                "decode_vae_name": decode_vae_name,
                "steps": steps,
                "cfg": cfg,
                "sampler_name": sampler_name,
                "scheduler": scheduler,
                "denoise": denoise,
                "add_noise": "enabled"
            }
        }

        sampler.update_value_by_id("pipe_line", my_unique_id, new_pipe)

        del pipe

        return {"ui": {"value": [seed]}, "result": (new_pipe,)}

```
