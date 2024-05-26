# Documentation
- Class name: SmoothMask
- Category: ♾️Mixlab/Mask
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

SmoothMask是一个处理图像遮罩以减少噪声和细节的节点，提供更平滑的视觉输出。它通过对输入遮罩应用高斯模糊来实现这一点，有效地软化其边缘并减少高频信息。该节点对于准备需要在遮罩和非遮罩区域之间具有更渐进过渡的遮罩至关重要，提高了最终图像的视觉质量。

# Input types
## Required
- mask
    - mask参数是平滑操作的源图像。它至关重要，因为它定义了将由节点处理的图像的初始状态。遮罩的质量和分辨率直接影响平滑处理的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
## Optional
- smoothness
    - smoothness参数控制应用于遮罩的高斯模糊的程度。它是一个重要因素，因为它决定了遮罩边缘软化的程度。较高的值会产生更模糊、更平滑的遮罩，而较低的值则保留更多原始遮罩的细节。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- MASK
    - SmoothMask节点的输出是输入遮罩的修改版本，具有减少的噪声和更平滑的边缘。这个平滑的遮罩可以用于各种图像处理任务中，其中需要在遮罩和未遮罩区域之间有更精细的过渡。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class SmoothMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'mask': ('MASK',), 'smoothness': ('INT', {'default': 1, 'min': 0, 'max': 150, 'step': 1, 'display': 'slider'})}}
    RETURN_TYPES = ('MASK',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Mask'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, mask, smoothness):
        print('SmoothMask', mask.shape)
        mask = tensor2pil(mask)
        feathered_image = mask.filter(ImageFilter.GaussianBlur(smoothness))
        mask = pil2tensor(feathered_image)
        return (mask,)
```