# Documentation
- Class name: xy_Tiling_KSampler
- Category: Jags_vector/xy_tile_sampler
- Output node: False
- Repo Ref: https://github.com/jags111/ComfyUI_Jags_VectorMagic

该节点通过应用增强模型生成高分辨率图像能力的平铺策略，促进采样过程的执行。它管理平铺配置并与模型集成，以产生反映所需平铺模式的输出。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了用于采样过程的神经网络架构。它是节点运行的基础，决定了生成图像的质量和特征。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 种子参数初始化随机数生成器，确保采样过程可复现和一致。它在保持结果的可靠性方面发挥着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步数参数决定了采样过程将经历的迭代次数。它直接影响最终输出的收敛性和细节，更多的步数可能会导致图像细节更加精细。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数在采样过程中调整模型的配置，影响生成图像的风格和结构。它是控制创意输出的一个重要方面。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数从一组预定义选项中选择特定的采样方法。它在调整节点行为以适应不同要求和预期结果方面发挥着重要作用。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - 调度器参数控制采样过程的节奏和进度，确保节点高效有效地运行。它是平衡性能和质量的关键。
    - Comfy dtype: COMBO
    - Python dtype: str
- positive
    - 正面参数提供引导采样过程朝向期望特征的条件数据。它对引导生成特定结果至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 负面参数引入采样过程应避免的条件数据。它有助于提炼生成，排除不需要的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- latent_image
    - latent_image参数提供了采样过程将要构建的初始潜在表示。它对于设置图像生成的基础至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- tileX
    - tileX参数指定是否在水平方向应用平铺。它影响生成图像平铺的分布和排列。
    - Comfy dtype: INT
    - Python dtype: int
- tileY
    - tileY参数决定是否在垂直方向应用平铺。它影响图像平铺的堆叠和组合。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- denoise
    - 去噪参数控制采样过程中应用的降噪水平。它通过最小化噪声，有助于实现更清晰、更精细的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 潜在参数代表采样过程中产生的中间潜在表示。它是实现最终图像生成的关键步骤。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- progress_latent
    - 进度潜在参数随着采样的进展捕获不断发展的潜在表示。它反映了图像向其完成状态的迭代细化。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class xy_Tiling_KSampler:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'tileX': ('INT', {'default': 1, 'min': 0, 'max': 2}), 'tileY': ('INT', {'default': 1, 'min': 0, 'max': 2})}}
    RETURN_TYPES = ('LATENT', 'LATENT')
    RETURN_NAMES = ('latent', 'progress_latent')
    FUNCTION = 'sample'
    CATEGORY = 'Jags_vector/xy_tile_sampler'

    def apply_asymmetric_tiling(self, model, tileX, tileY):
        for layer in [layer for layer in model.modules() if isinstance(layer, torch.nn.Conv2d)]:
            layer.padding_modeX = 'circular' if tileX else 'constant'
            layer.padding_modeY = 'circular' if tileY else 'constant'
            layer.paddingX = (layer._reversed_padding_repeated_twice[0], layer._reversed_padding_repeated_twice[1], 0, 0)
            layer.paddingY = (0, 0, layer._reversed_padding_repeated_twice[2], layer._reversed_padding_repeated_twice[3])
            print(layer.paddingX, layer.paddingY)

    def __hijackConv2DMethods(self, model, tileX: bool, tileY: bool):
        for layer in [l for l in model.modules() if isinstance(l, torch.nn.Conv2d)]:
            layer.padding_modeX = 'circular' if tileX else 'constant'
            layer.padding_modeY = 'circular' if tileY else 'constant'
            layer.paddingX = (layer._reversed_padding_repeated_twice[0], layer._reversed_padding_repeated_twice[1], 0, 0)
            layer.paddingY = (0, 0, layer._reversed_padding_repeated_twice[2], layer._reversed_padding_repeated_twice[3])

            def make_bound_method(method, current_layer):

                def bound_method(self, *args, **kwargs):
                    return method(current_layer, *args, **kwargs)
                return bound_method
            bound_method = make_bound_method(self.__replacementConv2DConvForward, layer)
            layer._conv_forward = bound_method.__get__(layer, type(layer))

    def __replacementConv2DConvForward(self, layer, input: torch.Tensor, weight: torch.Tensor, bias: Optional[torch.Tensor]):
        working = torch.nn.functional.pad(input, layer.paddingX, mode=layer.padding_modeX)
        working = torch.nn.functional.pad(working, layer.paddingY, mode=layer.padding_modeY)
        return torch.nn.functional.conv2d(working, weight, bias, layer.stride, (0, 0), layer.dilation, layer.groups)

    def __restoreConv2DMethods(self, model):
        for layer in [l for l in model.modules() if isinstance(l, torch.nn.Conv2d)]:
            layer._conv_forward = torch.nn.Conv2d._conv_forward.__get__(layer, torch.nn.Conv2d)

    def sample(self, model, seed, tileX, tileY, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=1.0):
        self.__hijackConv2DMethods(model.model, tileX == 1, tileY == 1)
        result = nodes.common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise)
        self.__restoreConv2DMethods(model.model)
        return result
```