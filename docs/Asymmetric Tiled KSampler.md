# Documentation
- Class name: Asymmetric_Tiled_KSampler
- Category: Sampling/Tiled
- Output node: False
- Repo Ref: https://github.com/FlyingFireCo/tiled_ksampler.git

Asymmetric_Tiled_KSampler 节点旨在对潜在空间执行高效且可定制的采样操作。它通过对模型的卷积层应用不对称平铺来实现这一点，从而允许生成具有无缝纹理的图像。该节点特别适用于通过平铺较小的图像段来创建大型、高分辨率的图像。它强调了采样过程中的灵活性和控制性，满足了各种创意和技术需求，而不涉及底层方法的具体细节。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了用于采样过程的神经网络架构。它直接影响节点生成图像的能力和产生的结果质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- seed
    - 种子参数对于采样过程的可重复性很重要。它确保相同的初始条件将导致相同的结果，这对于调试和一致的输出生成非常有价值。
    - Comfy dtype: INT
    - Python dtype: int
- tileX
    - tileX 参数决定了沿 X 轴的平铺行为。它对于控制图像如何被划分为用于生成无缝纹理的段至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- tileY
    - tileY 参数控制沿 Y 轴的平铺，与 tileX 类似，但用于垂直方向。它在整体图像构图中扮演着重要角色。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤参数指定了采样过程将经历的迭代次数。它是决定细节水平和最终输出外观的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg 参数，代表配置规模，用于调整采样过程对条件输入的敏感度。它是微调输出以满足特定要求的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name 参数从预定义的选项集中选择要使用的采样方法。对于将采样技术定制到手头任务的特定需求至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - scheduler 参数确定将指导采样过程的调度算法。它是采样操作效率和有效性的一个显著因素。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - positive 参数向模型提供正向条件信息，用于指导采样过程朝着期望的结果发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- negative
    - negative 参数提供负向条件，有助于避免在生成的图像中出现不需要的特征或伪影。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- latent_image
    - latent_image 参数是采样过程的一个输入，代表要生成图像的初始状态或编码表示。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- denoise
    - denoise 参数调整采样过程中应用的降噪水平。它是平衡图像细节和噪声之间权衡的重要控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - latent 输出代表采样过程后图像在潜在空间中的最终状态。它很重要，因为它可以被进一步处理或用于生成最终图像。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class Asymmetric_Tiled_KSampler:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'tileX': ('INT', {'default': 1, 'min': 0, 'max': 1}), 'tileY': ('INT', {'default': 1, 'min': 0, 'max': 1}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'Sampling/Tiled'

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