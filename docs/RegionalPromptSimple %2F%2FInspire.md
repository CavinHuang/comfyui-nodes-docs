# Documentation
- Class name: RegionalPromptSimple
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

RegionalPromptSimple节点旨在通过区域化的方法来增强图像合成过程。它利用遮罩对图像的特定区域进行聚焦，允许对采样过程进行详细控制。该节点通过确保所需区域得到适当的关注，从而提高整体图像质量，导致更精细和针对性的输出。

# Input types
## Required
- basic_pipe
    - basic_pipe参数对于区域提示过程至关重要，它提供了合成图像所需的基础元素。它包括模型、clip、vae以及其他必要的组件。这些元素对于最终输出的质量和准确性有着直接影响。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple
- mask
    - mask参数对于定义图像内的兴趣区域至关重要。它作为节点的指南，引导其处理工作的重点，确保指定的区域以更高的细节和清晰度得到增强。遮罩的有效性直接与所需图像增强的精确性相关。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- cfg
    - cfg参数是一个浮点值，用于调整节点的配置设置，影响区域提示过程的整体行为。它在确定细节和效率之间的平衡方面起着重要作用，确保节点为期望的结果最佳化运行。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数决定了节点采用的采样策略，这对合成图像的质量至关重要。通过选择合适的采样器，节点可以调整其输出以满足手头任务的具体要求，从而实现更准确和有针对性的增强。
    - Comfy dtype: SAMPLERS
    - Python dtype: str
- scheduler
    - scheduler参数在管理节点的迭代过程中起着重要作用，确保区域提示以受控和高效的方式执行。它有助于优化采样过程，避免不必要的计算开销，专注于最有影响力的步骤。
    - Comfy dtype: SCHEDULERS
    - Python dtype: str
## Optional
- wildcard_prompt
    - wildcard_prompt参数允许动态输入文本，可用于自定义节点的提示。这一特性增强了节点的灵活性，使其能够适应各种图像合成场景，并产生更加定制化的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- controlnet_in_pipe
    - controlnet_in_pipe参数决定是否保持或覆盖管道中的现有控制设置。这允许对节点的行为进行微调，确保区域提示与期望的创意方向保持一致。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- sigma_factor
    - sigma_factor参数调整图像合成过程中应用的降噪水平。通过调整这个值，节点可以在保留细节和减少不需要的噪声之间取得平衡，从而得到更清洁、更精细的图像输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- regional_prompts
    - regional_prompts输出是针对图像指定区域量身定制的一系列提示。这些提示旨在通过聚焦兴趣区域来增强图像合成过程，从而得到更详细、更准确的期望结果表示。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: List[Dict[str, Any]]

# Usage tips
- Infra type: GPU

# Source code
```
class RegionalPromptSimple:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'basic_pipe': ('BASIC_PIPE',), 'mask': ('MASK',), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'wildcard_prompt': ('STRING', {'multiline': True, 'dynamicPrompts': False, 'placeholder': 'wildcard prompt'}), 'controlnet_in_pipe': ('BOOLEAN', {'default': False, 'label_on': 'Keep', 'label_off': 'Override'}), 'sigma_factor': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('REGIONAL_PROMPTS',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Regional'

    def doit(self, basic_pipe, mask, cfg, sampler_name, scheduler, wildcard_prompt, controlnet_in_pipe=False, sigma_factor=1.0):
        if 'RegionalPrompt' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/ltdrdata/ComfyUI-Impact-Pack', "To use 'RegionalPromptSimple' node, 'Impact Pack' extension is required.")
            raise Exception(f"[ERROR] To use RegionalPromptSimple, you need to install 'ComfyUI-Impact-Pack'")
        (model, clip, vae, positive, negative) = basic_pipe
        iwe = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode']()
        kap = nodes.NODE_CLASS_MAPPINGS['KSamplerAdvancedProvider']()
        rp = nodes.NODE_CLASS_MAPPINGS['RegionalPrompt']()
        if wildcard_prompt != '':
            (model, clip, new_positive, _) = iwe.doit(model=model, clip=clip, populated_text=wildcard_prompt)
            if controlnet_in_pipe:
                prev_cnet = None
                for t in positive:
                    if 'control' in t[1] and 'control_apply_to_uncond' in t[1]:
                        prev_cnet = (t[1]['control'], t[1]['control_apply_to_uncond'])
                        break
                if prev_cnet is not None:
                    for t in new_positive:
                        t[1]['control'] = prev_cnet[0]
                        t[1]['control_apply_to_uncond'] = prev_cnet[1]
        else:
            new_positive = positive
        basic_pipe = (model, clip, vae, new_positive, negative)
        sampler = kap.doit(cfg, sampler_name, scheduler, basic_pipe, sigma_factor=sigma_factor)[0]
        regional_prompts = rp.doit(mask, sampler)[0]
        return (regional_prompts,)
```