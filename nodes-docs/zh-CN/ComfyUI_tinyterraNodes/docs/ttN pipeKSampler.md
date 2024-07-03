
# Documentation
- Class name: ttN pipeKSampler
- Category: ttN/legacy
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ttN_pipeKSampler节点旨在简化高级采样技术的应用，用于图像生成。它整合了模型输入、采样配置和图像处理参数，为用户提供了一个简洁的界面，以生成具有特定属性或修改的图像。该节点通过抽象化复杂的采样过程配置和执行，大大简化了用户的操作流程。

# Input types
## Required
- pipe
    - 包含采样过程所需的各种配置设置和模型参数的结构化输入。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- lora_name
    - 指定要使用的LoRA模型，影响生成模型的适应性和微调效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_model_strength
    - 决定LoRA模型对生成模型的影响强度，调整适应程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_clip_strength
    - 控制LoRA模型对CLIP模型的影响强度，调整语义理解能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- upscale_method
    - 定义用于放大生成图像的方法，影响图像分辨率和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- factor
    - 图像放大的倍数，直接影响最终图像大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- crop
    - 指定生成图像的裁剪参数，影响最终图像构图。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: dict
- sampler_state
    - 图像生成过程中使用的采样器状态，影响采样行为。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: dict
- steps
    - 运行采样过程的步骤数，影响生成图像的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置引导因子，影响生成图像的连贯性和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 使用的采样器算法名称，决定采样技术。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 指定用于控制采样过程的调度器，影响图像生成的进程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- denoise
    - 图像生成过程中应用的去噪因子，影响图像清晰度和噪声水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- image_output
    - 生成图像的输出路径，决定图像保存位置。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- save_prefix
    - 添加到保存图像名称前的前缀，辅助图像组织和识别。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- seed
    - 用于采样过程的随机种子，确保生成图像的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- optional_model
    - 可选的模型参数，允许指定替代生成模型。
    - Comfy dtype: MODEL
    - Python dtype: str
- optional_positive
    - 可选的正面提示，引导图像生成朝向特定主题或元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[str]
- optional_negative
    - 可选的负面提示，引导图像生成远离特定主题或元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[str]
- optional_latent
    - 可选的初始潜在空间输入，作为图像生成过程的起点。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- optional_vae
    - 可选的变分自编码器，用于增强图像生成过程。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- optional_clip
    - 可选的CLIP模型，用于图像和文本的语义理解，帮助生成的图像与提供的提示保持一致。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- xyPlot
    - 指定生成XY图的参数，可能用于可视化采样过程的某些方面。
    - Comfy dtype: XYPLOT
    - Python dtype: dict

# Output types
- pipe
    - 包含采样过程结果的更新后的pipe结构，包括配置和生成的图像。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- model
    - 采样过程中使用的生成模型，可能经过LoRA或其他参数的修改。
    - Comfy dtype: MODEL
    - Python dtype: str
- positive
    - 用于引导图像生成过程的正面提示列表。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[str]
- negative
    - 用于细化图像生成过程的负面提示列表。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[str]
- latent
    - 采样过程产生的潜在空间表示。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - 图像生成过程中涉及的变分自编码器。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- clip
    - 采样过程中用于语义理解的CLIP模型。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- image
    - 采样过程最终生成的图像或图像集。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- seed
    - 采样过程中使用的种子值，影响结果的随机性和可重复性。
    - Comfy dtype: INT
    - Python dtype: int


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
