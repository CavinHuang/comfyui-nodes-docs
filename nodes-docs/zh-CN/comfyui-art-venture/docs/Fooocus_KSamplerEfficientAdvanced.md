
# Documentation
- Class name: `Fooocus_KSamplerEfficientAdvanced`
- Category: `Art Venture/Sampling`
- Output node: `True`
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

该节点是一个高级采样器，专为艺术创作中的高效采样而设计。它在基础KSampler的功能上增加了锐度参数，旨在提升采样输出的精确度和细节，从而在生成的艺术作品中实现更高的精细度。

# Input types
## Required
- model
    - 指定用于采样的模型，是生成艺术的基础。
    - Comfy dtype: MODEL
    - Python dtype: str
- seed
    - 决定采样的随机种子，确保结果的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 定义采样过程中的步骤数，影响输出的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 控制条件因子，影响生成艺术的引导和连贯性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 选择特定的采样算法，影响生成艺术的纹理和特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择控制采样过程的调度器，影响输出的进程和变化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 设置正面条件，引导采样朝向所需属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 设置负面条件，引导采样远离不需要的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - 提供初始潜在图像作为采样的起点，为进一步修改提供基础。
    - Comfy dtype: LATENT
    - Python dtype: str
- denoise
    - 调整应用于采样输出的降噪水平，提升清晰度和锐度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- preview_method
    - 指定预览采样结果的方法，增强用户评估和调整过程的能力。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- vae_decode
    - 决定是否使用VAE模型解码潜在表示，影响最终图像质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool

## Optional
- optional_vae
    - 可选择指定用于解码的VAE模型，提供模型选择的灵活性。
    - Comfy dtype: VAE
    - Python dtype: str
- script
    - 允许在采样过程中执行自定义脚本，提供扩展的定制和控制能力。
    - Comfy dtype: SCRIPT
    - Python dtype: str
- sharpness
    - 锐度参数允许微调采样输出的锐度水平，增强生成艺术中的细节和清晰度。它在实现艺术品所需的细节和纹理水平方面起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- MODEL
    - 用于采样过程的模型，封装了计算框架。
    - Comfy dtype: MODEL
    - Python dtype: str
- CONDITIONING+
    - 采样过程中应用的正面条件，引导生成朝向所需属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- CONDITIONING-
    - 采样过程中应用的负面条件，引导生成远离不需要的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- LATENT
    - 采样艺术的最终潜在表示，封装了视觉内容和风格。
    - Comfy dtype: LATENT
    - Python dtype: str
- VAE
    - 用于解码潜在表示的VAE模型（如果适用），影响最终图像质量。
    - Comfy dtype: VAE
    - Python dtype: str
- IMAGE
    - 采样过程的最终图像输出，代表生成的艺术作品。
    - Comfy dtype: IMAGE
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class KSamplerEfficientAdvancedWithSharpness(TSC_KSamplerAdvanced):
        @classmethod
        def INPUT_TYPES(cls):
            inputs = TSC_KSampler.INPUT_TYPES()
            inputs["optional"]["sharpness"] = (
                "FLOAT",
                {"default": 2.0, "min": 0.0, "max": 100.0, "step": 0.01},
            )

            return inputs

        CATEGORY = "Art Venture/Sampling"

        def sampleadv(self, *args, sharpness=2.0, **kwargs):
            patch.sharpness = sharpness
            patch.patch_all()
            results = super().sampleadv(*args, **kwargs)
            patch.unpatch_all()
            return results

```
