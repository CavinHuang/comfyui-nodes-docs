
# Documentation
- Class name: `KSampler SDXL (Eff.)`
- Category: `Efficiency Nodes/Sampling`
- Output node: `True`
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

KSampler SDXL (Eff.)节点是专为Stable Diffusion XL模型设计的高效采样工具。它在常规和高级KSampler节点的基础上进行了扩展，引入了专门针对SDXL模型的采样策略。这些策略能够处理更大的模型规模，同时在不牺牲生成样本质量的前提下优化性能。该节点特别适合处理SDXL模型的独特需求，如更大的模型尺寸和更复杂的采样要求。

# Input types
## Required
- sdxl_tuple
    - 这是Stable Diffusion XL的模型参数和配置的集合，是采样过程的核心输入。它对定义采样操作的行为和性能至关重要。
    - Comfy dtype: SDXL_TUPLE
    - Python dtype: tuple
- noise_seed
    - 用于初始化噪声生成过程的种子值。它确保了模型生成样本的可重复性和一致性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 指定采样过程中要执行的步骤数。这直接影响生成图像的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 调节文本提示对生成图像影响的条件因子。它允许对采样过程进行更精细的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 标识要使用的特定采样器配置。这使得可以针对不同的用例自定义和优化采样过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 决定采样过程的调度策略，影响图像生成的进程和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- latent_image
    - 作为采样过程起点的初始潜在图像输入。这个输入可以在后续步骤中被修改或细化。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- start_at_step
    - 定义采样过程的起始步骤。这允许继续或细化先前生成的样本。
    - Comfy dtype: INT
    - Python dtype: int
- refine_at_step
    - 指定应用细化操作的步骤，用于增强生成图像的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- preview_method
    - 指示在采样过程中用于生成样本预览的方法。这有助于评估和调整参数。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- vae_decode
    - 一个标志，指示是否应使用VAE解码器将潜在表示转换回图像空间。这会影响最终输出的质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool

## Optional
- optional_vae
    - 一个可选的VAE模型，可用于采样过程中的额外图像细化或处理。
    - Comfy dtype: VAE
    - Python dtype: tuple
- script
    - 一个可选脚本，可以作为采样过程的一部分执行，允许自定义操作或修改。
    - Comfy dtype: SCRIPT
    - Python dtype: str

# Output types
- SDXL_TUPLE
    - Stable Diffusion XL模型特有的输出元组，封装了采样后模型的状态。
    - Comfy dtype: SDXL_TUPLE
    - Python dtype: tuple
- LATENT
    - 采样过程中生成的图像的潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- VAE
    - 采样过程中使用的VAE模型（如果适用）。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- IMAGE
    - 从采样过程生成的最终图像输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [Image Filter Adjustments](../../was-node-suite-comfyui/Nodes/Image Filter Adjustments.md)
    - [IterativeLatentUpscale](../../ComfyUI-Impact-Pack/Nodes/IterativeLatentUpscale.md)



## Source code
```python
class TSC_KSamplerSDXL(TSC_KSampler):

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"sdxl_tuple": ("SDXL_TUPLE",),
                     "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                     "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                     "latent_image": ("LATENT",),
                     "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     "refine_at_step": ("INT", {"default": -1, "min": -1, "max": 10000}),
                     "preview_method": (["auto", "latent2rgb", "taesd", "none"],),
                     "vae_decode": (["true", "true (tiled)", "false", "output only", "output only (tiled)"],),
                     },
                "optional": {"optional_vae": ("VAE",),
                             "script": ("SCRIPT",),},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",},
                }

    RETURN_TYPES = ("SDXL_TUPLE", "LATENT", "VAE", "IMAGE",)
    RETURN_NAMES = ("SDXL_TUPLE", "LATENT", "VAE", "IMAGE",)
    OUTPUT_NODE = True
    FUNCTION = "sample_sdxl"
    CATEGORY = "Efficiency Nodes/Sampling"

    def sample_sdxl(self, sdxl_tuple, noise_seed, steps, cfg, sampler_name, scheduler, latent_image,
               start_at_step, refine_at_step, preview_method, vae_decode, prompt=None, extra_pnginfo=None,
               my_unique_id=None, optional_vae=(None,), refiner_extras=None, script=None):
        # sdxl_tuple sent through the 'model' channel
        negative = None
        return super().sample(sdxl_tuple, noise_seed, steps, cfg, sampler_name, scheduler,
               refiner_extras, negative, latent_image, preview_method, vae_decode, denoise=1.0,
               prompt=prompt, extra_pnginfo=extra_pnginfo, my_unique_id=my_unique_id, optional_vae=optional_vae,
               script=script, add_noise=None, start_at_step=start_at_step, end_at_step=refine_at_step,
               return_with_leftover_noise=None,sampler_type="sdxl")

```
