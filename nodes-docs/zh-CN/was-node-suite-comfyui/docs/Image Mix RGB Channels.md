# Documentation
- Class name: WAS_Image_RGB_Merge
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_RGB_Merge节点旨在将单独的彩色通道合并为单个RGB图像。它通过合并红色、绿色和蓝色通道来生成全彩图像，从而在图像处理中发挥关键作用，增强了进一步分析或显示时的视觉输出。

# Input types
## Required
- red_channel
    - red_channel参数至关重要，因为它代表了最终RGB图像的红色分量。它显著影响合并图像的色平衡和整体外观，对节点的核心功能做出了贡献。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- green_channel
    - green_channel参数对于创建RGB图像至关重要，因为它决定了绿色分量。它对于实现所需的颜色表示和最终输出的视觉质量是不可或缺的。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- blue_channel
    - blue_channel参数定义了RGB图像的蓝色分量。它是节点操作中的关键元素，确保了正确的色调，并增强了最终合并结果中的图像现实感。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Output types
- merged_image
    - merged_image输出参数代表了节点的最终产品，一个完全合并的RGB图像。它很重要，因为它概括了节点的目的，以连贯且视觉上令人愉悦的方式展示了组合的视觉数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_RGB_Merge:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'red_channel': ('IMAGE',), 'green_channel': ('IMAGE',), 'blue_channel': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'merge_channels'
    CATEGORY = 'WAS Suite/Image/Process'

    def merge_channels(self, red_channel, green_channel, blue_channel):
        image = self.mix_rgb_channels(tensor2pil(red_channel).convert('L'), tensor2pil(green_channel).convert('L'), tensor2pil(blue_channel).convert('L'))
        return (pil2tensor(image),)

    def mix_rgb_channels(self, red, green, blue):
        (width, height) = red.size
        merged_img = Image.new('RGB', (width, height))
        merged_img = Image.merge('RGB', (red, green, blue))
        return merged_img
```