
# Documentation
- Class name: ttN KSampler_v2
- Category: ttN
- Output node: True

ttN KSampler_v2节点是一个先进的采样操作工具，它利用多种技术来生成或操作数据，基于特定的输入参数。该节点专注于提供一种灵活高效的方法来从复杂分布中进行采样，常用于生成模型任务中。

# Input types
## Required
- model
    - 指定用于采样的生成模型。这个参数至关重要，因为它决定了底层机制和生成样本的质量。
    - Comfy dtype: MODEL
    - Python dtype: str
- positive
    - 提供正向条件引导，以引导采样朝向期望的特征或特性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 提供负向条件引导，以使采样远离某些特征或特性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent
    - 可选地包含一个潜在表示，作为采样过程的起点或参考。
    - Comfy dtype: LATENT
    - Python dtype: str
- vae
    - 指定与生成模型一起使用的VAE模型进行采样。
    - Comfy dtype: VAE
    - Python dtype: str
- clip
    - 指定用于调节采样过程的CLIP模型。
    - Comfy dtype: CLIP
    - Python dtype: str
- lora_name
    - 指定用于调整采样过程的LoRA模型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_strength
    - 确定在采样过程中应用的LoRA调整的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- upscale_method
    - 指定在采样过程中用于放大图像的方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- upscale_model_name
    - 指定在采样过程中用于放大图像的放大模型名称。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- factor
    - 指定在采样过程中图像放大的倍数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rescale
    - 确定在采样过程中是否以及如何重新缩放图像。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- percent
    - 指定在采样过程中图像重新缩放的百分比。
    - Comfy dtype: INT
    - Python dtype: float
- width
    - 指定重新缩放或裁剪后图像的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定重新缩放或裁剪后图像的高度。
    - Comfy dtype: INT
    - Python dtype: int
- longer_side
    - 指定重新缩放后图像的较长边尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- crop
    - 指定在采样过程中使用的裁剪参数。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sampler_state
    - 指定在采样过程中使用的采样器状态。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- steps
    - 定义采样过程中要采取的步骤数，影响生成样本的粒度和可能的质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 控制条件因子，可以影响采样过程的方向和空间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 确定要使用的具体采样算法，影响采样的效率和特性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择用于控制采样过程的调度算法，可以影响样本的收敛和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- denoise
    - 调整采样过程中应用的去噪水平，影响生成样本的清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- image_output
    - 指定采样过程中生成的图像的输出格式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- save_prefix
    - 指定采样过程中生成的图像的保存前缀。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- seed
    - 设置随机数生成的初始种子，确保采样过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- input_image_override
    - 允许输入图像覆盖采样过程的起点。
    - Comfy dtype: IMAGE
    - Python dtype: str
- adv_xyPlot
    - 指定采样过程中可视化的高级绘图选项。
    - Comfy dtype: ADV_XYPLOT
    - Python dtype: str

# Output types
- pipe
    - Comfy dtype: PIPE_LINE
    - 生成一个综合输出，包括模型配置和采样数据，准备进行进一步处理。
    - Python dtype: dict
- model
    - Comfy dtype: MODEL
    - 返回采样过程中使用的模型，包括任何修改或配置。
    - Python dtype: str
- positive
    - Comfy dtype: CONDITIONING
    - 返回采样过程中使用的正向条件参数。
    - Python dtype: str
- negative
    - Comfy dtype: CONDITIONING
    - 返回采样过程中使用的负向条件参数。
    - Python dtype: str
- latent
    - Comfy dtype: LATENT
    - unknown
    - Python dtype: unknown
- vae
    - Comfy dtype: VAE
    - 返回采样过程中使用的VAE模型。
    - Python dtype: str
- clip
    - Comfy dtype: CLIP
    - 返回采样过程中用于条件设置的CLIP模型。
    - Python dtype: str
- image
    - Comfy dtype: IMAGE
    - 返回从采样过程生成的图像或图像集。
    - Python dtype: str
- seed
    - Comfy dtype: INT
    - 返回采样过程中用于随机数生成的种子值。
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ttN_KSampler_v2:
    version = '2.0.0'
    upscale_methods = ["None",
                       "[latent] nearest-exact", "[latent] bilinear", "[latent] area", "[latent] bicubic", "[latent] lanczos", "[latent] bislerp",
                       "[hiresFix] nearest-exact", "[hiresFix] bilinear", "[hiresFix] area", "[hiresFix] bicubic", "[hiresFix] lanczos", "[hiresFix] bislerp"]
    crop_methods = ["disabled", "center"]

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                {
                "model": ("MODEL",),
                "positive": ("CONDITIONING",),
                "negative": ("CONDITIONING",),
                "latent": ("LATENT",),
                "vae": ("VAE",),
                "clip": ("CLIP",),

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
    CATEGORY = "ttN"

    def sample( self, model, positive, negative, latent, vae, clip,
                lora_name, lora_strength,
                sampler_state, steps, cfg, sampler_name, scheduler, image_output, save_prefix, denoise=1.0, 
                input_image_override=None,
                seed=None, adv_xyPlot=None, upscale_model_name=None, upscale_method=None, factor=None, rescale=None, percent=None, width=None, height=None, longer_side=None, crop=None,
                prompt=None, extra_pnginfo=None, my_unique_id=None, start_step=None, last_step=None, force_full_denoise=False, disable_noise=False):

        pipe = {"model": model,
                "positive": positive,
                "negative": negative,
                "vae": vae,
                "clip": clip,

                "samples": latent,
                "images": input_image_override,
                "seed": seed,

                "loader_settings": None
                }

        return ttN_pipeKSampler_v2.sample(self, pipe, lora_name, lora_strength, sampler_state, steps, cfg, sampler_name, scheduler, image_output, save_prefix, denoise, 
                None, None, None, None, None, None, input_image_override, seed, adv_xyPlot, upscale_model_name, upscale_method, factor, rescale, percent, width, height, longer_side, crop, prompt, extra_pnginfo, my_unique_id, None, None, force_full_denoise, disable_noise)

```
