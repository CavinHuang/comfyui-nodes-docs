# Documentation
- Class name: ColorAdjust
- Category: face_parsing
- Output node: False
- Repo Ref: https://github.com/Ryuukeisyou/comfyui_face_parsing

ColorAdjust 节点旨在通过调整图像的对比度、亮度、饱和度、色相和伽马值来修改图像的视觉特征。该节点增强了图像的外观，并可用于纠正或为各种应用风格化视觉输出。

# Input types
## Required
- image
    - 图像参数对于 ColorAdjust 节点至关重要，因为它是将要进行颜色调整的输入。它通过确定节点将处理的基本视觉内容来影响执行。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- contrast
    - 对比度参数允许用户增加或减少图像中最暗和最亮元素之间的差异。它在增强图像的视觉清晰度和深度方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 亮度调整可以使图像看起来更明亮或更暗，这由亮度参数控制。它对于改变视觉内容的整体亮度或暗度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- saturation
    - 饱和度参数控制图像中颜色的强度。对于想要实现更鲜艳或更柔和的调色板的用户来说，它很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- hue
    - 调整色相会使图像中的颜色向色谱的不同部分移动。这个参数在改变视觉内容的整体色调方面起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- gamma
    - 伽马参数影响图像的整体亮度。它特别适用于以非线性方式调整图像的感知亮度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result
    - 结果参数代表 ColorAdjust 节点的输出，即应用了颜色调整的修改后的图像。它很重要，因为它反映了节点处理的最终视觉结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ColorAdjust:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'contrast': ('FLOAT', {'default': 1.0, 'min': 0, 'max': 255, 'step': 0.01, 'round': 0.001, 'display': 'number'}), 'brightness': ('FLOAT', {'default': 1.0, 'min': -255, 'max': 255, 'step': 0.01, 'round': 0.001, 'display': 'number'}), 'saturation': ('FLOAT', {'default': 1.0, 'min': 0, 'max': 255, 'step': 0.01, 'round': 0.001, 'display': 'number'}), 'hue': ('FLOAT', {'default': 0, 'min': -0.5, 'max': 0.5, 'step': 0.001, 'round': 0.001, 'display': 'number'}), 'gamma': ('FLOAT', {'default': 1.0, 'min': 0, 'max': 255, 'step': 0.01, 'round': 0.001, 'display': 'number'})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'main'
    CATEGORY = 'face_parsing'

    def main(self, image: Tensor, contrast: float=1, brightness: float=1, saturation: float=1, hue: float=0, gamma: float=1):
        permutedImage = image.permute(0, 3, 1, 2)
        if contrast != 1:
            permutedImage = functional.adjust_contrast(permutedImage, contrast)
        if brightness != 1:
            permutedImage = functional.adjust_brightness(permutedImage, brightness)
        if saturation != 1:
            permutedImage = functional.adjust_saturation(permutedImage, saturation)
        if hue != 0:
            permutedImage = functional.adjust_hue(permutedImage, hue)
        if gamma != 1:
            permutedImage = functional.adjust_gamma(permutedImage, gamma)
        result = permutedImage.permute(0, 2, 3, 1)
        return (result,)
```