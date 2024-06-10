---
tags:
- Sampling
---

# pipeKSamplerSDXL
## Documentation
- Class name: `ttN pipeKSamplerSDXL_v2`
- Category: `ttN/pipe`
- Output node: `True`

The node `ttN_pipeKSamplerSDXL_v2` is designed to facilitate advanced image sampling processes, incorporating various techniques and parameters to enhance and customize the generation of images. It leverages a sophisticated sampling algorithm, allowing for detailed control over the image generation process, including aspects like noise management, denoising, and the application of LoRA adjustments for model tuning.
## Input types
### Required
- **`sdxl_pipe`**
    - unknown
    - Comfy dtype: `PIPE_LINE_SDXL`
    - Python dtype: `unknown`
- **`lora_name`**
    - Specifies the name of the LoRA parameter to be adjusted, playing a crucial role in fine-tuning the model's behavior and output quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_strength`**
    - Determines the strength of the LoRA adjustment, directly impacting the model's output by altering its internal representations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`upscale_method`**
    - Specifies the method used for upscaling the generated images, affecting their resolution and clarity.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_model_name`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`factor`**
    - Determines the factor by which the images are upscaled, directly influencing their final size and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rescale`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`percent`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`width`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`height`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`longer_side`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`crop`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`sampler_state`**
    - Controls the state of the sampler, affecting the sampling process and the final image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`base_steps`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`cfg`**
    - Configures the sampling process, allowing for customization of the generation parameters.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`refiner_steps`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`refiner_cfg`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`refiner_denoise`**
    - unknown
    - Comfy dtype: `FLOAT`
    - Python dtype: `unknown`
- **`sampler_name`**
    - Identifies the specific sampler algorithm to be used, affecting the style and characteristics of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduling algorithm for the sampling process, influencing the progression and dynamics of image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image_output`**
    - Determines the output format and handling of the generated images, including options for saving or displaying.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`save_prefix`**
    - Sets the prefix for saved image files, organizing and identifying generated images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`seed`**
    - unknown
    - Comfy dtype: `INT`
    - Python dtype: `unknown`
- **`optional_model`**
    - unknown
    - Comfy dtype: `MODEL`
    - Python dtype: `unknown`
- **`optional_positive`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`optional_negative`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`optional_latent`**
    - unknown
    - Comfy dtype: `LATENT`
    - Python dtype: `unknown`
- **`optional_vae`**
    - unknown
    - Comfy dtype: `VAE`
    - Python dtype: `unknown`
- **`optional_refiner_model`**
    - unknown
    - Comfy dtype: `MODEL`
    - Python dtype: `unknown`
- **`optional_refiner_positive`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`optional_refiner_negative`**
    - unknown
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `unknown`
- **`optional_clip`**
    - unknown
    - Comfy dtype: `CLIP`
    - Python dtype: `unknown`
- **`input_image_override`**
    - unknown
    - Comfy dtype: `IMAGE`
    - Python dtype: `unknown`
- **`adv_xyPlot`**
    - unknown
    - Comfy dtype: `ADV_XYPLOT`
    - Python dtype: `unknown`
## Output types
- **`sdxl_pipe`**
    - Comfy dtype: `PIPE_LINE_SDXL`
    - unknown
    - Python dtype: `unknown`
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - unknown
    - Python dtype: `unknown`
- **`model`**
    - Comfy dtype: `MODEL`
    - unknown
    - Python dtype: `unknown`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`refiner_model`**
    - Comfy dtype: `MODEL`
    - unknown
    - Python dtype: `unknown`
- **`refiner_positive`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`refiner_negative`**
    - Comfy dtype: `CONDITIONING`
    - unknown
    - Python dtype: `unknown`
- **`latent`**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
- **`vae`**
    - Comfy dtype: `VAE`
    - unknown
    - Python dtype: `unknown`
- **`clip`**
    - Comfy dtype: `CLIP`
    - unknown
    - Python dtype: `unknown`
- **`image`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`seed`**
    - Comfy dtype: `INT`
    - unknown
    - Python dtype: `unknown`
- **`ui`**
    - Provides a user interface component displaying the results of the image generation process, including generated images and potentially additional information.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeKSamplerSDXL_v2:
    version = '2.1.0'
    upscale_methods = ["None",
                       "[latent] nearest-exact", "[latent] bilinear", "[latent] area", "[latent] bicubic", "[latent] lanczos", "[latent] bislerp",
                       "[hiresFix] nearest-exact", "[hiresFix] bilinear", "[hiresFix] area", "[hiresFix] bicubic", "[hiresFix] lanczos", "[hiresFix] bislerp"]
    crop_methods = ["disabled", "center"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"sdxl_pipe": ("PIPE_LINE_SDXL",),

                "lora_name": (["None"] + folder_paths.get_filename_list("loras"),),
                "lora_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                "upscale_method": (cls.upscale_methods, {"default": "None"}),
                "upscale_model_name": (folder_paths.get_filename_list("upscale_models"),),
                "factor": ("FLOAT", {"default": 2, "min": 0.0, "max": 10.0, "step": 0.25}),
                "rescale": (["by percentage", "to Width/Height", 'to longer side - maintain aspect', 'None'],),
                "percent": ("INT", {"default": 50, "min": 0, "max": 1000, "step": 1}),
                "width": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                "height": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                "longer_side": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                "crop": (cls.crop_methods,),

                "sampler_state": (["Sample", "Hold"], ),
                "base_steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "refiner_steps": ("INT", {"default": 20, "min": 0, "max": 10000}),
                "refiner_cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                "refiner_denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                "image_output": (["Hide", "Preview", "Save", "Hide/Save", "Disabled"],),
                "save_prefix": ("STRING", {"default": "ComfyUI"})
                },
                "optional": 
                {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "optional_model": ("MODEL",),
                "optional_positive": ("CONDITIONING",),
                "optional_negative": ("CONDITIONING",),
                "optional_latent": ("LATENT",),
                "optional_vae": ("VAE",),
                "optional_refiner_model": ("MODEL",),
                "optional_refiner_positive": ("CONDITIONING",),
                "optional_refiner_negative": ("CONDITIONING",),
                "optional_latent": ("LATENT",),
                "optional_clip": ("CLIP",),
                "input_image_override": ("IMAGE",),
                "adv_xyPlot": ("ADV_XYPLOT",),
                },
                "hidden":
                {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                 "embeddingsList": (folder_paths.get_filename_list("embeddings"),),
                 "lorasList": (folder_paths.get_filename_list("loras"),),
                "ttNnodeVersion": ttN_pipeKSamplerSDXL_v2.version},
        }

    RETURN_TYPES = ("PIPE_LINE_SDXL", "PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE", "INT",)
    RETURN_NAMES = ("sdxl_pipe", "pipe","model", "positive", "negative" , "refiner_model", "refiner_positive", "refiner_negative", "latent", "vae", "clip", "image", "seed", )
    OUTPUT_NODE = True
    FUNCTION = "sample"
    CATEGORY = "ttN/pipe"

    def sample(self, sdxl_pipe,
               lora_name, lora_strength,
               sampler_state, base_steps, refiner_steps, cfg, denoise, refiner_cfg, refiner_denoise, sampler_name, scheduler, image_output, save_prefix, 
               optional_model=None, optional_positive=None, optional_negative=None, optional_latent=None, optional_vae=None, optional_clip=None, input_image_override=None, adv_xyPlot=None,
               seed=None, upscale_model_name=None, upscale_method=None, factor=None, rescale=None, percent=None, width=None, height=None, longer_side=None, crop=None,
               prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False,
               optional_refiner_model=None, optional_refiner_positive=None, optional_refiner_negative=None):

        # Clean Loader Models from Global
        loader.update_loaded_objects(prompt)

        my_unique_id = int(my_unique_id)

        ttN_save = ttNsave(my_unique_id, prompt, extra_pnginfo)

        sdxl_model = optional_model if optional_model is not None else sdxl_pipe["model"]
        sdxl_positive = optional_positive if optional_positive is not None else sdxl_pipe["positive"]
        sdxl_negative = optional_negative if optional_negative is not None else sdxl_pipe["negative"]
        sdxl_samples = optional_latent if optional_latent is not None else sdxl_pipe["samples"]
        sdxl_images = input_image_override if input_image_override is not None else sdxl_pipe["images"]
        sdxl_vae = optional_vae if optional_vae is not None else sdxl_pipe["vae"]
        sdxl_clip = optional_clip if optional_clip is not None else sdxl_pipe["clip"]

        sdxl_refiner_model = optional_refiner_model if optional_refiner_model is not None else sdxl_pipe["refiner_model"]
        sdxl_refiner_positive = optional_refiner_positive if optional_refiner_positive is not None else sdxl_pipe["refiner_positive"]
        #sdxl_refiner_positive = sdxl_positive if sdxl_refiner_positive is None else sdxl_refiner_positive
        sdxl_refiner_negative = optional_refiner_negative if optional_refiner_negative is not None else sdxl_pipe["refiner_negative"]
        #sdxl_refiner_negative = sdxl_negative if sdxl_refiner_negative is None else sdxl_refiner_negative
        sdxl_refiner_clip = sdxl_pipe["refiner_clip"]

        if seed in (None, 'undefined'):
            sdxl_seed = sdxl_pipe["seed"]
        else:
            sdxl_seed = seed      

        def process_sample_state(sdxl_pipe, sdxl_model, sdxl_images, sdxl_clip, sdxl_samples, sdxl_vae, sdxl_seed, sdxl_positive, sdxl_negative, lora_name, lora_model_strength, lora_clip_strength,
                                 sdxl_refiner_model, sdxl_refiner_positive, sdxl_refiner_negative, sdxl_refiner_clip,
                                 upscale_model_name, upscale_method, factor, rescale, percent, width, height, longer_side, crop,
                                 base_steps, refiner_steps, cfg, sampler_name, scheduler, denoise, refiner_denoise,
                                 image_output, save_prefix, prompt, my_unique_id, preview_latent, force_full_denoise=force_full_denoise, disable_noise=disable_noise):
            
            # Load Lora
            if lora_name not in (None, "None"):
                sdxl_model, sdxl_clip = loader.load_lora(lora_name, sdxl_model, sdxl_clip, lora_model_strength, lora_clip_strength)
            
            total_steps = base_steps + refiner_steps

            # Upscale samples if enabled
            upscale_method = upscale_method.split(' ', 1)

            if upscale_method[0] == "[latent]":
                sdxl_samples = sampler.handle_upscale(sdxl_samples, upscale_method[1], factor, crop)
            
            if upscale_method[0] == "[hiresFix]":
                if (sdxl_images is None):
                    sdxl_images = sdxl_vae.decode(sdxl_samples["samples"])
                hiresfix = ttN_modelScale()
                sdxl_samples = hiresfix.upscale(upscale_model_name, sdxl_images, True if rescale != 'None' else False, upscale_method[1], rescale, percent, width, height, longer_side, crop, "return latent", None, True, sdxl_vae)


            if (refiner_steps > 0) and (sdxl_refiner_model not in [None, "None"]):
                # Base Sample
                sdxl_samples = sampler.common_ksampler(sdxl_model, sdxl_seed, total_steps, cfg, sampler_name, scheduler, sdxl_positive, sdxl_negative, sdxl_samples,
                                                       denoise=denoise, preview_latent=preview_latent, start_step=0, last_step=base_steps, force_full_denoise=force_full_denoise, disable_noise=disable_noise)

                # Refiner Sample
                sdxl_samples = sampler.common_ksampler(sdxl_refiner_model, sdxl_seed, total_steps, refiner_cfg, sampler_name, scheduler, sdxl_refiner_positive, sdxl_refiner_negative, sdxl_samples,
                                                       denoise=refiner_denoise, preview_latent=preview_latent, start_step=base_steps, last_step=10000, force_full_denoise=True, disable_noise=True)
            else:
                sdxl_samples = sampler.common_ksampler(sdxl_model, sdxl_seed, base_steps, cfg, sampler_name, scheduler, sdxl_positive, sdxl_negative, sdxl_samples,
                                                       denoise=denoise, preview_latent=preview_latent, start_step=0, last_step=base_steps, force_full_denoise=True, disable_noise=disable_noise)

            results = list()
            if (image_output != "Disabled"):
                latent = sdxl_samples["samples"]
                sdxl_images = sdxl_vae.decode(latent)

                results = ttN_save.images(sdxl_images, save_prefix, image_output)

            sampler.update_value_by_id("results", my_unique_id, results)

            # Clean loaded_objects
            loader.update_loaded_objects(prompt)

            new_sdxl_pipe = {
                "model": sdxl_model,
                "positive": sdxl_positive,
                "negative": sdxl_negative,
                "vae": sdxl_vae,
                "clip": sdxl_clip,

                "refiner_model": sdxl_refiner_model,
                "refiner_positive": sdxl_refiner_positive,
                "refiner_negative": sdxl_refiner_negative,
                "refiner_clip": sdxl_refiner_clip,

                "samples": sdxl_samples,
                "images": sdxl_images,
                "seed": sdxl_seed,

                "loader_settings": sdxl_pipe["loader_settings"],
            }
            
            pipe = {"model": sdxl_model,
                "positive": sdxl_positive,
                "negative": sdxl_negative,
                "vae": sdxl_vae,
                "clip": sdxl_clip,

                "samples": sdxl_samples,
                "images": sdxl_images,
                "seed": sdxl_seed,
                
                "loader_settings": sdxl_pipe["loader_settings"],  
            }
            
            sampler.update_value_by_id("pipe_line", my_unique_id, new_sdxl_pipe)

            del sdxl_pipe
            
            if image_output in ("Hide", "Hide/Save", "Disabled"):
                return sampler.get_output_sdxl_v2(new_sdxl_pipe, pipe)

            return {"ui": {"images": results},
                    "result": sampler.get_output_sdxl_v2(new_sdxl_pipe, pipe)}

        def process_xyPlot(sdxl_pipe, sdxl_model, sdxl_clip, sdxl_samples, sdxl_vae, sdxl_seed, sdxl_positive, sdxl_negative, lora_name, lora_model_strength, lora_clip_strength,
                           base_steps, refiner_steps, cfg, sampler_name, scheduler, denoise,
                           image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent, adv_xyPlot):

            random.seed(seed)

            plotter = ttNadv_xyPlot(adv_xyPlot, my_unique_id, prompt, extra_pnginfo, save_prefix, image_output)
            samples, images = plotter.xy_plot_process()

            if samples is None and images is None:
                return process_sample_state(sdxl_pipe, sdxl_model, sdxl_images, sdxl_clip, sdxl_samples, sdxl_vae, sdxl_seed, sdxl_positive, sdxl_negative, lora_name, lora_model_strength, lora_clip_strength,
                                 sdxl_refiner_model, sdxl_refiner_positive, sdxl_refiner_negative, sdxl_refiner_clip,
                                 upscale_model_name, upscale_method, factor, rescale, percent, width, height, longer_side, crop,
                                 base_steps, refiner_steps, cfg, sampler_name, scheduler, denoise, refiner_denoise,
                                 image_output, save_prefix, prompt, my_unique_id, preview_latent, force_full_denoise=force_full_denoise, disable_noise=disable_noise)


            results = ttN_save.images(images[0], save_prefix, image_output)

            sampler.update_value_by_id("results", my_unique_id, results)

            # Clean loaded_objects
            loader.update_loaded_objects(prompt)

            new_sdxl_pipe = {
                "model": sdxl_model,
                "positive": sdxl_positive,
                "negative": sdxl_negative,
                "vae": sdxl_vae,
                "clip": sdxl_clip,

                "refiner_model": sdxl_refiner_model,
                "refiner_positive": sdxl_refiner_positive,
                "refiner_negative": sdxl_refiner_negative,
                "refiner_clip": sdxl_refiner_clip,

                "samples": samples,
                "images": images[1],
                "seed": sdxl_seed,

                "loader_settings": sdxl_pipe["loader_settings"],
            }
            
            pipe = {"model": sdxl_model,
                "positive": sdxl_positive,
                "negative": sdxl_negative,
                "vae": sdxl_vae,
                "clip": sdxl_clip,

                "samples": samples,
                "images": images[1],
                "seed": sdxl_seed,
                
                "loader_settings": sdxl_pipe["loader_settings"],  
            }

            sampler.update_value_by_id("pipe_line", my_unique_id, new_sdxl_pipe)

            del sdxl_pipe
            
            if image_output in ("Hide", "Hide/Save", "Disabled"):
                return sampler.get_output_sdxl_v2(new_sdxl_pipe, pipe)

            return {"ui": {"images": results},
                    "result": sampler.get_output_sdxl_v2(new_sdxl_pipe, pipe)}
            
        preview_latent = True
        if image_output in ("Hide", "Hide/Save", "Disabled"):
            preview_latent = False

        if sampler_state == "Sample" and adv_xyPlot is None:
            return process_sample_state(sdxl_pipe, sdxl_model, sdxl_images, sdxl_clip, sdxl_samples, sdxl_vae, sdxl_seed, sdxl_positive, sdxl_negative,
                                        lora_name, lora_strength, lora_strength,
                                        sdxl_refiner_model, sdxl_refiner_positive, sdxl_refiner_negative, sdxl_refiner_clip,
                                        upscale_model_name, upscale_method, factor, rescale, percent, width, height, longer_side, crop,
                                        base_steps, refiner_steps, cfg, sampler_name, scheduler, denoise, refiner_denoise, image_output, save_prefix, prompt, my_unique_id, preview_latent)

        elif sampler_state == "Sample" and adv_xyPlot is not None:
            return process_xyPlot(sdxl_pipe, sdxl_model, sdxl_clip, sdxl_samples, sdxl_vae, sdxl_seed, sdxl_positive, sdxl_negative, lora_name, lora_strength, lora_strength,
                           base_steps, refiner_steps, cfg, sampler_name, scheduler, denoise,
                           image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent, adv_xyPlot)

        elif sampler_state == "Hold":
            return sampler.process_hold_state(sdxl_pipe, image_output, my_unique_id, sdxl=True)

```
