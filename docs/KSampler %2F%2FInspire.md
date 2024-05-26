# Documentation
- Class name: KSampler_inspire
- Category: InspirePack/a1111_compat
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在从给定模型中促进采样过程，使用各种参数控制生成新的潜在样本。它强调采样过程的灵活性和适应性，允许在定义的配置内探索多样化的结果。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了数据的来源和采样过程的基础。没有模型，节点无法执行其预期功能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 种子在确保采样过程的可重复性和随机性方面起着重要作用。它是控制生成唯一样本的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤定义了采样过程的进展，决定了算法将执行的迭代次数。这直接影响输出样本的多样性和数量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数对于微调采样过程的行为至关重要。它影响搜索空间中探索和利用的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数决定了要采用的采样策略，这对形成结果样本的特征至关重要。
    - Comfy dtype: ENUM
    - Python dtype: str
- scheduler
    - 调度器参数负责控制采样过程的节奏和调整。它在优化采样的效率和效果方面起着关键作用。
    - Comfy dtype: ENUM
    - Python dtype: str
- positive
    - 正向调节提供了指导采样过程朝向期望结果的重要背景。这是实现目标结果的关键元素。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - 负向调节作为过滤条件，在采样过程中排除不需要的特征，确保输出符合指定的约束。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- latent_image
    - 潜在图像参数对于采样过程是不可或缺的，因为它代表了生成新样本的起点。它为随后的转换设定了基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- noise_mode
    - 噪声模式决定了用于噪声生成的计算资源，这对采样过程至关重要。它影响节点的性能和效率。
    - Comfy dtype: ENUM
    - Python dtype: str
## Optional
- denoise
    - 去噪参数在通过减少噪声来提高输出样本的质量方面非常重要。它有助于实现数据更清晰、更连贯的表现。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_seed_mode
    - 批处理种子模式影响批次中种子的管理方式，这可能会影响生成样本的多样性和独特性。
    - Comfy dtype: ENUM
    - Python dtype: str
- variation_seed
    - 变异种子在噪声生成过程中引入变异性，有助于输出样本的多样性，同时不会改变核心特征。
    - Comfy dtype: INT
    - Python dtype: int
- variation_strength
    - 变异强度调节噪声引入的变异程度，影响结果样本中的微妙差异。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- samples
    - 样本代表采样过程的输出，包含了新生成的潜在表示。它们是节点执行的直接结果，对进一步分析或应用具有重要价值。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class KSampler_inspire:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'noise_mode': (['GPU(=A1111)', 'CPU'],), 'batch_seed_mode': (['incremental', 'comfy', 'variation str inc:0.01', 'variation str inc:0.05'],), 'variation_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'variation_strength': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'InspirePack/a1111_compat'

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, batch_seed_mode='comfy', variation_seed=None, variation_strength=None):
        return common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, incremental_seed_mode=batch_seed_mode, variation_seed=variation_seed, variation_strength=variation_strength)
```