# Documentation
- Class name: AnimeLineArt_Preprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

此类节点负责将输入的图像转换为动漫风格的线稿，这对于以动漫美学一致的方式风格化视觉效果至关重要。它利用机器学习模型的力量，从源图像生成详细且富有表现力的线条图，增强艺术生成任务中的创作过程。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是衍生动漫线稿的来源。输入图像的质量和分辨率直接影响生成的线稿的细节和准确性。
    - Comfy dtype: image
    - Python dtype: PIL.Image or numpy.ndarray
## Optional
- mask
    - 掩码参数虽然是可选的，但可以通过指定在线条艺术转换过程中应该优先考虑或排除的图像区域来细化预处理。
    - Comfy dtype: mask
    - Python dtype: numpy.ndarray

# Output types
- SEGS_PREPROCESSOR
    - 此节点的输出是已被转换为动漫线稿的图像。这是在创建风格化内容时的关键组成部分，视觉吸引力和艺术质量至关重要。
    - Comfy dtype: image
    - Python dtype: numpy.ndarray

# Usage tips
- Infra type: GPU

# Source code
```
class AnimeLineArt_Preprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self):
        obj = AnimeLineArt_Preprocessor_wrapper()
        return (obj,)
```