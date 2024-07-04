
# Documentation
- Class name: ttN pipeKSamplerAdvanced
- Category: ttN/legacy
- Output node: True

ttN pipeKSamplerAdvanced节点旨在通过引入先进技术和参数来增强采样管道中的采样过程。它的目标是提供对生成过程更多的控制和灵活性，允许使用能够适应各种需求和场景的自定义采样策略。

# Input types
## Required
- pipe
    - 未知
    - Comfy dtype: PIPE_LINE
    - Python dtype: unknown
- lora_name
    - 定义要使用的LoRA（低秩适应）模型名称，通过应用特定的模型适应来增强采样过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_model_strength
    - 指定LoRA适应对模型调整的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_clip_strength
    - 决定通过LoRA适应应用的clip调整的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- upscale_method
    - 指示采样过程中用于图像放大的方法，影响图像质量和分辨率。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- factor
    - 定义图像放大的倍数，直接影响输出图像大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- crop
    - 指定是否以及如何裁剪输出图像，影响最终图像构图。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sampler_state
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- add_noise
    - 指示是否在采样过程中添加噪声，影响生成图像的纹理和细节。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- steps
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- cfg
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- sampler_name
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- scheduler
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- start_at_step
    - 定义采样过程的起始步骤，允许控制生成的初始状态。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 设置采样过程的结束步骤，决定生成何时结束。
    - Comfy dtype: INT
    - Python dtype: int
- return_with_leftover_noise
    - 指定输出是否包含剩余噪声，影响最终图像的纹理和细节。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- image_output
    - 指示生成图像的格式或目的地，影响输出的保存方式和位置。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- save_prefix
    - 定义保存文件名的前缀，以一致的方式组织输出。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- noise_seed
    - 设置噪声生成的种子，确保采样过程的可重现性。
    - Comfy dtype: INT
    - Python dtype: int
- optional_model
    - 允许指定用于采样的替代模型，提供模型使用的灵活性。
    - Comfy dtype: MODEL
    - Python dtype: str
- optional_positive
    - 允许包含额外的正面条件，细化生成朝向期望的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- optional_negative
    - 允许添加负面条件，引导生成远离某些属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- optional_latent
    - 提供选项包含特定的潜在空间配置，影响生成的起点。
    - Comfy dtype: LATENT
    - Python dtype: str
- optional_vae
    - 允许使用替代VAE模型，影响编码和解码过程。
    - Comfy dtype: VAE
    - Python dtype: str
- optional_clip
    - 允许指定替代CLIP模型，影响文本和图像特征之间的对齐。
    - Comfy dtype: CLIP
    - Python dtype: str
- xyPlot
    - 指定XY数据绘图的配置，可能用于可视化采样过程的各个方面。
    - Comfy dtype: XYPLOT
    - Python dtype: str

# Output types
- pipe
    - 应用高级采样技术后修改的管道配置。
    - Comfy dtype: PIPE_LINE
    - Python dtype: object
- model
    - 在高级采样过程中使用或修改的模型。
    - Comfy dtype: MODEL
    - Python dtype: str
- positive
    - 采样过程中应用或生成的正面条件因素。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 采样过程中应用或生成的负面条件因素。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent
    - 采样过程产生的潜在空间配置。
    - Comfy dtype: LATENT
    - Python dtype: str
- vae
    - 采样过程中使用或修改的VAE模型。
    - Comfy dtype: VAE
    - Python dtype: str
- clip
    - 采样过程中使用或修改的CLIP模型。
    - Comfy dtype: CLIP
    - Python dtype: str
- image
    - 高级采样过程生成的最终图像输出。
    - Comfy dtype: IMAGE
    - Python dtype: str
- seed
    - 采样过程中使用的种子，影响可重现性。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeKSamplerAdvanced:
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

                "add_noise": (["enable", "disable"], ),

                "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),

                "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                "return_with_leftover_noise": (["disable", "enable"], ),

                "image_output": (["Hide", "Preview", "Save", "Hide/Save"],),
                "save_prefix": ("STRING", {"default": "ComfyUI"})
                },
                "optional": 
                {"noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
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
                 "ttNnodeVersion": ttN_pipeKSamplerAdvanced.version},
        }

    RETURN_TYPES = ("PIPE_LINE", "MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "IMAGE", "INT",)
    RETURN_NAMES = ("pipe", "model", "positive", "negative", "latent","vae", "clip", "image", "seed", )
    OUTPUT_NODE = True
    FUNCTION = "sample"
    CATEGORY = "ttN/legacy"

    def sample(self, pipe,
               lora_name, lora_model_strength, lora_clip_strength,
               sampler_state, add_noise, steps, cfg, sampler_name, scheduler, image_output, save_prefix, denoise=1.0, 
               noise_seed=None, optional_model=None, optional_positive=None, optional_negative=None, optional_latent=None, optional_vae=None, optional_clip=None, xyPlot=None, upscale_method=None, factor=None, crop=None, prompt=None, extra_pnginfo=None, my_unique_id=None, start_at_step=None, end_at_step=None, return_with_leftover_noise=False):
        
        force_full_denoise = True
        if return_with_leftover_noise == "enable":
            force_full_denoise = False

        disable_noise = False
        if add_noise == "disable":
            disable_noise = True
            
        out = ttN_TSC_pipeKSampler.sample(self, pipe, lora_name, lora_model_strength, lora_clip_strength, sampler_state, steps, cfg, sampler_name, scheduler, image_output, save_prefix, denoise, 
               optional_model, optional_positive, optional_negative, optional_latent, optional_vae, optional_clip, noise_seed, xyPlot, upscale_method, factor, crop, prompt, extra_pnginfo, my_unique_id, start_at_step, end_at_step, force_full_denoise, disable_noise)

        return out 

```
