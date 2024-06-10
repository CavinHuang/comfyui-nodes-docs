---
tags:
- Sampling
---

# EasyKSampler (Full)
## Documentation
- Class name: `easy fullkSampler`
- Category: `EasyUse/Sampler`
- Output node: `True`

The `easy fullkSampler` node is designed to facilitate the sampling process in generative models, offering a simplified interface for generating new samples. It abstracts the complexities involved in selecting samplers, schedulers, and configuring various parameters, making it easier for users to generate high-quality images or other types of media with minimal setup.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline through which the data flows, affecting the overall execution and output of the sampling process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict`
- **`steps`**
    - Specifies the number of steps to perform during the sampling process, directly influencing the detail and quality of the generated output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning free guidance scale, adjusting the influence of the conditioning on the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampling algorithm to use, influencing the characteristics and quality of the generated samples.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling algorithm used during sampling, affecting the progression and quality of the generated samples.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Specifies the denoising factor to apply during the sampling process, impacting the clarity and sharpness of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`image_output`**
    - Specifies the desired output format for the generated images, influencing the visual quality and format of the results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`link_id`**
    - A unique identifier for the sampling task, used for tracking and referencing the process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`save_prefix`**
    - A prefix added to the filenames of saved images, aiding in the organization and retrieval of generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`seed`**
    - Optional parameter to specify a seed for the random number generator, ensuring reproducibility of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`model`**
    - Optional parameter to specify a custom model configuration, allowing for further customization of the sampling process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`positive`**
    - Optional conditioning to guide the generation towards desired attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Optional conditioning to steer the generation away from certain attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent`**
    - Optional latent representation to be used as a starting point for the generation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`vae`**
    - Optional parameter to specify a VAE model, enhancing the generation process.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`clip`**
    - Optional parameter to specify a CLIP model, influencing the direction of the generation process.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`xyPlot`**
    - Optional parameter for plotting purposes, providing additional insights into the generation process.
    - Comfy dtype: `XYPLOT`
    - Python dtype: `str`
- **`image`**
    - Optional parameter to specify an initial image, influencing the starting point of the generation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The updated pipeline after the sampling process, encapsulating the flow and transformations applied.
    - Python dtype: `Dict`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated image as a result of the sampling process.
    - Python dtype: `str`
- **`model`**
    - Comfy dtype: `MODEL`
    - The model used during the sampling process, potentially updated or altered.
    - Python dtype: `str`
- **`positive`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning applied during the sampling process, influencing the attributes of the generated image.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning applied during the sampling process, steering the generation away from certain attributes.
    - Python dtype: `str`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent representation resulting from the sampling process, serving as a potential starting point for further generations.
    - Python dtype: `str`
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE model utilized during the sampling process, if any, influencing the generation.
    - Python dtype: `str`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model applied during the sampling process, guiding the thematic direction of the generation.
    - Python dtype: `str`
- **`seed`**
    - Comfy dtype: `INT`
    - The seed used for the random number generator during the sampling process, ensuring reproducibility.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class samplerFull(LayerDiffuse):

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {"pipe": ("PIPE_LINE",),
                 "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                 "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                 "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                 "scheduler": (comfy.samplers.KSampler.SCHEDULERS+['align_your_steps'],),
                 "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                 "image_output": (["Hide", "Preview", "Preview&Choose", "Save", "Hide&Save", "Sender", "Sender&Save"],),
                 "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                 "save_prefix": ("STRING", {"default": "ComfyUI"}),
                 },
                "optional": {
                    "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
                    "model": ("MODEL",),
                    "positive": ("CONDITIONING",),
                    "negative": ("CONDITIONING",),
                    "latent": ("LATENT",),
                    "vae": ("VAE",),
                    "clip": ("CLIP",),
                    "xyPlot": ("XYPLOT",),
                    "image": ("IMAGE",),
                },
                "hidden":
                  {"tile_size": "INT", "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                    "embeddingsList": (folder_paths.get_filename_list("embeddings"),)
                  }
                }

    RETURN_TYPES = ("PIPE_LINE", "IMAGE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "INT",)
    RETURN_NAMES = ("pipe",  "image", "model", "positive", "negative", "latent", "vae", "clip", "seed",)
    OUTPUT_NODE = True
    FUNCTION = "run"
    CATEGORY = "EasyUse/Sampler"

    def run(self, pipe, steps, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, seed=None, model=None, positive=None, negative=None, latent=None, vae=None, clip=None, xyPlot=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False, downscale_options=None):

        # Clean loaded_objects
        easyCache.update_loaded_objects(prompt)

        samp_model = model if model is not None else pipe["model"]
        samp_positive = positive if positive is not None else pipe["positive"]
        samp_negative = negative if negative is not None else pipe["negative"]
        samp_samples = latent if latent is not None else pipe["samples"]
        samp_vae = vae if vae is not None else pipe["vae"]
        samp_clip = clip if clip is not None else pipe["clip"]

        samp_seed = seed if seed is not None else pipe['seed']

        samp_custom = pipe["loader_settings"]["custom"] if "custom" in pipe["loader_settings"] else None

        steps = steps if steps is not None else pipe['loader_settings']['steps']
        start_step = pipe['loader_settings']['start_step'] if 'start_step' in pipe['loader_settings'] else 0
        last_step = pipe['loader_settings']['last_step'] if 'last_step' in pipe['loader_settings'] else 10000
        cfg = cfg if cfg is not None else pipe['loader_settings']['cfg']
        sampler_name = sampler_name if sampler_name is not None else pipe['loader_settings']['sampler_name']
        scheduler = scheduler if scheduler is not None else pipe['loader_settings']['scheduler']
        denoise = denoise if denoise is not None else pipe['loader_settings']['denoise']
        add_noise = pipe['loader_settings']['add_noise'] if 'add_noise' in pipe['loader_settings'] else 'enabled'
        force_full_denoise = pipe['loader_settings']['force_full_denoise'] if 'force_full_denoise' in pipe['loader_settings'] else True

        disable_noise = False
        if add_noise == "disable":
            disable_noise = True

        def downscale_model_unet(samp_model):
            if downscale_options is None:
                return  samp_model
            # 获取Unet参数
            elif "PatchModelAddDownscale" in ALL_NODE_CLASS_MAPPINGS:
                cls = ALL_NODE_CLASS_MAPPINGS['PatchModelAddDownscale']
                # 自动收缩Unet
                if downscale_options['downscale_factor'] is None:
                    unet_config = samp_model.model.model_config.unet_config
                    if unet_config is not None and "samples" in samp_samples:
                        height = samp_samples['samples'].shape[2] * 8
                        width = samp_samples['samples'].shape[3] * 8
                        context_dim = unet_config.get('context_dim')
                        longer_side = width if width > height else height
                        if context_dim is not None and longer_side > context_dim:
                            width_downscale_factor = float(width / context_dim)
                            height_downscale_factor = float(height / context_dim)
                            if width_downscale_factor > 1.75:
                                log_node_warn("正在收缩模型Unet...")
                                log_node_warn("收缩系数:" + str(width_downscale_factor))
                                (samp_model,) = cls().patch(samp_model, downscale_options['block_number'], width_downscale_factor, 0, 0.35, True, "bicubic",
                                                            "bicubic")
                            elif height_downscale_factor > 1.25:
                                log_node_warn("正在收缩模型Unet...")
                                log_node_warn("收缩系数:" + str(height_downscale_factor))
                                (samp_model,) = cls().patch(samp_model, downscale_options['block_number'], height_downscale_factor, 0, 0.35, True, "bicubic",
                                                            "bicubic")
                else:
                    cls = ALL_NODE_CLASS_MAPPINGS['PatchModelAddDownscale']
                    log_node_warn("正在收缩模型Unet...")
                    log_node_warn("收缩系数:" + str(downscale_options['downscale_factor']))
                    (samp_model,) = cls().patch(samp_model, downscale_options['block_number'], downscale_options['downscale_factor'], downscale_options['start_percent'], downscale_options['end_percent'], downscale_options['downscale_after_skip'], downscale_options['downscale_method'], downscale_options['upscale_method'])
            return samp_model

        def process_sample_state(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive,
                                 samp_negative,
                                 steps, start_step, last_step, cfg, sampler_name, scheduler, denoise,
                                 image_output, link_id, save_prefix, tile_size, prompt, extra_pnginfo, my_unique_id,
                                 preview_latent, force_full_denoise=force_full_denoise, disable_noise=disable_noise, samp_custom=None):

            # LayerDiffusion
            if "layer_diffusion_method" in pipe['loader_settings']:
                samp_blend_samples = pipe["blend_samples"] if "blend_samples" in pipe else None
                additional_cond = pipe["loader_settings"]['layer_diffusion_cond'] if "layer_diffusion_cond" in pipe[
                    'loader_settings'] else (None, None, None)
                method = self.get_layer_diffusion_method(pipe['loader_settings']['layer_diffusion_method'],
                                                         samp_blend_samples is not None)
                images = pipe["images"].movedim(-1, 1) if "images" in pipe else None
                weight = pipe['loader_settings']['layer_diffusion_weight'] if 'layer_diffusion_weight' in pipe[
                    'loader_settings'] else 1.0
                samp_model, samp_positive, samp_negative = self.apply_layer_diffusion(samp_model, method, weight,
                                                                                      samp_samples, samp_blend_samples,
                                                                                      samp_positive, samp_negative,
                                                                                      images, additional_cond)

            blend_samples = pipe['blend_samples'] if "blend_samples" in pipe else None
            layer_diffusion_method = pipe['loader_settings']['layer_diffusion_method'] if 'layer_diffusion_method' in pipe['loader_settings'] else None
            empty_samples = pipe["loader_settings"]["empty_samples"] if "empty_samples" in pipe["loader_settings"] else None
            samples = empty_samples if layer_diffusion_method is not None and empty_samples is not None else samp_samples
            # Downscale Model Unet
            if samp_model is not None:
                samp_model = downscale_model_unet(samp_model)
            # 推理初始时间
            start_time = int(time.time() * 1000)
            # 开始推理
            if scheduler == 'align_your_steps' and samp_custom is None:
                try:
                    model_type = get_sd_version(samp_model)
                    if model_type == 'unknown':
                        raise Exception("This Model not supported")
                    sigmas, = alignYourStepsScheduler().get_sigmas(model_type.upper(), steps, denoise)
                except:
                    raise Exception("Please update your ComfyUI")
                _sampler = comfy.samplers.sampler_object(sampler_name)
                samp_samples = sampler.custom_ksampler(samp_model, samp_seed, steps, cfg, _sampler, sigmas, samp_positive, samp_negative, samples, disable_noise=disable_noise, preview_latent=preview_latent)
            else:
                samp_samples = sampler.common_ksampler(samp_model, samp_seed, steps, cfg, sampler_name, scheduler, samp_positive, samp_negative, samples, denoise=denoise, preview_latent=preview_latent, start_step=start_step, last_step=last_step, force_full_denoise=force_full_denoise, disable_noise=disable_noise, custom=samp_custom)
            # 推理结束时间
            end_time = int(time.time() * 1000)
            latent = samp_samples["samples"]

            # 解码图片
            if tile_size is not None:
                samp_images = samp_vae.decode_tiled(latent, tile_x=tile_size // 8, tile_y=tile_size // 8, )
            else:
                samp_images = samp_vae.decode(latent).cpu()

            # LayerDiffusion Decode
            new_images, samp_images, alpha = self.layer_diffusion_decode(layer_diffusion_method, latent, blend_samples, samp_images, samp_model)

            # 推理总耗时（包含解码）
            end_decode_time = int(time.time() * 1000)
            spent_time = 'Diffusion:' + str((end_time-start_time)/1000)+'″, VAEDecode:' + str((end_decode_time-end_time)/1000)+'″ '

            results = easySave(new_images, save_prefix, image_output, prompt, extra_pnginfo)
            sampler.update_value_by_id("results", my_unique_id, results)

            # Clean loaded_objects
            easyCache.update_loaded_objects(prompt)

            new_pipe = {
                "model": samp_model,
                "positive": samp_positive,
                "negative": samp_negative,
                "vae": samp_vae,
                "clip": samp_clip,

                "samples": samp_samples,
                "blend_samples": blend_samples,
                "images": new_images,
                "samp_images": samp_images,
                "alpha": alpha,
                "seed": samp_seed,

                "loader_settings": {
                    **pipe["loader_settings"],
                    "spent_time": spent_time
                }
            }

            sampler.update_value_by_id("pipe_line", my_unique_id, new_pipe)

            del pipe

            if image_output == 'Preview&Choose':
                if my_unique_id not in ChooserMessage.stash:
                    ChooserMessage.stash[my_unique_id] = {}
                my_stash = ChooserMessage.stash[my_unique_id]

                PromptServer.instance.send_sync("easyuse-image-choose", {"id": my_unique_id, "urls": results})
                # wait for selection
                try:
                    selections = ChooserMessage.waitForMessage(my_unique_id, asList=True)
                    samples = samp_samples['samples']
                    samples = [samples[x] for x in selections if x >= 0] if len(selections) > 1 else [samples[0]]
                    new_images = [new_images[x] for x in selections if x >= 0] if len(selections) > 1 else [new_images[0]]
                    samp_images = [samp_images[x] for x in selections if x >= 0] if len(selections) > 1 else [samp_images[0]]
                    new_images = torch.stack(new_images, dim=0)
                    samp_images = torch.stack(samp_images, dim=0)
                    samples = torch.stack(samples, dim=0)
                    samp_samples = {"samples": samples}
                    new_pipe['samples'] = samp_samples
                    new_pipe['loader_settings']['batch_size'] = len(new_images)
                except ChooserCancelled:
                    raise comfy.model_management.InterruptProcessingException()

                new_pipe['images'] = new_images
                new_pipe['samp_images'] = samp_images

                return {"ui": {"images": results},
                        "result": sampler.get_output(new_pipe,)}

            if image_output in ("Hide", "Hide&Save"):
                return {"ui": {},
                    "result": sampler.get_output(new_pipe,)}

            if image_output in ("Sender", "Sender&Save"):
                PromptServer.instance.send_sync("img-send", {"link_id": link_id, "images": results})

            ModelPatcher.calculate_weight = default_calculate_weight
            return {"ui": {"images": results},
                    "result": sampler.get_output(new_pipe,)}

        def process_xyPlot(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative,
                           steps, cfg, sampler_name, scheduler, denoise,
                           image_output, link_id, save_prefix, tile_size, prompt, extra_pnginfo, my_unique_id, preview_latent, xyPlot, force_full_denoise, disable_noise, samp_custom):

            sampleXYplot = easyXYPlot(xyPlot, save_prefix, image_output, prompt, extra_pnginfo, my_unique_id, sampler, easyCache)

            if not sampleXYplot.validate_xy_plot():
                return process_sample_state(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive,
                                            samp_negative, steps, 0, 10000, cfg,
                                            sampler_name, scheduler, denoise, image_output, link_id, save_prefix, tile_size, prompt,
                                            extra_pnginfo, my_unique_id, preview_latent, samp_custom=samp_custom)

            # Downscale Model Unet
            if samp_model is not None:
                samp_model = downscale_model_unet(samp_model)

            alpha = None
            blend_samples = pipe['blend_samples'] if "blend_samples" in pipe else None
            layer_diffusion_method = pipe['loader_settings']['layer_diffusion_method'] if 'layer_diffusion_method' in pipe['loader_settings'] else None

            plot_image_vars = {
                "x_node_type": sampleXYplot.x_node_type, "y_node_type": sampleXYplot.y_node_type,
                "lora_name": pipe["loader_settings"]["lora_name"] if "lora_name" in pipe["loader_settings"] else None,
                "lora_model_strength": pipe["loader_settings"]["lora_model_strength"] if "model_strength" in pipe["loader_settings"] else None,
                "lora_clip_strength": pipe["loader_settings"]["lora_clip_strength"] if "clip_strength" in pipe["loader_settings"] else None,
                "lora_stack":  pipe["loader_settings"]["lora_stack"] if "lora_stack" in pipe["loader_settings"] else None,
                "steps": steps,
                "cfg": cfg,
                "sampler_name": sampler_name,
                "scheduler": scheduler,
                "denoise": denoise,
                "seed": samp_seed,
                "images": pipe['images'],

                "model": samp_model, "vae": samp_vae, "clip": samp_clip, "positive_cond": samp_positive,
                "negative_cond": samp_negative,

                "ckpt_name": pipe['loader_settings']['ckpt_name'] if "ckpt_name" in pipe["loader_settings"] else None,
                "vae_name": pipe['loader_settings']['vae_name'] if "vae_name" in pipe["loader_settings"] else None,
                "clip_skip": pipe['loader_settings']['clip_skip'] if "clip_skip" in pipe["loader_settings"] else None,
                "positive": pipe['loader_settings']['positive'] if "positive" in pipe["loader_settings"] else None,
                "positive_token_normalization": pipe['loader_settings']['positive_token_normalization'] if "positive_token_normalization" in pipe["loader_settings"] else None,
                "positive_weight_interpretation": pipe['loader_settings']['positive_weight_interpretation'] if "positive_weight_interpretation" in pipe["loader_settings"] else None,
                "negative": pipe['loader_settings']['negative'] if "negative" in pipe["loader_settings"] else None,
                "negative_token_normalization": pipe['loader_settings']['negative_token_normalization'] if "negative_token_normalization" in pipe["loader_settings"] else None,
                "negative_weight_interpretation": pipe['loader_settings']['negative_weight_interpretation'] if "negative_weight_interpretation" in pipe["loader_settings"] else None,
            }

            if "models" in pipe["loader_settings"]:
                plot_image_vars["models"] = pipe["loader_settings"]["models"]
            if "vae_use" in pipe["loader_settings"]:
                plot_image_vars["vae_use"] = pipe["loader_settings"]["vae_use"]
            if "a1111_prompt_style" in pipe["loader_settings"]:
                plot_image_vars["a1111_prompt_style"] = pipe["loader_settings"]["a1111_prompt_style"]
            if "cnet_stack" in pipe["loader_settings"]:
                plot_image_vars["cnet"] = pipe["loader_settings"]["cnet_stack"]
            if "positive_cond_stack" in pipe["loader_settings"]:
                plot_image_vars["positive_cond_stack"] = pipe["loader_settings"]["positive_cond_stack"]
            if "negative_cond_stack" in pipe["loader_settings"]:
                plot_image_vars["negative_cond_stack"] = pipe["loader_settings"]["negative_cond_stack"]
            if layer_diffusion_method:
                plot_image_vars["layer_diffusion_method"] = layer_diffusion_method
            if "layer_diffusion_weight" in pipe["loader_settings"]:
                plot_image_vars["layer_diffusion_weight"] = pipe['loader_settings']['layer_diffusion_weight']
            if "layer_diffusion_cond" in pipe["loader_settings"]:
                plot_image_vars["layer_diffusion_cond"] = pipe['loader_settings']['layer_diffusion_cond']
            if "empty_samples" in pipe["loader_settings"]:
                plot_image_vars["empty_samples"] = pipe["loader_settings"]['empty_samples']

            latent_image = sampleXYplot.get_latent(pipe["samples"])
            latents_plot = sampleXYplot.get_labels_and_sample(plot_image_vars, latent_image, preview_latent, start_step,
                                                              last_step, force_full_denoise, disable_noise)

            samp_samples = {"samples": latents_plot}

            images, image_list = sampleXYplot.plot_images_and_labels()

            # Generate output_images
            output_images = torch.stack([tensor.squeeze() for tensor in image_list])

            new_images, samp_images, alpha = self.layer_diffusion_decode(layer_diffusion_method, latents_plot, blend_samples,
                                                                         output_images, samp_model)

            results = easySave(images, save_prefix, image_output, prompt, extra_pnginfo)
            sampler.update_value_by_id("results", my_unique_id, results)

            # Clean loaded_objects
            easyCache.update_loaded_objects(prompt)

            new_pipe = {
                "model": samp_model,
                "positive": samp_positive,
                "negative": samp_negative,
                "vae": samp_vae,
                "clip": samp_clip,

                "samples": samp_samples,
                "blend_samples": blend_samples,
                "samp_images": samp_images,
                "images": new_images,
                "seed": samp_seed,
                "alpha": alpha,

                "loader_settings": pipe["loader_settings"],
            }

            sampler.update_value_by_id("pipe_line", my_unique_id, new_pipe)

            del pipe

            if image_output in ("Hide", "Hide&Save"):
                return sampler.get_output(new_pipe)

            ModelPatcher.calculate_weight = default_calculate_weight
            return {"ui": {"images": results}, "result": (sampler.get_output(new_pipe))}

        preview_latent = True
        if image_output in ("Hide", "Hide&Save"):
            preview_latent = False

        xyplot_id = next((x for x in prompt if "XYPlot" in str(prompt[x]["class_type"])), None)
        if xyplot_id is None:
            xyPlot = None
        else:
            xyPlot = pipe["loader_settings"]["xyplot"] if "xyplot" in pipe["loader_settings"] else xyPlot
        if xyPlot is not None:
            return process_xyPlot(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, steps, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, tile_size, prompt, extra_pnginfo, my_unique_id, preview_latent, xyPlot, force_full_denoise, disable_noise, samp_custom)
        else:
            return process_sample_state(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, steps, start_step, last_step, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, tile_size, prompt, extra_pnginfo, my_unique_id, preview_latent, force_full_denoise, disable_noise, samp_custom)

```
