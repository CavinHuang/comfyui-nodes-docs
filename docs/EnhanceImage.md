# Documentation
- Class name: EnhanceImage
- Category: ♾️Mixlab/Image
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点旨在通过调整图像的对比度水平来提高图像的视觉质量，从而增强视觉内容的清晰度和深度，而不改变输入图像的基本特征。

# Input types
## Required
- image
    - 图像输入是至关重要的，因为它提供了节点将处理的基础视觉数据。它通过确定对比度增强的起点来影响整个操作。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or list[PIL.Image]
- contrast
    - 对比度参数在增强过程中起着重要作用，因为它直接影响输出图像的动态范围和视觉冲击力。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出图像代表输入的增强版本，具有更好的对比度和深度，提供了更丰富的视觉体验。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or list[PIL.Image]

# Usage tips
- Infra type: CPU

# Source code
```
class EnhanceImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'contrast': ('FLOAT', {'default': 0.5, 'min': 0, 'max': 10, 'step': 0.01, 'display': 'slider'})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)

    def run(self, image, contrast):
        contrast = contrast[0]
        res = []
        for ims in image:
            for im in ims:
                image = tensor2pil(im)
                image = enhance_depth_map(image, contrast)
                image = pil2tensor(image)
                res.append(image)
        return (res,)
```