---
tags:
- Sampling
---

# EasyCascadeKsampler (Full)
## Documentation
- Class name: `easy fullCascadeKSampler`
- Category: `EasyUse/Sampler`
- Output node: `True`

The `easy fullCascadeKSampler` node is designed to facilitate complex sampling processes by employing a full cascade approach. This method enhances the generation of images or patterns by systematically applying a series of samplers, each building upon the output of the previous one, to achieve refined and high-quality results.
## Input types
### Required
- **`pipe`**
    - The `pipe` parameter represents the pipeline through which data flows, serving as the conduit for input and output data during the sampling process. It is crucial for orchestrating the sequence of operations and ensuring that the data is appropriately processed at each stage.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`encode_vae_name`**
    - Specifies the name of the VAE encoder to be used in the sampling process, allowing for customization of the encoding phase.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`decode_vae_name`**
    - Specifies the name of the VAE decoder to be used in the sampling process, enabling customization of the decoding phase.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps`**
    - Defines the number of steps to be taken in the sampling process, affecting the detail and quality of the generated output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The conditioning factor, guiding the sampling process in generating outputs that align with specified attributes or characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampler to be used, providing flexibility in choosing the sampling strategy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler to be used in the sampling process, affecting the progression of sampling steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - The denoising factor applied during the sampling process, affecting the clarity and quality of the generated output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`image_output`**
    - Determines how the output image is handled, whether it is displayed, saved, or both.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`link_id`**
    - A unique identifier for the link in the sampling process, facilitating tracking and management of the generated output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`save_prefix`**
    - The prefix for saved files, allowing for organized storage of generated outputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - The seed value for the random number generator, ensuring reproducibility of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image_to_latent_c`**
    - Optional parameter for providing an image to be converted into a latent representation, enhancing the control over the generation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[Image]`
- **`latent_c`**
    - Optional parameter for providing a latent representation directly, offering an advanced level of control over the generation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Optional[LatentRepresentation]`
- **`model_c`**
    - Optional parameter for specifying a custom model to be used in the sampling process, providing flexibility in adapting the node to various generation tasks.
    - Comfy dtype: `MODEL`
    - Python dtype: `Optional[Model]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The output `pipe` carries the final generated data, having passed through the full cascade of samplers, embodying the refined and high-quality results of the complex sampling process.
    - Python dtype: `dict`
- **`model_b`**
    - Comfy dtype: `MODEL`
    - The model used in the final step of the sampling process, potentially modified or selected based on the sampling strategy.
    - Python dtype: `Model`
- **`latent_b`**
    - Comfy dtype: `LATENT`
    - The latent space representation of the generated data from the final step of the sampling process, offering insights into the underlying structure and characteristics of the output.
    - Python dtype: `LatentRepresentation`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class samplerCascadeFull:

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
                     "image_output": (["Hide", "Preview", "Save", "Hide&Save", "Sender", "Sender&Save"],),
                     "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                     "save_prefix": ("STRING", {"default": "ComfyUI"}),
                     "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
                 },

                "optional": {
                    "image_to_latent_c": ("IMAGE",),
                    "latent_c": ("LATENT",),
                    "model_c": ("MODEL",),
                },
                 "hidden":{"tile_size": "INT", "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                    "embeddingsList": (folder_paths.get_filename_list("embeddings"),)
                  }
                }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "LATENT")
    RETURN_NAMES = ("pipe", "model_b", "latent_b")
    OUTPUT_NODE = True

    FUNCTION = "run"
    CATEGORY = "EasyUse/Sampler"

    def run(self, pipe, encode_vae_name, decode_vae_name, steps, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, seed, image_to_latent_c=None, latent_c=None, model_c=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):

        encode_vae_name = encode_vae_name if encode_vae_name is not None else pipe['loader_settings']['encode_vae_name']
        decode_vae_name = decode_vae_name if decode_vae_name is not None else pipe['loader_settings']['decode_vae_name']

        batch_size = pipe["loader_settings"]["batch_size"] if "batch_size" in pipe["loader_settings"] else 1
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
                                           "center").movedim(1, -1)
            latent_c = encode_vae.encode(s[:, :, :, :3])
            latent_b = torch.zeros([latent_c.shape[0], 4, height // 4, width // 4])

            samples_c = {"samples": latent_c}
            samples_c = RepeatLatentBatch().repeat(samples_c, batch_size)[0]

            samples_b = {"samples": latent_b}
            samples_b = RepeatLatentBatch().repeat(samples_b, batch_size)[0]
            images = image_to_latent_c
        elif latent_c is not None:
            samples_c = latent_c
            samples_b = pipe["samples"][1]
            images = pipe["images"]
        else:
            samples_c = pipe["samples"][0]
            samples_b = pipe["samples"][1]
            images = pipe["images"]

        # Clean loaded_objects
        easyCache.update_loaded_objects(prompt)
        samp_model = model_c if model_c else pipe["model"][0]
        samp_positive = pipe["positive"]
        samp_negative = pipe["negative"]
        samp_samples = samples_c

        samp_seed = seed if seed is not None else pipe['seed']

        steps = steps if steps is not None else pipe['loader_settings']['steps']
        start_step = pipe['loader_settings']['start_step'] if 'start_step' in pipe['loader_settings'] else 0
        last_step = pipe['loader_settings']['last_step'] if 'last_step' in pipe['loader_settings'] else 10000
        cfg = cfg if cfg is not None else pipe['loader_settings']['cfg']
        sampler_name = sampler_name if sampler_name is not None else pipe['loader_settings']['sampler_name']
        scheduler = scheduler if scheduler is not None else pipe['loader_settings']['scheduler']
        denoise = denoise if denoise is not None else pipe['loader_settings']['denoise']
        # 推理初始时间
        start_time = int(time.time() * 1000)
        # 开始推理
        samp_samples = sampler.common_ksampler(samp_model, samp_seed, steps, cfg, sampler_name, scheduler,
                                               samp_positive, samp_negative, samp_samples, denoise=denoise,
                                               preview_latent=False, start_step=start_step,
                                               last_step=last_step, force_full_denoise=False,
                                               disable_noise=False)
        # 推理结束时间
        end_time = int(time.time() * 1000)
        stage_c = samp_samples["samples"]
        results = None

        if image_output not in ['Hide', 'Hide&Save']:
            if decode_vae_name != 'None':
                decode_vae = easyCache.load_vae(decode_vae_name)
            else:
                decode_vae = pipe['vae'][0]
            samp_images = decode_vae.decode(stage_c).cpu()

            results = easySave(samp_images, save_prefix, image_output, prompt, extra_pnginfo)
            sampler.update_value_by_id("results", my_unique_id, results)

        # 推理总耗时（包含解码）
        end_decode_time = int(time.time() * 1000)
        spent_time = 'Diffusion:' + str((end_time - start_time) / 1000) + '″, VAEDecode:' + str(
            (end_decode_time - end_time) / 1000) + '″ '

        # Clean loaded_objects
        easyCache.update_loaded_objects(prompt)
        # zero_out
        c1 = []
        for t in samp_positive:
            d = t[1].copy()
            if "pooled_output" in d:
                d["pooled_output"] = torch.zeros_like(d["pooled_output"])
            n = [torch.zeros_like(t[0]), d]
            c1.append(n)
        # stage_b_conditioning
        c2 = []
        for t in c1:
            d = t[1].copy()
            d['stable_cascade_prior'] = stage_c
            n = [t[0], d]
            c2.append(n)


        new_pipe = {
            "model": pipe['model'][1],
            "positive": c2,
            "negative": c1,
            "vae": pipe['vae'][1],
            "clip": pipe['clip'],

            "samples": samples_b,
            "images": images,
            "seed": seed,

            "loader_settings": {
                **pipe["loader_settings"],
                "spent_time": spent_time
            }
        }
        sampler.update_value_by_id("pipe_line", my_unique_id, new_pipe)

        del pipe

        if image_output in ("Hide", "Hide&Save"):
            return {"ui": {},
                    "result": sampler.get_output(new_pipe, )}

        if image_output in ("Sender", "Sender&Save") and results is not None:
            PromptServer.instance.send_sync("img-send", {"link_id": link_id, "images": results})

        return {"ui": {"images": results}, "result": (new_pipe, new_pipe['model'], new_pipe['samples'])}

```
