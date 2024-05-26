# Documentation
- Class name: RemoveControlNetFromRegionalPrompts
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在通过移除控制元素来处理和完善区域性提示，从而提高后续任务中提示的清晰度和专注度。

# Input types
## Required
- regional_prompts
    - 区域性提示是指导节点操作的关键输入，作为移除控制元素的基础。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: List[Tuple[str, str, str, str, List[str], List[str]]]

# Output types
- REGIONAL_PROMPTS
    - 经过精炼且不包含控制元素的提示是主要的输出，可以用于进一步的处理或分析。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: List[Tuple[str, str, str, str, List[str], List[str]]]

# Usage tips
- Infra type: CPU

# Source code
```
class RemoveControlNetFromRegionalPrompts:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'regional_prompts': ('REGIONAL_PROMPTS',)}}
    RETURN_TYPES = ('REGIONAL_PROMPTS',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Util'

    def doit(self, regional_prompts):
        rcn = RemoveControlNet()
        res = []
        for rp in regional_prompts:
            (_, _, _, _, positive, negative) = rp.sampler.params
            (positive, negative) = (rcn.doit(positive)[0], rcn.doit(negative)[0])
            sampler = rp.sampler.clone_with_conditionings(positive, negative)
            res.append(rp.clone_with_sampler(sampler))
        return (res,)
```