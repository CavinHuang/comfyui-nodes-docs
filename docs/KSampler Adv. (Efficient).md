
# Documentation
- Class name: KSampler Adv. (Efficient)
- Category: Efficiency Nodes/Sampling
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

KSampler Adv. (Efficient)节点专门用于高级采样技术,以高效的方式生成或优化图像。它利用增强的算法来优化采样过程,确保在减少计算需求的同时,产出高质量的结果。

# Input types
## Required
- model
    - 指定用于采样的模型,对于确定生成图像的特征和质量至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- add_noise
    - 决定是否在采样过程中添加噪声,影响生成图像的纹理和真实感。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- noise_seed
    - 设置噪声生成的种子,确保采样过程中引入的随机性可重现。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 定义采样过程中执行的步骤数,影响输出的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 指定采样过程的配置,影响生成的创造性和连贯性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 标识要使用的特定采样器算法,影响采样过程的效率和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择控制采样步骤的调度器,对优化生成过程至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 提供正面条件,引导采样朝向所需的属性或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 应用负面条件,以避免采样过程中出现不需要的属性或主题。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - 输入一个潜在图像进行优化或进一步处理,作为采样的起点。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- start_at_step
    - 定义采样过程的起始步骤,允许自定义生成或优化阶段。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 指定采样过程的结束步骤,能够控制采样的持续时间和深度。
    - Comfy dtype: INT
    - Python dtype: int
- return_with_leftover_noise
    - 决定是否返回带有剩余噪声的采样图像,影响最终图像的外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- preview_method
    - 指定用于预览采样过程的方法,有助于可视化生成进度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- vae_decode
    - 指示是否对采样的潜在图像使用VAE解码,影响最终图像的质量和风格。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- optional_vae
    - 提供可选的VAE模型用于解码,为采样后处理提供灵活性。
    - Comfy dtype: VAE
    - Python dtype: tuple
- script
    - 允许在采样过程中执行自定义脚本,实现高级定制。
    - Comfy dtype: SCRIPT
    - Python dtype: str

# Output types
- MODEL
    - Comfy dtype: MODEL
    - 输出采样过程中使用的模型。
    - Python dtype: torch.nn.Module
- CONDITIONING+
    - Comfy dtype: CONDITIONING
    - 提供采样过程中应用的正面条件,引导生成朝向所需属性。
    - Python dtype: str
- CONDITIONING-
    - Comfy dtype: CONDITIONING
    - 提供用于引导采样远离不需要属性的负面条件。
    - Python dtype: str
- LATENT
    - Comfy dtype: LATENT
    - 输出采样图像的潜在表示,可用于进一步处理或转换为图像。
    - Python dtype: torch.Tensor
- VAE
    - Comfy dtype: VAE
    - 返回采样过程中使用的VAE模型(如果有)。
    - Python dtype: torch.nn.Module
- IMAGE
    - Comfy dtype: IMAGE
    - 生成采样和可选后处理步骤的最终图像结果。
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [ReActorFaceSwap](../../comfyui-reactor-node/Nodes/ReActorFaceSwap.md)
    - [VAEEncodeTiled](../../Comfy/Nodes/VAEEncodeTiled.md)
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)



## Source code
```python
class TSC_KSamplerAdvanced(TSC_KSampler):

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"model": ("MODEL",),
                     "add_noise": (["enable", "disable"],),
                     "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                     "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                     "positive": ("CONDITIONING",),
                     "negative": ("CONDITIONING",),
                     "latent_image": ("LATENT",),
                     "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                     "return_with_leftover_noise": (["disable", "enable"],),
                     "preview_method": (["auto", "latent2rgb", "taesd", "none"],),
                     "vae_decode": (["true", "true (tiled)", "false", "output only", "output only (tiled)"],),
                     },
                "optional": {"optional_vae": ("VAE",),
                             "script": ("SCRIPT",), },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID", },
                }

    RETURN_TYPES = ("MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "IMAGE",)
    RETURN_NAMES = ("MODEL", "CONDITIONING+", "CONDITIONING-", "LATENT", "VAE", "IMAGE",)
    OUTPUT_NODE = True
    FUNCTION = "sample_adv"
    CATEGORY = "Efficiency Nodes/Sampling"

    def sample_adv(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative,
               latent_image, start_at_step, end_at_step, return_with_leftover_noise, preview_method, vae_decode,
               prompt=None, extra_pnginfo=None, my_unique_id=None, optional_vae=(None,), script=None):

        return super().sample(model, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative,
               latent_image, preview_method, vae_decode, denoise=1.0, prompt=prompt, extra_pnginfo=extra_pnginfo, my_unique_id=my_unique_id,
               optional_vae=optional_vae, script=script, add_noise=add_noise, start_at_step=start_at_step,end_at_step=end_at_step,
                       return_with_leftover_noise=return_with_leftover_noise,sampler_type="advanced")

```
