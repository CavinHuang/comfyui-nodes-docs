# Documentation
- Class name: RegionalPrompt
- Category: ImpactPack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

RegionalPrompt节点旨在生成特定于区域的提示，使用掩码来定义兴趣区域，并使用高级采样器来确定该区域内的点。它在将处理重点放在图像的特定区域，提高后续操作的精度方面发挥着关键作用。

# Input types
## Required
- mask
    - 掩码参数对于定义图像内的兴趣区域至关重要。它作为一个过滤器，隔离节点将处理的特定区域，显著影响区域提示生成的结果。
    - Comfy dtype: MASK
    - Python dtype: np.ndarray
- advanced_sampler
    - 高级采样器参数是确定定义区域内采样策略的关键组件。它影响在掩码内如何选择点，这对于区域提示的准确性和代表性至关重要。
    - Comfy dtype: KSAMPLER_ADVANCED
    - Python dtype: KSamplerAdvancedWrapper

# Output types
- REGIONAL_PROMPTS
    - RegionalPrompt节点的输出是一组针对输入掩码和采样器定制的区域提示。这些提示对于指导特定于兴趣区域的进一步分析或处理具有重要意义。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: List[REGIONAL_PROMPT]

# Usage tips
- Infra type: CPU

# Source code
```
class RegionalPrompt:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'advanced_sampler': ('KSAMPLER_ADVANCED',)}}
    RETURN_TYPES = ('REGIONAL_PROMPTS',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Regional'

    def doit(self, mask, advanced_sampler):
        regional_prompt = core.REGIONAL_PROMPT(mask, advanced_sampler)
        return ([regional_prompt],)
```