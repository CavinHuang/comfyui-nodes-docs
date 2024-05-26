# Documentation
- Class name: RemoveControlNet
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在通过移除与控制相关的元素来处理和精炼输入数据，从而提高数据集的清晰度和专注度。

# Input types
## Required
- conditioning
    - 调节参数至关重要，因为它是节点操作的主要输入。它包含将被处理以实现期望结果的数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, dict]]

# Output types
- conditioning
    - 输出是输入数据的精炼版本，去除了控制元素，这对于进一步的分析或处理至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, dict]]

# Usage tips
- Infra type: CPU

# Source code
```
class RemoveControlNet:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Util'

    def doit(self, conditioning):
        c = []
        for t in conditioning:
            n = [t[0], t[1].copy()]
            if 'control' in n[1]:
                del n[1]['control']
            if 'control_apply_to_uncond' in n[1]:
                del n[1]['control_apply_to_uncond']
            c.append(n)
        return (c,)
```