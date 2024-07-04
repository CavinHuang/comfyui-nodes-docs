
# Documentation
- Class name: ttN pipeKSamplerSDXL
- Category: ttN/legacy
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ttN_pipeKSamplerSDXL节点是为高级图像采样设计的，它利用复杂的管道来增强图像生成，具有特定的配置和改进。该节点集成了各种组件，如LoRA调整、噪声控制和可选模型输入，以定制图像生成过程，旨在生成具有精细调整特征的高质量图像。

# Input types
## Required
- sdxl_pipe
    - 表示采样管道的当前状态，包括配置和中间结果，这对于继续或调整图像生成过程至关重要。
    - Comfy dtype: PIPE_LINE_SDXL
    - Python dtype: dict
- upscale_method
    - 指定用于图像放大的方法，影响输出图像的分辨率和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- factor
    - 确定放大的缩放因子，直接影响最终图像的大小和细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- crop
    - 定义应用于生成图像的裁剪参数，调整构图和焦点区域。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sampler_state
    - 指示采样器的当前状态，指导采样过程的流程并确定下一步骤。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- base_steps
    - 指定基本采样过程的步骤数，影响生成图像的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_steps
    - 确定细化过程的步骤数，通过额外调整增强最终图像质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 控制CFG（无分类器指导）尺度，影响对输入提示的遵守程度和整体图像质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 标识要使用的特定采样器算法，影响采样行为和输出特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 指定控制采样过程的调度器，影响图像生成过程中的进展和调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- image_output
    - 确定生成图像的输出格式和处理方式，包括保存和显示选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- save_prefix
    - 设置保存图像文件的前缀，用于组织和识别输出。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- seed
    - 为随机数生成器提供种子，确保生成图像的可重现性。
    - Comfy dtype: INT
    - Python dtype: int
- optional_model
    - 允许指定用于图像生成的替代模型，为采样过程提供灵活性。
    - Comfy dtype: MODEL
    - Python dtype: str
- optional_positive
    - 允许使用替代性正面提示，调整生成图像的主题方向。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- optional_negative
    - 允许指定替代性负面提示，细化图像生成中的避免标准。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- optional_vae
    - 提供使用替代VAE模型的选项，影响图像的编码和解码。
    - Comfy dtype: VAE
    - Python dtype: str
- optional_refiner_model
    - 允许使用不同的模型来细化生成的图像，增强最终输出质量。
    - Comfy dtype: MODEL
    - Python dtype: str
- optional_refiner_positive
    - 允许在细化过程中使用替代性正面提示，进一步指导图像增强。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- optional_refiner_negative
    - 允许在细化过程中指定替代性负面提示，微调避免标准。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- optional_refiner_vae
    - 未知
    - Comfy dtype: VAE
    - Python dtype: unknown
- optional_latent
    - 提供指定替代潜在表示的选项，影响生成过程的起点。
    - Comfy dtype: LATENT
    - Python dtype: str
- optional_clip
    - 允许使用替代CLIP模型，影响文本提示与生成图像之间的对齐。
    - Comfy dtype: CLIP
    - Python dtype: str

# Output types
- sdxl_pipe
    - 输出更新后的采样管道状态，包括当前采样操作的任何变化或结果。
    - Comfy dtype: PIPE_LINE_SDXL
    - Python dtype: dict
- model
    - 返回采样过程中使用的模型，可能基于可选输入进行了更新或改变。
    - Comfy dtype: MODEL
    - Python dtype: str
- positive
    - 提供图像生成中使用的正面提示，反映任何可选的调整。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 返回指导图像生成中避免标准的负面提示。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- vae
    - 输出采样过程中参与图像编码和解码的VAE模型。
    - Comfy dtype: VAE
    - Python dtype: str
- refiner_model
    - 提供用于细化生成图像的模型，可能基于可选输入进行了更新或改变。
    - Comfy dtype: MODEL
    - Python dtype: str
- refiner_positive
    - 返回细化过程中使用的正面提示，反映任何可选的调整。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- refiner_negative
    - 提供细化过程中使用的负面提示，指导避免标准。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- refiner_vae
    - 未知
    - Comfy dtype: VAE
    - Python dtype: unknown
- latent
    - 输出生成图像的潜在表示，是图像生成和细化过程的核心。
    - Comfy dtype: LATENT
    - Python dtype: str
- clip
    - 返回用于将文本提示与生成图像对齐的CLIP模型，可能基于可选输入进行了更新。
    - Comfy dtype: CLIP
    - Python dtype: str
- image
    - 提供最终生成的图像，展示采样和细化过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: str
- seed
    - 输出随机数生成器中使用的种子，确保生成图像的可重现性。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeKSamplerSDXL:
    version = '1.0.2'
    upscale_methods = ["None", "nearest-exact", "bilinear", "area", "bicubic", "lanczos", "bislerp"]
    crop_methods = ["disabled", "center"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"sdxl_pipe": ("PIPE_LINE_SDXL",),

                    "upscale_method": (cls.upscale_methods,),
                    "factor": ("FLOAT", {"default": 2, "min": 0.0, "max": 10.0, "step": 0.25}),
                    "crop": (cls.crop_methods,),
                    "sampler_state": (["Sample", "Hold"], ),

                    "base_steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "refiner_steps": ("INT", {"default": 20, "min": 0, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                    "image_output": (["Hide", "Preview", "Save", "Hide/Save"],),
                    "save_prefix": ("STRING", {"default": "ComfyUI"})
                    },
                "optional": 
                    {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "optional_model": ("MODEL",),
                    "optional_positive": ("CONDITIONING",),
                    "optional_negative": ("CONDITIONING",),
                    "optional_vae": ("VAE",),
                    "optional_refiner_model": ("MODEL",),
                    "optional_refiner_positive": ("CONDITIONING",),
                    "optional_refiner_negative": ("CONDITIONING",),
                    "optional_refiner_vae": ("VAE",),
                    "optional_latent": ("LATENT",),
                    "optional_clip": ("CLIP",),
                    #"xyPlot": ("XYPLOT",),
                    },
                "hidden":
                    {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                    "embeddingsList": (folder_paths.get_filename_list("embeddings"),),
                    "ttNnodeVersion": ttN_pipeKSamplerSDXL.version
                    },
        }

    RETURN_TYPES = ("PIPE_LINE_SDXL", "MODEL", "CONDITIONING", "CONDITIONING", "VAE", "MODEL", "CONDITIONING", "CONDITIONING", "VAE", "LATENT", "CLIP", "IMAGE", "INT",)
    RETURN_NAMES = ("sdxl_pipe", "model", "positive", "negative" ,"vae", "refiner_model", "refiner_positive", "refiner_negative" ,"refiner_vae", "latent", "clip", "image", "seed", )
    OUTPUT_NODE = True
    FUNCTION = "sample"
    CATEGORY = "ttN/legacy"

    def sample(self, sdxl_pipe, sampler_state,
               base_steps, refiner_steps, cfg, sampler_name, scheduler, image_output, save_prefix, denoise=1.0, 
               optional_model=None, optional_positive=None, optional_negative=None, optional_latent=None, optional_vae=None, optional_clip=None,
               optional_refiner_model=None, optional_refiner_positive=None, optional_refiner_negative=None, optional_refiner_vae=None,
               seed=None, xyPlot=None, upscale_method=None, factor=None, crop=None, prompt=None, extra_pnginfo=None, my_unique_id=None,
               start_step=None, last_step=None, force_full_denoise=False, disable_noise=False):
        
        sdxl_pipe = {**sdxl_pipe}

        # Clean Loader Models from Global
        loader.update_loaded_objects(prompt)

        my_unique_id = int(my_unique_id)

        ttN_save = ttNsave(my_unique_id, prompt, extra_pnginfo)

        sdxl_samples = optional_latent if optional_latent is not None else sdxl_pipe["samples"]

        sdxl_model = optional_model if optional_model is not None else sdxl_pipe["model"]
        sdxl_positive = optional_positive if optional_positive is not None else sdxl_pipe["positive"]
        sdxl_negative = optional_negative if optional_negative is not None else sdxl_pipe["negative"]
        sdxl_vae = optional_vae if optional_vae is not None else sdxl_pipe["vae"]
        sdxl_clip = optional_clip if optional_clip is not None else sdxl_pipe["clip"]
        sdxl_refiner_model = optional_refiner_model if optional_refiner_model is not None else sdxl_pipe["refiner_model"]
        sdxl_refiner_positive = optional_refiner_positive if optional_refiner_positive is not None else sdxl_pipe["refiner_positive"]
        sdxl_refiner_negative = optional_refiner_negative if optional_refiner_negative is not None else sdxl_pipe["refiner_negative"]
        sdxl_refiner_vae = optional_refiner_vae if optional_refiner_vae is not None else sdxl_pipe["refiner_vae"]
        sdxl_refiner_clip = sdxl_pipe["refiner_clip"]

        if seed in (None, 'undefined'):
            sdxl_seed = sdxl_pipe["seed"]
        else:
            sdxl_seed = seed      

        def process_sample_state(sdxl_pipe, sdxl_samples, sdxl_model, sdxl_positive, sdxl_negative, sdxl_vae, sdxl_clip, sdxl_seed,
                                 sdxl_refiner_model, sdxl_refiner_positive, sdxl_refiner_negative, sdxl_refiner_vae, sdxl_refiner_clip,
                                 base_steps, refiner_steps, cfg, sampler_name, scheduler, denoise,
                                 image_output, save_prefix, prompt, my_unique_id, preview_latent, disable_noise=disable_noise):
            
            total_steps = base_steps + refiner_steps

            # Upscale samples if enabled
            sdxl_samples = sampler.handle_upscale(sdxl_samples, upscale_method, factor, crop)


            if (refiner_steps > 0) and (sdxl_refiner_model not in [None, "None"]):
                # Base Sample
                sdxl_samples = sampler.common_ksampler(sdxl_model, sdxl_seed, total_steps, cfg, sampler_name, scheduler, sdxl_positive, sdxl_negative, sdxl_samples,
                                                       denoise=denoise, preview_latent=preview_latent, start_step=0, last_step=base_steps, force_full_denoise=force_full_denoise, disable_noise=disable_noise)

                # Refiner Sample
                sdxl_samples = sampler.common_ksampler(sdxl_refiner_model, sdxl_seed, total_steps, cfg, sampler_name, scheduler, sdxl_refiner_positive, sdxl_refiner_negative, sdxl_samples,
                                                       denoise=denoise, preview_latent=preview_latent, start_step=base_steps, last_step=10000, force_full_denoise=True, disable_noise=True)
                
                latent = sdxl_samples["samples"]
                sdxl_images = sdxl_refiner_vae.decode(latent)
                del latent
            else:
                sdxl_samples = sampler.common_ksampler(sdxl_model, sdxl_seed, base_steps, cfg, sampler_name, scheduler, sdxl_positive, sdxl_negative, sdxl_samples,
                                                       denoise=denoise, preview_latent=preview_latent, start_step=0, last_step=base_steps, force_full_denoise=True, disable_noise=disable_noise)

                latent = sdxl_samples["samples"]
                sdxl_images = sdxl_vae.decode(latent)
                del latent

            results = ttN_save.images(sdxl_images, save_prefix, image_output)

            sampler.update_value_by_id("results", my_unique_id, results)

            # Clean loaded_objects
            loader.update_loaded_objects(prompt)

            new_sdxl_pipe = {"model": sdxl_model,
                "positive": sdxl_positive,
                "negative": sdxl_negative,
                "vae": sdxl_vae,
                "clip": sdxl_clip,

                "refiner_model": sdxl_refiner_model,
                "refiner_positive": sdxl_refiner_positive,
                "refiner_negative": sdxl_refiner_negative,
                "refiner_vae": sdxl_refiner_vae,
                "refiner_clip": sdxl_refiner_clip,

                "samples": sdxl_samples,
                "images": sdxl_images,
                "seed": sdxl_seed,
 
                "loader_settings": sdxl_pipe["loader_settings"],
            }
            
            del sdxl_pipe

            sampler.update_value_by_id("pipe_line", my_unique_id, new_sdxl_pipe)
            
            if image_output in ("Hide", "Hide/Save"):
                return sampler.get_output_sdxl(new_sdxl_pipe)
                        
            return {"ui": {"images": results},
                    "result": sampler.get_output_sdxl(new_sdxl_pipe)}

        def process_hold_state(sdxl_pipe, image_output, my_unique_id):
            ttNl('Held').t(f'pipeKSamplerSDXL[{my_unique_id}]').p()

            last_pipe = sampler.init_state(my_unique_id, "pipe_line", sdxl_pipe)

            last_results = sampler.init_state(my_unique_id, "results", list())

            if image_output in ("Hide", "Hide/Save"):
                return sampler.get_output_sdxl(last_pipe)

            return {"ui": {"images": last_results}, "result": sampler.get_output_sdxl(last_pipe)} 
        
        preview_latent = True
        if image_output in ("Hide", "Hide/Save"):
            preview_latent = False

        if sampler_state == "Sample" and xyPlot is None:
            return process_sample_state(sdxl_pipe, sdxl_samples, sdxl_model, sdxl_positive, sdxl_negative, sdxl_vae, sdxl_clip, sdxl_seed,
                                        sdxl_refiner_model, sdxl_refiner_positive, sdxl_refiner_negative, sdxl_refiner_vae, sdxl_refiner_clip, base_steps, refiner_steps, cfg, sampler_name, scheduler, denoise, image_output, save_prefix, prompt, my_unique_id, preview_latent)

        #elif sampler_state == "Sample" and xyPlot is not None:
        #    return process_xyPlot(sdxl_pipe, lora_name, lora_model_strength, lora_clip_strength, steps, cfg, sampler_name, scheduler, denoise, image_output, save_prefix, prompt, extra_pnginfo, my_unique_id, preview_latent, xyPlot)

        elif sampler_state == "Hold":
            return process_hold_state(sdxl_pipe, image_output, my_unique_id)

```
