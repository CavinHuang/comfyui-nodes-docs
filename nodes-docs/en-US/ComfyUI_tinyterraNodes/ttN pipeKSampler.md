---
tags:
- Sampling
---

# pipeKSampler v1 (Legacy)
## Documentation
- Class name: `ttN pipeKSampler`
- Category: `ttN/legacy`
- Output node: `True`

The ttN_pipeKSampler node is designed to facilitate advanced sampling techniques for image generation, leveraging a combination of model inputs, sampling configurations, and image manipulation parameters. It abstracts the complexity of configuring and executing sampling processes, offering a streamlined interface for generating images with specific attributes or modifications.
## Input types
### Required
- **`pipe`**
    - A structured input containing various configuration settings and model parameters for the sampling process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`lora_name`**
    - Specifies the LoRA model to be used, influencing the adaptation and fine-tuning of the generative model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_model_strength`**
    - Determines the strength of the LoRA model's influence on the generative model, adjusting the degree of adaptation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_clip_strength`**
    - Controls the strength of the LoRA model's influence on the CLIP model, adjusting semantic understanding.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`upscale_method`**
    - Defines the method used for upscaling the generated images, affecting image resolution and quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`factor`**
    - The factor by which the image is upscaled, directly impacting the final image size.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`crop`**
    - Specifies the cropping parameters for the generated images, affecting the final image composition.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `dict`
- **`sampler_state`**
    - The state of the sampler used during the image generation process, influencing sampling behavior.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `dict`
- **`steps`**
    - The number of steps to run the sampling process, affecting the detail and quality of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The configuration guidance factor, influencing the coherence and quality of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampler algorithm used, determining the sampling technique.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler for controlling the sampling process, affecting the progression of image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - The denoising factor applied during image generation, affecting image clarity and noise levels.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`image_output`**
    - The output path for the generated images, determining where the images are saved.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`save_prefix`**
    - A prefix added to the names of saved images, aiding in their organization and identification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`seed`**
    - The random seed used for the sampling process, ensuring reproducibility of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`optional_model`**
    - An optional model parameter that allows for the specification of an alternative generative model.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`optional_positive`**
    - Optional positive prompts to guide the image generation towards desired themes or elements.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[str]`
- **`optional_negative`**
    - Optional negative prompts intended to steer the image generation away from certain themes or elements.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `List[str]`
- **`optional_latent`**
    - Optional initial latent space inputs for the generative model, serving as a starting point for the image generation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`optional_vae`**
    - An optional variational autoencoder used to enhance the image generation process.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`optional_clip`**
    - An optional model used for semantic understanding of images and texts, aiding in aligning the generated images with the provided prompts.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`xyPlot`**
    - Specifies the parameters for generating an XY plot, potentially used for visualizing aspects of the sampling process.
    - Comfy dtype: `XYPLOT`
    - Python dtype: `dict`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The updated pipe structure containing the results of the sampling process, including configurations and generated images.
    - Python dtype: `dict`
- **`model`**
    - Comfy dtype: `MODEL`
    - The generative model used in the sampling process, potentially modified by LoRA or other parameters.
    - Python dtype: `str`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The list of positive prompts used to guide the image generation process.
    - Python dtype: `List[str]`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The list of negative prompts used to refine the image generation process.
    - Python dtype: `List[str]`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent space representation resulting from the sampling process.
    - Python dtype: `torch.Tensor`
- **`vae`**
    - Comfy dtype: `VAE`
    - The variational autoencoder involved in the image generation process.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model used for semantic understanding in the sampling process.
    - Python dtype: `torch.nn.Module`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The final generated image or images resulting from the sampling process.
    - Python dtype: `torch.Tensor`
- **`seed`**
    - Comfy dtype: `INT`
    - The seed value used during the sampling process, influencing the randomness and reproducibility of results.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)



## Source code
```python
class ttN_TSC_pipeKSampler:
    version = '1.0.5'
    upscale_methods = ["None", "nearest-exact", "bilinear", "area", "bicubic", "lanczos", "bislerp"]
    crop_methods = ["disabled", "center"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"pipe": ("PIPE_LINE",),

                "lora_name": (["None"] + folder_paths.get_filename_list("loras"),),
                "lora_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                "lora_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                 "upscale_method": (cls.upscale_methods,),
                 "factor": ("FLOAT", {"default": 2, "min": 0.0, "max": 10.0, "step": 0.25}),
                 "crop": (cls.crop_methods,),
                 "sampler_state": (["Sample", "Hold"], ),
                 "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                 "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                 "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                 "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                 "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                 "image_output": (["Hide", "Preview", "Save", "Hide/Save"],),
                 "save_prefix": ("STRING", {"default": "ComfyUI"})
                },
                "optional": 
                {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                 "optional_model": ("MODEL",),
                 "optional_positive": ("CONDITIONING",),
                 "optional_negative": ("CONDITIONING",),
                 "optional_latent": ("LATENT",),
                 "optional_vae": ("VAE",),
                 "optional_clip": ("CLIP",),
                 "xyPlot": ("XYPLOT",),
                },
                "hidden":
                {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                 "embeddingsList": (folder_paths.get_filename_list("embeddings"),),
                 "ttNnodeVersion": ttN_TSC_pipeKSampler.version},
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE", "INT",)
    RETURN_NAMES = ("pipe", "model", "positive", "negative", "latent","vae", "clip", "image", "seed", )
    OUTPUT_NODE = True
    FUNCTION = "sample"
    CATEGORY = "ttN/legacy"

    def sample(self, pipe, lora_name, lora_model_strength, lora_clip_strength, sampler_state, steps, cfg, sampler_name, scheduler, image_output, save_prefix, denoise=1.0, 
               optional_model=None, optional_positive=None, optional_negative=None, optional_latent=None, optional_vae=None, optional_clip=None, seed=None, xyPlot=None, upscale_method=None, factor=None, crop=None, prompt=None, extra_pnginfo=None, my_unique_id=None, start_step=None, last_step=None, force_full_denoise=False, disable_noise=False):
        # Clean Loader Models from Global
        loader.update_loaded_objects(prompt)

        my_unique_id = int(my_unique_id)

        ttN_save = ttNsave(my_unique_id, prompt, extra_pnginfo)

        samp_model = optional_model if optional_model is not None else pipe["model"]
        samp_positive = optional_positive if optional_positive is not None else pipe["positive"]
        samp_negative = optional_negative if optional_negative is not None else pipe["negative"]
        samp_samples = optional_latent if optional_latent is not None else pipe["samples"]
        samp_vae = optional_vae if optional_vae is not None else pipe["vae"]
        samp_clip = optional_clip if optional_clip is not None else pipe["clip"]

        if seed in (None, 'undefined'):
            samp_seed = pipe["seed"]
        else:
            samp_seed = seed      

        def process_sample_state(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, lora_name, lora_model_strength, lora_clip_strength,
                                 steps, cfg, sampler_name, scheduler, denoise,
                                 image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent, disable_noise=disable_noise):
            # Load Lora
            if lora_name not in (None, "None"):
                samp_model, samp_clip = loader.load_lora(lora_name, samp_model, samp_clip, lora_model_strength, lora_clip_strength)

            # Upscale samples if enabled
            samp_samples = sampler.handle_upscale(samp_samples, upscale_method, factor, crop)

            samp_samples = sampler.common_ksampler(samp_model, samp_seed, steps, cfg, sampler_name, scheduler, samp_positive, samp_negative, samp_samples, denoise=denoise, preview_latent=preview_latent, start_step=start_step, last_step=last_step, force_full_denoise=force_full_denoise, disable_noise=disable_noise)
      

            latent = samp_samples["samples"]
            samp_images = samp_vae.decode(latent)

            results = ttN_save.images(samp_images, save_prefix, image_output)

            sampler.update_value_by_id("results", my_unique_id, results)

            # Clean loaded_objects
            loader.update_loaded_objects(prompt)

            new_pipe = {
                "model": samp_model,
                "positive": samp_positive,
                "negative": samp_negative,
                "vae": samp_vae,
                "clip": samp_clip,

                "samples": samp_samples,
                "images": samp_images,
                "seed": samp_seed,

                "loader_settings": pipe["loader_settings"],
            }
            
            sampler.update_value_by_id("pipe_line", my_unique_id, new_pipe)

            del pipe
            
            if image_output in ("Hide", "Hide/Save"):
                return sampler.get_output(new_pipe)
            
            return {"ui": {"images": results},
                    "result": sampler.get_output(new_pipe)}

        def process_hold_state(pipe, image_output, my_unique_id):
            last_pipe = sampler.init_state(my_unique_id, "pipe_line", pipe)

            last_results = sampler.init_state(my_unique_id, "results", list())
            
            if image_output in ("Hide", "Hide/Save"):
                return sampler.get_output(last_pipe)

            return {"ui": {"images": last_results}, "result": sampler.get_output(last_pipe)} 

        def process_xyPlot(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, lora_name, lora_model_strength, lora_clip_strength,
                           steps, cfg, sampler_name, scheduler, denoise,
                           image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent, xyPlot):
            
            random.seed(seed)
            
            sampleXYplot = ttNxyPlot(xyPlot, save_prefix, image_output, prompt, extra_pnginfo, my_unique_id)

            if not sampleXYplot.validate_xy_plot():
                return process_sample_state(pipe, lora_name, lora_model_strength, lora_clip_strength, steps, cfg, sampler_name, scheduler, denoise, image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent)

            plot_image_vars = {
                "x_node_type": sampleXYplot.x_node_type, "y_node_type": sampleXYplot.y_node_type,
                "lora_name": lora_name, "lora_model_strength": lora_model_strength, "lora_clip_strength": lora_clip_strength,
                "steps": steps, "cfg": cfg, "sampler_name": sampler_name, "scheduler": scheduler, "denoise": denoise, "seed": samp_seed,

                "model": samp_model, "vae": samp_vae, "clip": samp_clip, "positive_cond": samp_positive, "negative_cond": samp_negative,
                
                "ckpt_name": pipe['loader_settings']['ckpt_name'],
                "vae_name": pipe['loader_settings']['vae_name'],
                "clip_skip": pipe['loader_settings']['clip_skip'],
                "lora1_name": pipe['loader_settings']['lora1_name'],
                "lora1_model_strength": pipe['loader_settings']['lora1_model_strength'],
                "lora1_clip_strength": pipe['loader_settings']['lora1_clip_strength'],
                "lora2_name": pipe['loader_settings']['lora2_name'],
                "lora2_model_strength": pipe['loader_settings']['lora2_model_strength'],
                "lora2_clip_strength": pipe['loader_settings']['lora2_clip_strength'],
                "lora3_name": pipe['loader_settings']['lora3_name'],
                "lora3_model_strength": pipe['loader_settings']['lora3_model_strength'],
                "lora3_clip_strength": pipe['loader_settings']['lora3_clip_strength'],
                "positive": pipe['loader_settings']['positive'],
                "positive_token_normalization": pipe['loader_settings']['positive_token_normalization'],
                "positive_weight_interpretation": pipe['loader_settings']['positive_weight_interpretation'],
                "negative": pipe['loader_settings']['negative'],
                "negative_token_normalization": pipe['loader_settings']['negative_token_normalization'],
                "negative_weight_interpretation": pipe['loader_settings']['negative_weight_interpretation'],
                }
            
            latent_image = sampleXYplot.get_latent(pipe["samples"])
            
            latents_plot = sampleXYplot.get_labels_and_sample(plot_image_vars, latent_image, preview_latent, start_step, last_step, force_full_denoise, disable_noise)

            samp_samples = {"samples": latents_plot}
            images = sampleXYplot.plot_images_and_labels()

            if xyPlot["output_individuals"]:
                results = ttN_save.images(images, save_prefix, image_output)
            else:
                results = ttN_save.images(images[-1], save_prefix, image_output)
                

            sampler.update_value_by_id("results", my_unique_id, results)

            # Clean loaded_objects
            loader.update_loaded_objects(prompt)

            new_pipe = {
                "model": samp_model,
                "positive": samp_positive,
                "negative": samp_negative,
                "vae": samp_vae,
                "clip": samp_clip,

                "samples": samp_samples,
                "images": images,
                "seed": samp_seed,

                "loader_settings": pipe["loader_settings"],
            }

            sampler.update_value_by_id("pipe_line", my_unique_id, new_pipe)

            del pipe

            if image_output in ("Hide", "Hide/Save"):
                return sampler.get_output(new_pipe)

            return {"ui": {"images": results}, "result": sampler.get_output(new_pipe)}

        preview_latent = True
        if image_output in ("Hide", "Hide/Save"):
            preview_latent = False

        if sampler_state == "Sample" and xyPlot is None:
            return process_sample_state(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, lora_name, lora_model_strength, lora_clip_strength,
                                        steps, cfg, sampler_name, scheduler, denoise, image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent)

        elif sampler_state == "Sample" and xyPlot is not None:
            return process_xyPlot(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, lora_name, lora_model_strength, lora_clip_strength, steps, cfg, sampler_name, scheduler, denoise, image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent, xyPlot)

        elif sampler_state == "Hold":
            return process_hold_state(pipe, image_output, my_unique_id)

```
