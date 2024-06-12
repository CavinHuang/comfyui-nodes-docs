# Documentation
- Class name: Tiled_KSampler
- Category: Sampling/Tiled
- Output node: False
- Repo Ref: https://github.com/FlyingFireCo/tiled_ksampler.git

Tiled_KSampler 节点旨在通过将采样过程划分为更小、更易管理的平铺区域来执行高效的采样操作。它利用平铺的概念来增强采样过程，从而能够处理更大的模型和数据集。该节点旨在为其所属类别内的采样任务提供一种强大且可扩展的解决方案。

# Input types
## Required
- model
    - 模型参数对于 Tiled_KSampler 节点至关重要，因为它定义了用于采样的底层模型架构。此参数直接影响节点的执行和采样结果的质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 种子参数初始化随机数生成器，确保采样过程的可重复性。它在确定采样迭代的起始点中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- tiling
    - 平铺参数指定是否应使用平铺方法执行采样。它对于控制节点的操作模式以及影响采样过程的效率具有重要意义。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步数参数确定采样过程的迭代次数。它是控制采样过程持续时间和彻底性的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg 参数，代表配置值，用于控制采样过程的参数。它是微调不同采样任务节点性能的重要因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name 参数选择节点内部要使用的特定采样方法。对于将节点的功能调整为所需的采样技术至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - 调度器参数定义了在采样过程中要应用的调度算法。它是管理采样步骤并实现所需结果的关键组件。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - positive 参数提供正向条件信息，引导采样过程朝向期望的结果。它对影响采样迭代的方向很重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- negative
    - negative 参数提供负向条件信息，以防止采样过程中的某些结果。它在塑造采样结果中扮演着重要角色。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- latent_image
    - latent_image 参数是一个关键输入，代表采样过程的初始潜在状态。它为后续的采样迭代奠定了基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
## Optional
- denoise
    - denoise 参数在采样过程中调整去噪强度，允许控制噪声减少级别。这是一个可选但有用的设置，用于细化采样输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 潜在输出代表了采样过程产生的最终采样潜在状态。它很重要，因为它包含了节点操作的结果，并作为进一步处理或分析的输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class Tiled_KSampler:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'tiling': ('INT', {'default': 1, 'min': 0, 'max': 1}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'Sampling/Tiled'

    def apply_circular(self, model, enable):
        for layer in [layer for layer in model.modules() if isinstance(layer, torch.nn.Conv2d)]:
            layer.padding_mode = 'circular' if enable else 'zeros'

    def sample(self, model, seed, tiling, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=1.0):
        self.apply_circular(model.model, tiling == 1)
        return nodes.common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise)
```