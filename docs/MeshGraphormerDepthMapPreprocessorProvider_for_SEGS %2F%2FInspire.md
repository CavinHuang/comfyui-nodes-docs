# Documentation
- Class name: MeshGraphormerDepthMapPreprocessorProvider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点用于从图像生成深度图，这对于3D建模和分割任务至关重要。它利用先进算法从单张图像估计深度，提高了3D表示的质量。

# Input types
## Required
- image
    - 输入图像对于生成深度图非常关键，它作为深度图生成的基础。节点处理图像以提取深度信息，这对于后续的3D建模和分割过程至关重要。
    - Comfy dtype: image
    - Python dtype: PIL.Image or numpy.ndarray
## Optional
- mask
    - 当提供掩码参数时，它允许对图像进行选择性处理。它使节点能够专注于图像中的特定感兴趣区域，从而提高生成的深度图的准确性和相关性。
    - Comfy dtype: mask
    - Python dtype: numpy.ndarray

# Output types
- SEGS_PREPROCESSOR
    - 输出是一个包含生成的深度图的预处理器对象。这个深度图是用于各种3D和分割工作流中的关键中间产品，作为进一步处理的基础。
    - Comfy dtype: preprocessor
    - Python dtype: object

# Usage tips
- Infra type: GPU

# Source code
```
class MeshGraphormerDepthMapPreprocessorProvider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self):
        obj = MeshGraphormerDepthMapPreprocessorProvider_wrapper()
        return (obj,)
```