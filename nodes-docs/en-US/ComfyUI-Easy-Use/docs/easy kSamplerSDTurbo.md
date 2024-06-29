---
tags:
- SamplerScheduler
- Sampling
---

# EasyKSampler (SDTurbo)
## Documentation
- Class name: `easy kSamplerSDTurbo`
- Category: `EasyUse/Sampler`
- Output node: `True`

The 'samplerSDTurbo' node is designed to facilitate the use of the SDTurbo sampler within a simplified interface, aiming to streamline the sampling process for users by abstracting the complexities involved in configuring and executing the SDTurbo sampling algorithm.
## Input types
### Required
- **`pipe`**
    - The 'pipe' parameter represents the pipeline through which data flows, serving as the conduit for input and output data during the sampling process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`image_output`**
    - The 'image_output' parameter specifies the desired output format for the sampled images, offering options such as preview, save, or both.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`link_id`**
    - The 'link_id' parameter is used for tracking and linking the output within a larger system or workflow.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`save_prefix`**
    - The 'save_prefix' parameter allows users to define a prefix for saved files, facilitating organized storage of output images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`model`**
    - The 'model' parameter, marked as optional, allows for the specification of a model to be used in the sampling process, providing flexibility in choosing the underlying model for generation.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The 'pipe' output represents the processed data pipeline, encapsulating the results of the sampling operation.
    - Python dtype: `dict`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The 'image' output provides the generated image, reflecting the outcome of the sampling process.
    - Python dtype: `object`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class samplerSDTurbo:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"pipe": ("PIPE_LINE",),
                     "image_output": (["Hide", "Preview", "Save", "Hide&Save", "Sender", "Sender&Save"],{"default": "Preview"}),
                     "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                     "save_prefix": ("STRING", {"default": "ComfyUI"}),
                     },
                "optional": {
                    "model": ("MODEL",),
                },
                "hidden":
                    {"tile_size": "INT", "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO",
                     "my_unique_id": "UNIQUE_ID",
                     "embeddingsList": (folder_paths.get_filename_list("embeddings"),)
                     }
                }

    RETURN_TYPES = ("PIPE_LINE", "IMAGE",)
    RETURN_NAMES = ("pipe", "image",)
    OUTPUT_NODE = True
    FUNCTION = "run"

    CATEGORY = "EasyUse/Sampler"

    def run(self, pipe, image_output, link_id, save_prefix, model=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None,):
        # Clean loaded_objects
        easyCache.update_loaded_objects(prompt)

        my_unique_id = int(my_unique_id)

        samp_model = pipe["model"] if model is None else model
        samp_positive = pipe["positive"]
        samp_negative = pipe["negative"]
        samp_samples = pipe["samples"]
        samp_vae = pipe["vae"]
        samp_clip = pipe["clip"]

        samp_seed = pipe['seed']

        samp_sampler = pipe['loader_settings']['sampler']

        sigmas = pipe['loader_settings']['sigmas']
        cfg = pipe['loader_settings']['cfg']
        steps = pipe['loader_settings']['steps']

        disable_noise = False

        preview_latent = True
        if image_output in ("Hide", "Hide&Save"):
            preview_latent = False

        # 推理初始时间
        start_time = int(time.time() * 1000)
        # 开始推理
        samp_samples = sampler.custom_ksampler(samp_model, samp_seed, steps, cfg, samp_sampler, sigmas, samp_positive, samp_negative, samp_samples,
                        disable_noise, preview_latent)
        # 推理结束时间
        end_time = int(time.time() * 1000)

        latent = samp_samples['samples']

        # 解码图片
        if tile_size is not None:
            samp_images = samp_vae.decode_tiled(latent, tile_x=tile_size // 8, tile_y=tile_size // 8, )
        else:
            samp_images = samp_vae.decode(latent).cpu()

        # 推理总耗时（包含解码）
        end_decode_time = int(time.time() * 1000)
        spent_time = 'Diffusion:' + str((end_time - start_time) / 1000) + '″, VAEDecode:' + str(
            (end_decode_time - end_time) / 1000) + '″ '

        # Clean loaded_objects
        easyCache.update_loaded_objects(prompt)

        results = easySave(samp_images, save_prefix, image_output, prompt, extra_pnginfo)
        sampler.update_value_by_id("results", my_unique_id, results)

        new_pipe = {
            "model": samp_model,
            "positive": samp_positive,
            "negative": samp_negative,
            "vae": samp_vae,
            "clip": samp_clip,

            "samples": samp_samples,
            "images": samp_images,
            "seed": samp_seed,

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

        if image_output in ("Sender", "Sender&Save"):
            PromptServer.instance.send_sync("img-send", {"link_id": link_id, "images": results})


        return {"ui": {"images": results},
                "result": sampler.get_output(new_pipe, )}

```
