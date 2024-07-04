
# Documentation
- Class name: ttN pipeKSampler_v2
- Category: ttN/pipe
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点专门用于高级图像采样,利用各种输入如模型配置、LoRA调整和可选参数来生成或修改图像。它集成了复杂的功能,如噪声管理、去噪控制和可选的模型增强,以定制图像生成过程,旨在根据给定的输入提供灵活和可定制的输出。

# Input types
## Required
- pipe
    - 未知
    - Comfy dtype: PIPE_LINE
    - Python dtype: unknown
- lora_name
    - 指定要应用的LoRA(低阶适应)的名称,通过调整模型参数来影响模型的行为和输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_strength
    - 决定所应用LoRA的强度,影响模型调整的强度和最终图像特征。
    - Comfy dtype: FLOAT
    - Python dtype: float
- upscale_method
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- upscale_model_name
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- factor
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- rescale
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- percent
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- width
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- height
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- longer_side
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- crop
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- sampler_state
    - 表示采样器的当前状态,指导采样过程并影响生成结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- steps
    - 定义采样过程中要采取的步骤数,直接影响输出图像的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 调整采样过程的配置设置,允许微调生成参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 确定要使用的特定采样器,决定图像生成的方法和方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 指定采样过程的调度程序,编排操作的顺序和时间。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- denoise
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- image_output
    - 指示生成图像的所需输出格式或目的地,指导结果的保存或显示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- save_prefix
    - 为保存的图像提供命名前缀,有助于组织和检索生成的输出。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- seed
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- optional_model
    - 未知
    - Comfy dtype: MODEL
    - Python dtype: unknown
- optional_positive
    - 未知
    - Comfy dtype: CONDITIONING
    - Python dtype: unknown
- optional_negative
    - 未知
    - Comfy dtype: CONDITIONING
    - Python dtype: unknown
- optional_latent
    - 未知
    - Comfy dtype: LATENT
    - Python dtype: unknown
- optional_vae
    - 未知
    - Comfy dtype: VAE
    - Python dtype: unknown
- optional_clip
    - 未知
    - Comfy dtype: CLIP
    - Python dtype: unknown
- input_image_override
    - 未知
    - Comfy dtype: IMAGE
    - Python dtype: unknown
- adv_xyPlot
    - 未知
    - Comfy dtype: ADV_XYPLOT
    - Python dtype: unknown

# Output types
- pipe
    - Comfy dtype: PIPE_LINE
    - 未知
    - Python dtype: unknown
- model
    - Comfy dtype: MODEL
    - 未知
    - Python dtype: unknown
- positive
    - Comfy dtype: CONDITIONING
    - 未知
    - Python dtype: unknown
- negative
    - Comfy dtype: CONDITIONING
    - 未知
    - Python dtype: unknown
- latent
    - Comfy dtype: LATENT
    - 未知
    - Python dtype: unknown
- vae
    - Comfy dtype: VAE
    - 未知
    - Python dtype: unknown
- clip
    - Comfy dtype: CLIP
    - 未知
    - Python dtype: unknown
- image
    - Comfy dtype: IMAGE
    - 未知
    - Python dtype: unknown
- seed
    - Comfy dtype: INT
    - 未知
    - Python dtype: unknown


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeKSampler_v2:
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
                {"pipe": ("PIPE_LINE",),

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
                "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
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
                "optional_clip": ("CLIP",),
                "input_image_override": ("IMAGE",),
                "adv_xyPlot": ("ADV_XYPLOT",),
                },
                "hidden":
                {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                 "embeddingsList": (folder_paths.get_filename_list("embeddings"),),
                 "lorasList": (folder_paths.get_filename_list("loras"),),
                 "ttNnodeVersion": ttN_pipeKSampler_v2.version},
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE", "INT",)
    RETURN_NAMES = ("pipe", "model", "positive", "negative", "latent","vae", "clip", "image", "seed", )
    OUTPUT_NODE = True
    FUNCTION = "sample"
    CATEGORY = "ttN/pipe"

    def sample(self, pipe,
               lora_name, lora_strength,
               sampler_state, steps, cfg, sampler_name, scheduler, image_output, save_prefix, denoise=1.0, 
               optional_model=None, optional_positive=None, optional_negative=None, optional_latent=None, optional_vae=None, optional_clip=None, input_image_override=None,
               seed=None, adv_xyPlot=None, upscale_model_name=None, upscale_method=None, factor=None, rescale=None, percent=None, width=None, height=None, longer_side=None, crop=None,
               prompt=None, extra_pnginfo=None, my_unique_id=None, start_step=None, last_step=None, force_full_denoise=False, disable_noise=False):

        # Clean Loader Models from Global
        loader.update_loaded_objects(prompt)

        my_unique_id = int(my_unique_id)

        ttN_save = ttNsave(my_unique_id, prompt, extra_pnginfo)

        samp_model = optional_model if optional_model is not None else pipe["model"]
        samp_positive = optional_positive if optional_positive is not None else pipe["positive"]
        samp_negative = optional_negative if optional_negative is not None else pipe["negative"]
        samp_samples = optional_latent if optional_latent is not None else pipe["samples"]
        samp_images = input_image_override if input_image_override is not None else pipe["images"]
        samp_vae = optional_vae if optional_vae is not None else pipe["vae"]
        samp_clip = optional_clip if optional_clip is not None else pipe["clip"]

        if seed in (None, 'undefined'):
            samp_seed = pipe["seed"]
        else:
            samp_seed = seed

        def process_sample_state(pipe, samp_model, samp_images, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, lora_name, lora_model_strength, lora_clip_strength,
                                 upscale_model_name, upscale_method, factor, rescale, percent, width, height, longer_side, crop,
                                 steps, cfg, sampler_name, scheduler, denoise,
                                 image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent, start_step=start_step, last_step=last_step, force_full_denoise=force_full_denoise, disable_noise=disable_noise):
            # Load Lora
            if lora_name not in (None, "None"):
                samp_model, samp_clip = loader.load_lora(lora_name, samp_model, samp_clip, lora_model_strength, lora_clip_strength)

            upscale_method = upscale_method.split(' ', 1)

            # Upscale samples if enabled
            if upscale_method[0] == "[latent]":
                samp_samples = sampler.handle_upscale(samp_samples, upscale_method[1], factor, crop)
            
            if upscale_method[0] == "[hiresFix]": 
                if (samp_images is None):
                    samp_images = samp_vae.decode(samp_samples["samples"])
                hiresfix = ttN_modelScale()
                samp_samples = hiresfix.upscale(upscale_model_name, samp_images, True if rescale != 'None' else False, upscale_method[1], rescale, percent, width, height, longer_side, crop, "return latent", None, True, samp_vae)

            samp_samples = sampler.common_ksampler(samp_model, samp_seed, steps, cfg, sampler_name, scheduler, samp_positive, samp_negative, samp_samples, denoise=denoise, preview_latent=preview_latent, start_step=start_step, last_step=last_step, force_full_denoise=force_full_denoise, disable_noise=disable_noise)
      
            results = list()
            if (image_output != "Disabled"):
                # Save images
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
            
            if image_output in ("Hide", "Hide/Save", "Disabled"):
                return sampler.get_output(new_pipe)

            return {"ui": {"images": results},
                    "result": sampler.get_output(new_pipe)}

        def process_xyPlot(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, lora_name, lora_model_strength, lora_clip_strength,
                           steps, cfg, sampler_name, scheduler, denoise,
                           image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent, adv_xyPlot):

            random.seed(seed)

            plotter = ttNadv_xyPlot(adv_xyPlot, my_unique_id, prompt, extra_pnginfo, save_prefix, image_output)
            samples, images = plotter.xy_plot_process()

            if samples is None and images is None:
                return process_sample_state(pipe, samp_model, samp_images, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, lora_name, lora_model_strength, lora_clip_strength,
                                 upscale_model_name, upscale_method, factor, rescale, percent, width, height, longer_side, crop,
                                 steps, cfg, sampler_name, scheduler, denoise,
                                 image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent, start_step=start_step, last_step=last_step, force_full_denoise=force_full_denoise, disable_noise=disable_noise)


            results = ttN_save.images(images[0], save_prefix, image_output)

            sampler.update_value_by_id("results", my_unique_id, results)

            # Clean loaded_objects
            loader.update_loaded_objects(prompt)

            new_pipe = {
                "model": samp_model,
                "positive": samp_positive,
                "negative": samp_negative,
                "vae": samp_vae,
                "clip": samp_clip,

                "samples": samples,
                "images": images[1],
                "seed": samp_seed,

                "loader_settings": pipe["loader_settings"],
            }

            sampler.update_value_by_id("pipe_line", my_unique_id, new_pipe)

            del pipe

            if image_output in ("Hide", "Hide/Save"):
                return sampler.get_output(new_pipe)

            return {"ui": {"images": results}, "result": sampler.get_output(new_pipe)}

        preview_latent = True
        if image_output in ("Hide", "Hide/Save", "Disabled"):
            preview_latent = False

        if sampler_state == "Sample" and adv_xyPlot is None:
            return process_sample_state(pipe, samp_model, samp_images, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, lora_name, lora_strength, lora_strength,
                                        upscale_model_name, upscale_method, factor, rescale, percent, width, height, longer_side, crop,
                                        steps, cfg, sampler_name, scheduler, denoise, image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent)

        elif sampler_state == "Sample" and adv_xyPlot is not None:
            return process_xyPlot(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, lora_name, lora_strength, lora_strength, steps, cfg, sampler_name, scheduler, denoise, image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent, adv_xyPlot)

        elif sampler_state == "Hold":
            return sampler.process_hold_state(pipe, image_output, my_unique_id)

```
