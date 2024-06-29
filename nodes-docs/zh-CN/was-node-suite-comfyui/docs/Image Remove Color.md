# Documentation
- Class name: WAS_Image_Remove_Color
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Remove_Color节点旨在根据用户定义的标准处理图像，移除特定颜色。它允许识别并用指定的替换颜色替换目标颜色，以增强图像以供进一步分析或美化用途。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是节点将处理的输入。它决定了颜色移除操作的内容和格式。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- target_red
    - target_red参数指定要移除的颜色的红色分量。它在确定颜色移除过程的准确性中起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- target_green
    - target_green参数定义了要移除的颜色的绿色分量，影响节点隔离和替换目标颜色的能力。
    - Comfy dtype: INT
    - Python dtype: int
- target_blue
    - target_blue参数设置要替换的颜色的蓝色分量，这对于实现颜色移除任务中所需的结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- replace_red
    - replace_red参数确定替换颜色的红色分量，这对于修改后图像的最终外观非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- replace_green
    - replace_green参数设置用于替换目标颜色的颜色的绿色分量，影响节点的输出。
    - Comfy dtype: INT
    - Python dtype: int
- replace_blue
    - replace_blue参数指定将替换原始颜色的颜色的蓝色分量，这对于节点的颜色更改功能至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- clip_threshold
    - clip_threshold参数设定颜色差异的阈值，这对于节点区分目标颜色和其他颜色的能力至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output_image
    - output_image代表已处理的图像，其中指定的颜色已被移除，展示了节点改变视觉内容的能力。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Remove_Color:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'target_red': ('INT', {'default': 255, 'min': 0, 'max': 255, 'step': 1}), 'target_green': ('INT', {'default': 255, 'min': 0, 'max': 255, 'step': 1}), 'target_blue': ('INT', {'default': 255, 'min': 0, 'max': 255, 'step': 1}), 'replace_red': ('INT', {'default': 255, 'min': 0, 'max': 255, 'step': 1}), 'replace_green': ('INT', {'default': 255, 'min': 0, 'max': 255, 'step': 1}), 'replace_blue': ('INT', {'default': 255, 'min': 0, 'max': 255, 'step': 1}), 'clip_threshold': ('INT', {'default': 10, 'min': 0, 'max': 255, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_remove_color'
    CATEGORY = 'WAS Suite/Image/Process'

    def image_remove_color(self, image, clip_threshold=10, target_red=255, target_green=255, target_blue=255, replace_red=255, replace_green=255, replace_blue=255):
        return (pil2tensor(self.apply_remove_color(tensor2pil(image), clip_threshold, (target_red, target_green, target_blue), (replace_red, replace_green, replace_blue))),)

    def apply_remove_color(self, image, threshold=10, color=(255, 255, 255), rep_color=(0, 0, 0)):
        color_image = Image.new('RGB', image.size, color)
        diff_image = ImageChops.difference(image, color_image)
        gray_image = diff_image.convert('L')
        mask_image = gray_image.point(lambda x: 255 if x > threshold else 0)
        mask_image = ImageOps.invert(mask_image)
        result_image = Image.composite(Image.new('RGB', image.size, rep_color), image, mask_image)
        return result_image
```