
# Documentation
- Class name: Fooocus_KSamplerEfficient
- Category: Art Venture/Sampling
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Fooocus_KSamplerEfficient节点通过引入锐度参数来增强艺术生成中的采样过程，从而实现对生成图像的纹理和细节水平的更精确控制。该节点在基础采样能力的基础上，提供了一种先进的、以效率为中心的艺术创作方法。

# Input types
## Required
- model
    - 指定用于采样过程的模型，这对确定艺术生成的基本风格和特征至关重要。
    - Comfy dtype: MODEL
    - Python dtype: str
- seed
    - seed参数通过将随机数生成器初始化为特定状态，确保艺术生成过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 定义采样过程中的步骤数，影响生成艺术的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置采样过程的条件因子，影响生成的创造性和连贯性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 确定要使用的具体采样算法，影响生成艺术的纹理和细节。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 指定用于控制采样过程的调度器，影响艺术生成的进展和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 定义正面条件，引导艺术生成朝向期望的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 设置负面条件，避免生成艺术中出现某些属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - 提供初始潜在图像，供采样过程转换。
    - Comfy dtype: LATENT
    - Python dtype: object
- denoise
    - 调整应用于生成艺术的去噪水平，影响清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- preview_method
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- vae_decode
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
## Optional
- optional_vae
    - 未知
    - Comfy dtype: VAE
    - Python dtype: unknown
- script
    - 未知
    - Comfy dtype: SCRIPT
    - Python dtype: unknown
- sharpness
    - 锐度参数允许用户调整生成艺术中的细节和纹理水平，提供了一种微调视觉输出的方法，以实现更精确的艺术控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MODEL
    - Comfy dtype: MODEL
    - 未知
    - Python dtype: unknown
- CONDITIONING+
    - Comfy dtype: CONDITIONING
    - 未知
    - Python dtype: unknown
- CONDITIONING-
    - Comfy dtype: CONDITIONING
    - 未知
    - Python dtype: unknown
- LATENT
    - Comfy dtype: LATENT
    - 输出的潜在图像代表最终生成的艺术，包含了通过输入参数指定的视觉特征。
    - Python dtype: object
- VAE
    - Comfy dtype: VAE
    - 未知
    - Python dtype: unknown
- IMAGE
    - Comfy dtype: IMAGE
    - 未知
    - Python dtype: unknown


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class KSamplerEfficientWithSharpness(TSC_KSampler):
        @classmethod
        def INPUT_TYPES(cls):
            inputs = TSC_KSampler.INPUT_TYPES()
            inputs["optional"]["sharpness"] = (
                "FLOAT",
                {"default": 2.0, "min": 0.0, "max": 100.0, "step": 0.01},
            )

            return inputs

        CATEGORY = "Art Venture/Sampling"

        def sample(self, *args, sharpness=2.0, **kwargs):
            patch.sharpness = sharpness
            patch.patch_all()
            results = super().sample(*args, **kwargs)
            patch.unpatch_all()
            return results

```
