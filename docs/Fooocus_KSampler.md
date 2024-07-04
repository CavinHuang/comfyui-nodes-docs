
# Documentation
- Class name: Fooocus_KSampler
- Category: Art Venture/Sampling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Fooocus_KSampler节点通过引入可调节的锐度参数来增强艺术生成中的采样过程，在传统KSampler功能的基础上进行了改进。这使得用户能够更精确地控制生成图像的锐度，从而满足艺术创作的特定需求。

# Input types
## Required
- model
    - 指定用于采样过程的模型，作为生成图像的基础。
    - Comfy dtype: MODEL
    - Python dtype: str
- seed
    - 决定采样过程中随机性的初始种子，确保结果的可重现性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 定义采样过程中要执行的步骤数，影响生成图像的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 控制无条件引导尺度，影响对指定条件的遵守程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 选择要使用的特定采样器算法，影响采样行为和输出质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择用于控制采样过程的调度器，影响图像生成的进程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 设置正面条件引导，以引导采样朝向所需属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 应用负面条件引导，以引导采样远离不需要的属性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - 提供一个初始潜在图像，通过采样过程进行细化或改变。
    - Comfy dtype: LATENT
    - Python dtype: str
- denoise
    - 调整应用于生成图像的去噪级别，影响清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- sharpness
    - 锐度参数允许用户调整生成图像的锐度水平，提供了根据艺术偏好微调视觉输出的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 生成图像的输出潜在表示，可用于进一步处理或转换为可视格式。
    - Comfy dtype: LATENT
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class KSamplerWithSharpness(KSampler):
    @classmethod
    def INPUT_TYPES(cls):
        inputs = KSampler.INPUT_TYPES()
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
