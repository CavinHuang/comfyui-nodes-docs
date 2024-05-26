# Documentation
- Class name: KSampler_inspire_pipe
- Category: InspirePack/a1111_compat
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

KSampler_inspire_pipe节点旨在促进生成模型内的采样过程，通过集成多种参数来指导生成新的潜在表示。它通过整合随机种子、指定的步数和配置设置来细化输出。该节点的主要目的是通过提供一个结构化但灵活的框架来探索模型的潜在空间，从而增强创作过程。

# Input types
## Required
- basic_pipe
    - basic_pipe参数对于采样过程至关重要，它提供了采样过程所需的基础组件，包括模型和其他相关元素。它是节点操作的支柱，使得能够生成潜在样本。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, ...]
- seed
    - seed参数对于引入采样过程中的随机性至关重要，确保生成的样本多样化且不重复。它作为随机数生成的起点，从而显著影响输出的唯一性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数规定了采样过程将经历的迭代次数，直接影响潜在空间内探索的深度。它是决定生成样本多样性和质量的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数作为一个配置设置，微调采样过程，允许对生成样本的行为和特征进行调整。它在塑造节点的整体输出中起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数在选择合适的采样策略方面起着重要作用，这反过来影响了生成样本的分布和性质。它是节点功能中一个关键的决策点。
    - Comfy dtype: ENUM
    - Python dtype: str
- scheduler
    - scheduler参数决定了采样过程的调度策略，管理生成步骤的进展和节奏。它对于保持样本生成的结构化方法是必不可少的。
    - Comfy dtype: ENUM
    - Python dtype: str
- latent_image
    - latent_image参数是采样过程的输入，代表新样本将生成的初始状态或上下文。它是节点操作的组成部分，作为创建新潜在表示的基础。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
- denoise
    - denoise参数调整采样过程中应用的降噪水平，影响生成样本的清晰度和质量。它是平衡噪声和细节之间权衡的关键控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_mode
    - noise_mode参数指定了噪声生成的计算模式，要么利用GPU进行加速处理，要么选择CPU。它影响采样过程的效率和性能。
    - Comfy dtype: ENUM
    - Python dtype: str
- batch_seed_mode
    - batch_seed_mode参数管理批次间的随机性方法，这对于确保生成样本的多样性至关重要。它影响输出的整体可变性和一致性。
    - Comfy dtype: ENUM
    - Python dtype: str
## Optional
- variation_seed
    - variation_seed参数在采样过程中引入额外的随机性，有助于输出的多样性。它允许在生成的样本中进行微妙的变化，增强节点的创作范围。
    - Comfy dtype: INT
    - Python dtype: int
- variation_strength
    - variation_strength参数控制生成样本中变化的强度，平衡新颖性与原始输入的水平。它是实现多样化和引人入胜的输出集的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - latent参数代表采样过程的输出，包含新生成的潜在表示。它是节点主要功能直接反映，封装了采样过程的创作成果。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
- vae
    - vae参数包括输出的变化分自编码器组件，对于生成高质量、结构化的表示至关重要。它标志着节点功能内部集成了先进的生成模型。
    - Comfy dtype: VAE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class KSampler_inspire_pipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'basic_pipe': ('BASIC_PIPE',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'noise_mode': (['GPU(=A1111)', 'CPU'],), 'batch_seed_mode': (['incremental', 'comfy', 'variation str inc:0.01', 'variation str inc:0.05'],), 'variation_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'variation_strength': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT', 'VAE')
    FUNCTION = 'sample'
    CATEGORY = 'InspirePack/a1111_compat'

    def sample(self, basic_pipe, seed, steps, cfg, sampler_name, scheduler, latent_image, denoise, noise_mode, batch_seed_mode='comfy', variation_seed=None, variation_strength=None):
        (model, clip, vae, positive, negative) = basic_pipe
        latent = common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, incremental_seed_mode=batch_seed_mode, variation_seed=variation_seed, variation_strength=variation_strength)[0]
        return (latent, vae)
```