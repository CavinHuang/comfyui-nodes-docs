# Documentation
- Class name: Manga2Anime_LineArt_Preprocessor_Provider_for_SEGS
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点作为Manga2Anime线稿预处理器的提供者，专门为从漫画风格的图像中分割和增强线稿而设计。它封装了将图像转换为适合进一步处理和风格化所需的功能，重点是保持原始艺术作品的完整性和视觉吸引力。

# Input types
## Required
- image
    - 将进行线稿预处理的输入图像。此参数至关重要，因为它是节点操作的主要数据源。节点处理图像以增强和澄清线稿特征。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray
- mask
    - 一个可选的掩码图像，可用于指导线稿的预处理。掩码可以通过将处理集中在图像的特定区域来影响节点的执行。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray

# Output types
- SEGS_PREPROCESSOR
    - 输出是经过预处理的线稿图像，已增强用于分割目的。这个输出很重要，因为它为工作流中的后续分割任务奠定了基础。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray

# Usage tips
- Infra type: CPU

# Source code
```
class Manga2Anime_LineArt_Preprocessor_Provider_for_SEGS:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}}
    RETURN_TYPES = ('SEGS_PREPROCESSOR',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/SEGS/ControlNet'

    def doit(self):
        obj = Manga2Anime_LineArt_Preprocessor_wrapper()
        return (obj,)
```