# Documentation
- Class name: WAS_Image_Threshold
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Threshold 节点旨在通过应用阈值来处理图像，这对于从灰度输入创建二进制图像非常有用。它在图像分割和特征提取任务中发挥关键作用，通过指定的阈值简化图像为其核心结构。

# Input types
## Required
- image
    - 图像参数对于节点的操作至关重要，因为它是将被处理的输入。它通过确定将经历阈值处理的内容影响执行，这对于最终输出的清晰度和细节至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- threshold
    - 阈值参数非常重要，因为它决定了图像中像素值分类的截止点。它通过控制灰度值转换为黑色或白色（基于它们是否满足或超过阈值）直接影响节点的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- thresholded_image
    - 阈值化图像输出代表了应用阈值后输入图像的处理结果。它很重要，因为它提供了输入的二进制版本，通常用于进一步分析或作为更复杂的图像处理工作流程中的一步。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Threshold:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'threshold': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_threshold'
    CATEGORY = 'WAS Suite/Image/Process'

    def image_threshold(self, image, threshold=0.5):
        return (pil2tensor(self.apply_threshold(tensor2pil(image), threshold)),)

    def apply_threshold(self, input_image, threshold=0.5):
        grayscale_image = input_image.convert('L')
        threshold_value = int(threshold * 255)
        thresholded_image = grayscale_image.point(lambda x: 255 if x >= threshold_value else 0, mode='L')
        return thresholded_image
```