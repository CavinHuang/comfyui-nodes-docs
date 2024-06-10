# Documentation
- Class name: WAS_KSampler
- Category: WAS Suite/Sampling
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_KSampler节点旨在WAS套件中执行采样操作，利用先进的采样技术生成潜在表示。它在创建新图像或增强现有图像中起着关键作用，对整个图像合成过程有着重要的贡献。

# Input types
## Required
- model
    - 模型参数对于节点至关重要，因为它定义了用于采样的底层神经网络架构。它直接影响生成的潜在表示的质量和特性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 种子参数对于以确定性结果启动采样过程至关重要。它确保了结果的可复现性，这对于在不同运行中进行一致的图像生成非常关键。
    - Comfy dtype: SEED
    - Python dtype: Union[int, str]
- sampler_name
    - sampler_name参数指定要使用的采样方法，这对节点的操作至关重要。不同的采样器可以产生不同的结果，因此这个选择对于实现期望的结果至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - 调度器参数决定了采样过程的学习率计划，这对采样算法的效率和效果至关重要。它可能显著影响生成的潜在图像的质量。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - 正向参数提供正向条件信息，引导采样过程生成具有所需特征的图像。这是引导输出朝向预期方向的重要因素。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[str, List[str]]
- negative
    - 负向参数提供负向条件信息，以防止采样图像中包含不需要的特征。它对于确保输出与指定的约束一致至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[str, List[str]]
- latent_image
    - latent_image参数是采样过程的输入，代表要细化的图像的初始状态。它是一个基本组成部分，为图像的生成或增强设定了起点。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
## Optional
- steps
    - 步数参数决定了采样过程中的迭代次数，影响最终潜在图像的收敛和细节。更多的步数通常会导致更精细的输出。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数，代表无分类器指导比例，调整采样中内容与随机性之间的平衡。它在控制生成图像与输入条件的保真度方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise
    - 去噪参数控制采样过程中应用的噪声减少级别。这是一个微调选项，可以提高最终图像的清晰度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 潜在输出代表以编码形式采样的图像，可以进一步处理或用作后续图像生成任务的输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_KSampler:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('MODEL',), 'seed': ('SEED',), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'WAS Suite/Sampling'

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=1.0):
        return nodes.common_ksampler(model, seed['seed'], steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise)
```