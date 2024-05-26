# Documentation
- Class name: PlasmaSampler
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/Jordach/comfy-plasma.git

PlasmaSampler类封装了从给定模型生成样本的过程，使用各种参数来控制采样过程，如噪声、步数和去噪因子。它旨在提供采样方法的灵活性，允许样本生成采用随机和确定性方法。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了从中抽取样本的基础生成模型。它是采样过程的核心，直接影响生成样本的质量和特征。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- noise_seed
    - 噪声种子参数初始化随机数生成器，确保添加到模型输入的噪声是可复现的。该参数对于一致的结果和控制实验至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步数参数决定了采样过程将经历的迭代次数。增加步数可以导致更精细和详细的样本，但也会增加计算时间。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整采样过程的配置，影响模型潜在空间的探索与利用之间的平衡。它是决定输出样本多样性和质量的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise
    - 去噪参数控制采样过程中应用的噪声减少水平。它对于完善最终样本的清晰度和质量很重要，需要在噪声和信号之间找到平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- latent_noise
    - 潜在噪声参数在潜在空间中引入额外的噪声，这可以鼓励生成更多样化和创造性的样本。它是增强输出多样性的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称参数选择了要使用的特定采样方法，这显著影响了样本生成过程的效率和效果。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - 调度器参数确定了随时间调整采样过程参数的调度策略，这可以改善生成样本的收敛性和稳定性。
    - Comfy dtype: COMBO
    - Python dtype: str
- positive
    - 正参数提供条件数据，引导采样过程生成符合特定期望特征的样本。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - 负参数提供条件数据，帮助排除生成样本中不需要的特征，完善整体结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- latent_image
    - 潜在图像参数是模型潜在空间的输入表示，对于采样过程生成有意义和连贯的样本至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
## Optional
- distribution_type
    - 分布类型参数提供了默认和随机采样策略之间的选择，影响生成样本的多样性和独特性。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- latent
    - 潜在参数包含了输出样本，代表了采样过程的结果。它是关键组件，因为它包含了与输入参数和模型约束相一致的生成数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class PlasmaSampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 7.0, 'min': 0.0, 'max': 100.0, 'step': 0.1}), 'denoise': ('FLOAT', {'default': 0.9, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'latent_noise': ('FLOAT', {'default': 0.05, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'distribution_type': (['default', 'rand'],), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'sampling'

    def sample(self, model, noise_seed, steps, cfg, denoise, sampler_name, scheduler, positive, negative, latent_image, latent_noise, distribution_type):
        rand = False
        if distribution_type == 'rand':
            rand = True
        return common_ksampler(model, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, latent_noise, use_rand=rand)
```