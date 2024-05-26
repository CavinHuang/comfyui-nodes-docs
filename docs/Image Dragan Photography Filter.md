# Documentation
- Class name: WAS_Dragon_Filter
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Dragon_Filter 节点旨在应用一系列图像处理技术，模拟风格化的龙的外观。它通过调整饱和度、对比度、锐度和亮度增强图像的视觉吸引力，同时应用高通滤波器来添加纹理细节。该节点能够对最终输出进行上色，为处理后的图像提供丰富和鲜明的外观。

# Input types
## Required
- image
    - 输入图像，将由节点处理。它作为节点执行的所有后续图像操作和增强的基础。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- saturation
    - 图像的饱和度调整因子。它控制图像内颜色的强度，值越高饱和度增加，值越低饱和度减少。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 图像的对比度调整因子。它影响图像最暗和最亮区域之间的差异，创建更多或更少的明显色调范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sharpness
    - 图像的锐度调整因子。它控制图像边缘的清晰度和定义度，值越高产生更锐利的图像。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 图像的亮度调整因子。它控制图像的整体亮度或明度，根据需要使其更亮或更暗。
    - Comfy dtype: FLOAT
    - Python dtype: float
- highpass_radius
    - 高通滤波器的半径参数。它决定了最终图像中保留的纹理细节的范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- highpass_samples
    - 高通滤波器应用于图像的次数。通过多次应用滤波器可以增加纹理细节。
    - Comfy dtype: INT
    - Python dtype: int
- highpass_strength
    - 高通滤波器效果的强度。它控制最终图像中纹理细节的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- colorize
    - 一个布尔标志，决定最终图像是否应该上色。设置为 true 时，它应用颜色混合效果以增强视觉吸引力。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: bool

# Output types
- output_image
    - 应用龙过滤器效果后的结果图像。它是一种结合了各种图像处理技术的样式化表示，创造出独特且视觉上吸引人的结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Dragon_Filter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'saturation': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 16.0, 'step': 0.01}), 'contrast': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 16.0, 'step': 0.01}), 'brightness': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 16.0, 'step': 0.01}), 'sharpness': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 6.0, 'step': 0.01}), 'highpass_radius': ('FLOAT', {'default': 6.0, 'min': 0.0, 'max': 255.0, 'step': 0.01}), 'highpass_samples': ('INT', {'default': 1, 'min': 0, 'max': 6.0, 'step': 1}), 'highpass_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 3.0, 'step': 0.01}), 'colorize': (['true', 'false'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'apply_dragan_filter'
    CATEGORY = 'WAS Suite/Image/Filter'

    def apply_dragan_filter(self, image, saturation, contrast, sharpness, brightness, highpass_radius, highpass_samples, highpass_strength, colorize):
        WTools = WAS_Tools_Class()
        tensor_images = []
        for img in image:
            tensor_images.append(pil2tensor(WTools.dragan_filter(tensor2pil(img), saturation, contrast, sharpness, brightness, highpass_radius, highpass_samples, highpass_strength, colorize)))
        tensor_images = torch.cat(tensor_images, dim=0)
        return (tensor_images,)
```