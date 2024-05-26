# Documentation
- Class name: GetImageSize_
- Category: ♾️Mixlab/Image
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点旨在提取并可选地调整图像的尺寸，确保其满足最小宽度要求。它处理图像以保持其宽高比，并返回原始尺寸和调整后的尺寸，有助于在工作流中全面了解图像属性。

# Input types
## Required
- image
    - 图像参数是必需的，因为它是节点操作的主要输入。它是节点获取宽度和高度信息的来源，并可能将其调整大小以满足指定的最小宽度标准。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
## Optional
- min_width
    - min_width参数非常重要，因为它设定了图像的最小宽度要求。如果图像的宽度小于这个值，节点将调整图像大小以满足这个标准，确保为进一步的图像处理提供一个一致的起点。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width
    - 宽度输出代表输入图像的原始宽度。这是理解图像尺寸的基础信息，对于任何后续的图像操作或分析都至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度输出对应输入图像的原始高度，为图像大小和宽高比提供重要背景，这对于在处理过程中保持图像完整性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- min_width
    - min_width输出指示调整大小后的图像的最小宽度。它确保图像满足进一步处理或显示所需的尺寸，符合工作流的规范。
    - Comfy dtype: INT
    - Python dtype: int
- min_height
    - min_height输出表示调整大小以满足最小宽度标准后的图像高度。这对于理解图像如何被调整以及确保正确显示或进一步处理非常重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class GetImageSize_:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',)}, 'optional': {'min_width': ('INT', {'default': 512, 'min': 1, 'max': 2048, 'step': 8, 'display': 'number'})}}
    RETURN_TYPES = ('INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('width', 'height', 'min_width', 'min_height')
    FUNCTION = 'get_size'
    CATEGORY = '♾️Mixlab/Image'

    def get_size(self, image, min_width):
        (_, height, width, _) = image.shape
        if min_width > width:
            im = tensor2pil(image)
            im = resize_image(im, 'width', min_width, min_width, 'white')
            im = im.convert('RGB')
            (min_width, min_height) = im.size
        else:
            min_width = width
            min_height = height
        return (width, height, min_width, min_height)
```