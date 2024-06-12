# Documentation
- Class name: CoreMLDetailerHookProvider
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

CoreMLDetailerHookProvider节点旨在促进CoreML模型在ImpactPack/Detailer类别中的集成。它提供了一种方法来生成一个钩子，该钩子可用于自定义模型在图像处理任务中的行为。此节点特别适用于调整图像的分辨率和宽高比以满足CoreML模型的要求。

# Input types
## Required
- mode
    - mode参数指定了图像处理的分辨率和宽高比。它至关重要，因为它决定了CoreML模型将如何处理输入图像。节点使用这些信息来调整图像的尺寸以适应模型的要求。
    - Comfy dtype: str
    - Python dtype: str

# Output types
- DETAILER_HOOK
    - 该节点的输出是一个CoreMLHook对象，这是一个专为与CoreML模型一起工作而设计的专用钩子。它包括用于预处理和后处理样本的方法，以确保它们与模型预期的输入和输出格式兼容。
    - Comfy dtype: CoreMLHook
    - Python dtype: CoreMLHook

# Usage tips
- Infra type: CPU

# Source code
```
class CoreMLDetailerHookProvider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mode': (['512x512', '768x768', '512x768', '768x512'],)}}
    RETURN_TYPES = ('DETAILER_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    def doit(self, mode):
        hook = hooks.CoreMLHook(mode)
        return (hook,)
```