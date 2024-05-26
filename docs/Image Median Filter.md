# Documentation
- Class name: WAS_Image_Median_Filter
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Median_Filter 节点对输入图像应用中值滤波器，这是一种非线性操作，将每个像素替换为周围像素的中值。这在减少图像噪声的同时保留边缘非常有用。该节点旨在处理一批图像，为图像预处理任务提供强大的解决方案。

# Input types
## Required
- image
    - 图像参数是节点的核心输入，代表将要处理的图像数据。它对节点的执行至关重要，因为它决定了中值滤波操作的对象。输入图像的质量和特性直接影响滤波过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
## Optional
- diameter
    - 直径参数指定了中值滤波过程中使用的滤波器核的大小。这是一个重要的调整参数，它影响噪声减少的程度和图像细节的保留。直径越大，噪声抑制效果越强，但也可能导致更细微细节的丢失。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_color
    - sigma_color 参数定义了滤波器对图像内颜色变化的敏感度。这是控制滤波过程颜色方面的一个关键参数，允许根据输入图像的特定特性进行调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sigma_space
    - sigma_space 参数控制滤波器对图像内空间变化的敏感度。它对于微调中值滤波的空间方面至关重要，确保操作适应图像的内容和结构。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output_image
    - output_image 是对输入图像应用中值滤波器的结果。它代表了经过处理的图像，具有降低的噪声和保留的边缘，适合进一步分析或展示。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Median_Filter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'diameter': ('INT', {'default': 2.0, 'min': 0.1, 'max': 255, 'step': 1}), 'sigma_color': ('FLOAT', {'default': 10.0, 'min': -255.0, 'max': 255.0, 'step': 0.1}), 'sigma_space': ('FLOAT', {'default': 10.0, 'min': -255.0, 'max': 255.0, 'step': 0.1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'apply_median_filter'
    CATEGORY = 'WAS Suite/Image/Filter'

    def apply_median_filter(self, image, diameter, sigma_color, sigma_space):
        tensor_images = []
        for img in image:
            img = tensor2pil(img)
            tensor_images.append(pil2tensor(medianFilter(img, diameter, sigma_color, sigma_space)))
        tensor_images = torch.cat(tensor_images, dim=0)
        return (tensor_images,)
```