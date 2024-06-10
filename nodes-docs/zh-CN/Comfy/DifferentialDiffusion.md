# Documentation
- Class name: DifferentialDiffusion
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DifferentialDiffusion节点旨在通过集成自定义去噪过程来增强给定模型的功能。它基于差分扩散原理运作，允许应用一个根据模型内部参数动态调整的去噪掩码。该节点在通过控制扩散过程中每一步应用的噪声减少级别来提炼模型输出方面至关重要。

# Input types
## Required
- model
    - 'model' 参数至关重要，因为它代表了 DifferentialDiffusion 节点将操作的核心模型。正是通过这个模型，节点应用其去噪功能，使其成为节点执行和产生结果质量的基本组成部分。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- sigma
    - 'sigma' 参数对于确定扩散过程中的噪声水平至关重要。它直接影响去噪掩码的应用方式，从而影响模型的最终输出。'sigma' 值用于计算去噪掩码的阈值，进而形成扩散步骤。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- denoise_mask
    - 'denoise_mask' 参数在节点操作中扮演重要角色，因为它决定了模型输出中将经历噪声减少的区域。它是实现所需噪声控制水平的关键组成部分，确保扩散过程导致模型输出的精炼和改进。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- extra_options
    - 'extra_options' 参数是一个字典，提供了节点操作所需的额外设置和信息。它包括用于定义扩散过程的范围和参数的 'model' 和 'sigmas'。这个参数对于节点功能的定制和灵活性至关重要。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Any]

# Output types
- model
    - 输出 'model' 是输入模型的增强版本，现在配备了差分扩散去噪功能。它标志着节点功能的成功应用，提供了一个更适合于产生高质量输出的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class DifferentialDiffusion:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'apply'
    CATEGORY = '_for_testing'
    INIT = False

    def apply(self, model):
        model = model.clone()
        model.set_model_denoise_mask_function(self.forward)
        return (model,)

    def forward(self, sigma: torch.Tensor, denoise_mask: torch.Tensor, extra_options: dict):
        model = extra_options['model']
        step_sigmas = extra_options['sigmas']
        sigma_to = model.inner_model.model_sampling.sigma_min
        if step_sigmas[-1] > sigma_to:
            sigma_to = step_sigmas[-1]
        sigma_from = step_sigmas[0]
        ts_from = model.inner_model.model_sampling.timestep(sigma_from)
        ts_to = model.inner_model.model_sampling.timestep(sigma_to)
        current_ts = model.inner_model.model_sampling.timestep(sigma[0])
        threshold = (current_ts - ts_to) / (ts_from - ts_to)
        return (denoise_mask >= threshold).to(denoise_mask.dtype)
```