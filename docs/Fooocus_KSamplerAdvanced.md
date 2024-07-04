
# Documentation
- Class name: Fooocus_KSamplerAdvanced
- Category: Art Venture/Sampling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Fooocus_KSamplerAdvanced节点通过引入锐化参数来增强艺术生成中的采样过程，从而更精确地控制生成作品的纹理和细节。该节点在高级采样功能的基础上，将锐化调整直接整合到采样工作流程中，以优化视觉输出。

# Input types
## Required
- model
    - 指定用于采样过程的模型，作为生成艺术作品的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: str
- add_noise
    - 决定是否在采样过程中添加噪声，影响生成作品的纹理和细节。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- noise_seed
    - 设置噪声生成的种子，确保艺术作品纹理和细节的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 定义采样过程中的步骤数，影响生成作品的精细程度和细节。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 控制采样过程的配置，影响模型引导和生成细节之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 选择特定的采样器，影响模型潜在空间的遍历方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择采样过程的调度器，决定步骤的进程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 提供正面条件，引导采样朝向期望的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 提供负面条件，引导采样远离不期望的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - 输入初始潜在图像作为采样过程的起点。
    - Comfy dtype: LATENT
    - Python dtype: str
- start_at_step
    - 指定采样过程的起始步骤，允许中途干预。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 定义采样过程的结束步骤，决定其完成点。
    - Comfy dtype: INT
    - Python dtype: int
- return_with_leftover_noise
    - 控制输出是否包含剩余噪声，影响最终纹理。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
## Optional
- sharpness
    - sharpness参数允许用户调整生成作品中的细节和纹理水平，提供了一种微调视觉输出以实现更精确艺术控制的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 采样艺术作品的输出潜在表示，反映了所有输入参数的综合效果。
    - Comfy dtype: LATENT
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class KSamplerAdvancedWithSharpness(KSamplerAdvanced):
    @classmethod
    def INPUT_TYPES(cls):
        inputs = KSamplerAdvanced.INPUT_TYPES()
        inputs["optional"] = {
            "sharpness": (
                "FLOAT",
                {"default": 2.0, "min": 0.0, "max": 100.0, "step": 0.01},
            )
        }

        return inputs

    CATEGORY = "Art Venture/Sampling"

    def sample(self, *args, sharpness=2.0, **kwargs):
        patch.sharpness = sharpness
        patch_all()
        results = super().sample(*args, **kwargs)
        unpatch_all()
        return results

```
