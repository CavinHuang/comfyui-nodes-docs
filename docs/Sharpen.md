# Documentation
- Class name: Sharpen
- Category: postprocessing/Filters
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

锐化节点通过增强局部对比度来提高图像清晰度。它将锐化核应用于输入图像，放大边缘和细微细节，从而产生更明确和清晰的视觉效果。

# Input types
## Required
- image
    - 图像参数是锐化节点的主要输入，对于节点来说至关重要。它决定了将要进行锐化处理的源材料，影响最终输出的质量和清晰度。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- sharpen_radius
    - 锐化半径参数控制锐化效果的程度。较大的半径会导致更明显的锐化效果，更积极地增强边缘和细节，而较小的半径则产生更微妙的效果。
    - Comfy dtype: INT
    - Python dtype: int
- alpha
    - alpha参数调整锐化效果的强度。较高的alpha值增加了对比度增强，导致更戏剧性的锐化，而较低的值则产生较轻微的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result
    - 结果参数是锐化节点的输出，代表锐化后的图像。它反映了锐化效果的应用，展示了提高的清晰度和定义明确的边缘。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class Sharpen:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'sharpen_radius': ('INT', {'default': 1, 'min': 1, 'max': 15, 'step': 1}), 'alpha': ('FLOAT', {'default': 1.0, 'min': 0.1, 'max': 5.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'sharpen'
    CATEGORY = 'postprocessing/Filters'

    def sharpen(self, image: torch.Tensor, blur_radius: int, alpha: float):
        if blur_radius == 0:
            return (image,)
        (batch_size, height, width, channels) = image.shape
        kernel_size = blur_radius * 2 + 1
        kernel = torch.ones((kernel_size, kernel_size), dtype=torch.float32) * -1
        center = kernel_size // 2
        kernel[center, center] = kernel_size ** 2
        kernel *= alpha
        kernel = kernel.repeat(channels, 1, 1).unsqueeze(1)
        tensor_image = image.permute(0, 3, 1, 2)
        sharpened = F.conv2d(tensor_image, kernel, padding=center, groups=channels)
        sharpened = sharpened.permute(0, 2, 3, 1)
        result = torch.clamp(sharpened, 0, 1)
        return (result,)
```