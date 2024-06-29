# Documentation
- Class name: WAS_Image_Gradient_Map
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Gradient_Map 节点旨在对输入图像应用渐变贴图，允许创建视觉上引人注目和多样的颜色效果。它利用 PIL 库处理图像的能力和 numpy 库进行数组操作，实现了高度的灵活性和对图像操作的控制。节点的主要功能是获取输入图像和渐变图像，可选择性地翻转它们，然后产生一个结果，其中渐变根据输入图像的亮度进行映射。这个功能特别适用于生成需要颜色平滑过渡的图像效果，或者用于创建响应底层图像内容的纹理。

# Input types
## Required
- image
    - 输入图像，其颜色将被渐变所替换。此参数至关重要，因为它定义了将经历渐变映射过程的基础图像。节点将以反映此输入图像的亮度值的方式应用渐变。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- gradient_image
    - 将用于映射到输入图像的渐变图像。此图像决定了将应用于输入的颜色过渡。应仔细选择它以确保实现所需的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- flip_left_right
    - 一个布尔标志，设置为 true 时，在处理之前将左右翻转输入和渐变图像。这可以用来在最终输出中创建镜像效果。
    - Comfy dtype: COMBO['false', 'true']
    - Python dtype: bool

# Output types
- output_image
    - 渐变映射过程后的生成图像。此图像显示了输入图像的亮度值转换为渐变图像提供的渐变颜色。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Gradient_Map:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'gradient_image': ('IMAGE',), 'flip_left_right': (['false', 'true'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_gradient_map'
    CATEGORY = 'WAS Suite/Image/Filter'

    def image_gradient_map(self, image, gradient_image, flip_left_right='false'):
        image = tensor2pil(image)
        gradient_image = tensor2pil(gradient_image)
        WTools = WAS_Tools_Class()
        image = WTools.gradient_map(image, gradient_image, True if flip_left_right == 'true' else False)
        return (pil2tensor(image),)
```