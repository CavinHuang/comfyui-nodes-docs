# Documentation
- Class name: HEDPreprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

HEDPreprocessor_Provider_for_SEGS 类旨在为图像分割应用提供 HED（全嵌套边缘检测）算法。它利用 HED 预处理器增强图像边缘，这对于分割和识别图像内的区域至关重要。该节点对于需要详细边缘检测的任务是不可或缺的，并且是 SEGS（语义边缘引导分割）工作流程的一部分。

# Input types
## Required
- safe
    - ‘safe’参数是一个布尔标志，用于确定在预处理阶段是否启用或禁用某些安全特性。它在确保图像处理的稳定性和可靠性方面发挥着关键作用，同时防止在边缘检测过程中可能出现的潜在错误或伪影。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- SEGS_PREPROCESSOR
    - HEDPreprocessor_Provider_for_SEGS 的输出是使用 HED 算法增强边缘的预处理图像。这个输出是分割过程中的关键步骤，因为它提供了图像结构的详细表示，这对于准确的分割至关重要。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class HEDPreprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'safe': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'})}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self, safe):
        obj = HED_Preprocessor_wrapper(safe, 'HEDPreprocessor')
        return (obj,)
```