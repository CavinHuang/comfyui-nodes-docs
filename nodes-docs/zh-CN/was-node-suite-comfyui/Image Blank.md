# Documentation
- Class name: WAS_Image_Blank
- Category: WAS Suite/Image
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Blank节点旨在生成具有指定大小和颜色的空白图像。它在创建进一步图像处理任务的视觉画布中发挥着关键作用。该节点对于初始化具有所需尺寸和颜色属性的图像至关重要，然后可以对图像进行操作或用作各种图像相关操作的起点。

# Input types
## Required
- width
    - ‘width’参数定义了要生成的空白图像的宽度。这是一个基本属性，决定了图像的水平范围。‘width’对于设置图像的尺寸以及影响任何后续图像处理的整体组成和布局至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数设置了空白图像的垂直尺寸。它在定义图像的整体形状和结构方面与宽度同等重要。此参数确保生成的图像具有所需的垂直范围，这对于与其它视觉元素对齐或满足特定的显示要求很重要。
    - Comfy dtype: INT
    - Python dtype: int
- red
    - ‘red’参数指定了空白图像中红色通道的强度。它是决定图像整体颜色的关键组成部分。通过调整‘red’值，用户可以创建具有特定红色阴影的图像，这些图像可以用于各种目的，如背景颜色或颜色过滤。
    - Comfy dtype: INT
    - Python dtype: int
- green
    - ‘green’参数控制图像中绿色通道的强度。它与红色和蓝色参数协同工作，产生空白图像的最终颜色。‘green’值对于实现所需的颜色平衡和色调非常重要，这对于某些设计或视觉需求可能是必不可少的。
    - Comfy dtype: INT
    - Python dtype: int
- blue
    - ‘blue’参数决定蓝色通道的强度，有助于形成空白图像的整体颜色。它是颜色混合过程中的一个基本元素，允许用户微调图像的颜色以满足特定的视觉或审美标准。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - ‘IMAGE’输出提供了具有指定尺寸和颜色的生成空白图像。它为任何后续的图像操作或处理任务提供了基础层。这个输出很重要，因为它代表了节点功能的主要结果，准备用于下游工作流程。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Blank:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'width': ('INT', {'default': 512, 'min': 8, 'max': 4096, 'step': 1}), 'height': ('INT', {'default': 512, 'min': 8, 'max': 4096, 'step': 1}), 'red': ('INT', {'default': 255, 'min': 0, 'max': 255, 'step': 1}), 'green': ('INT', {'default': 255, 'min': 0, 'max': 255, 'step': 1}), 'blue': ('INT', {'default': 255, 'min': 0, 'max': 255, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'blank_image'
    CATEGORY = 'WAS Suite/Image'

    def blank_image(self, width, height, red, green, blue):
        width = width // 8 * 8
        height = height // 8 * 8
        blank = Image.new(mode='RGB', size=(width, height), color=(red, green, blue))
        return (pil2tensor(blank),)
```