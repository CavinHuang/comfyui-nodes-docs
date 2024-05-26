# Documentation
- Class name: RegionalPromptColorMask
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

RegionalPromptColorMask节点旨在基于颜色输入生成区域提示和掩码，然后利用这些提示和掩码来完善图像中特定区域的细节。该节点通过应用区域掩码来增强图像，允许在指定的颜色区域内进行有针对性的细节和清晰度改进。

# Input types
## Required
- basic_pipe
    - basic_pipe参数对于节点至关重要，它携带了图像处理所需的必要组件，包括模型、剪辑、VAE和条件信息。它是区域细化过程的基础。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[model, clip, vae, positive, negative]
- color_mask
    - color_mask输入是提供视觉上下文的关键元素，节点用它来识别需要增强的颜色区域。它被用来生成一个针对这些特定区域进行处理的掩码。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask_color
    - mask_color参数是一个字符串，表示RGB掩码的颜色值。它非常重要，因为它决定了图像中哪些颜色区域将被定位为细化目标。
    - Comfy dtype: STRING
    - Python dtype: str
- cfg
    - cfg参数是一个浮点值，用于调整节点的配置设置，影响区域细化的强度和焦点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name输入指定要使用的采样方法，这对于确定区域采样过程的策略和效率至关重要。
    - Comfy dtype: SAMPLERS
    - Python dtype: str
- scheduler
    - scheduler参数定义了节点的调度策略，这对于管理迭代过程并取得最佳结果至关重要。
    - Comfy dtype: SCHEDULERS
    - Python dtype: str
## Optional
- wildcard_prompt
    - wildcard_prompt是一个动态文本输入，允许将变量元素纳入提示中，增强了区域细化过程的灵活性和适应性。
    - Comfy dtype: STRING
    - Python dtype: str
- controlnet_in_pipe
    - controlnet_in_pipe参数是一个布尔标志，用于确定是保持还是覆盖basic_pipe中现有的控制设置，影响对区域细化的整体控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- sigma_factor
    - sigma_factor是一个浮点值，用于调整区域采样过程中的去噪水平，影响最终输出的质量和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- REGIONAL_PROMPTS
    - 输出的REGIONAL_PROMPTS是一组针对指定颜色区域的提示，旨在根据输入参数细化和增强图像。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: Dict[str, Any]
- MASK
    - MASK输出是根据输入的color_mask和mask_color生成的二进制掩码，用于隔离和针对图像中的特定区域进行处理。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class RegionalPromptColorMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'basic_pipe': ('BASIC_PIPE',), 'color_mask': ('IMAGE',), 'mask_color': ('STRING', {'multiline': False, 'default': '#FFFFFF'}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'wildcard_prompt': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'placeholder': 'wildcard prompt'}), 'controlnet_in_pipe': ('BOOLEAN', {'default': False, 'label_on': 'Keep', 'label_off': 'Override'}), 'sigma_factor': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('REGIONAL_PROMPTS', 'MASK')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, basic_pipe, color_mask, mask_color, cfg, sampler_name, scheduler, wildcard_prompt, controlnet_in_pipe=False, sigma_factor=1.0):
        mask = color_to_mask(color_mask, mask_color)
        rp = RegionalPromptSimple().doit(basic_pipe, mask, cfg, sampler_name, scheduler, wildcard_prompt, controlnet_in_pipe, sigma_factor=sigma_factor)[0]
        return (rp, mask)
```