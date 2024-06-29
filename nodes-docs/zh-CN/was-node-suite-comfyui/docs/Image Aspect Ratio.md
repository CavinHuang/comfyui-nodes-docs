# Documentation
- Class name: WAS_Image_Aspect_Ratio
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Aspect_Ratio节点的`aspect`方法旨在计算并返回图像的多种比例表示形式。它确定图像是横屏还是竖屏模式，并以简化形式提供常见比例。此节点对于图像操作和分析任务至关重要，其中比例考虑是关键。

# Input types
## Optional
- image
    - 'image'参数是一个可选输入，允许节点在没有提供显式尺寸时自动派生图像的宽度和高度。当提供图像张量时，它对于节点准确计算纵横比的能力至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- width
    - 'width'参数是一个可选的数字输入，指定图像的宽度。当没有提供图像张量时，它与'height'参数一起用于计算纵横比。
    - Comfy dtype: NUMBER
    - Python dtype: int
- height
    - 'height'参数是一个可选的数字输入，指定图像的高度。与'width'参数一起，当没有提供图像张量时，它是确定纵横比所必需的。
    - Comfy dtype: NUMBER
    - Python dtype: int

# Output types
- aspect_number
    - 'aspect_number'输出提供了图像的原始数字纵横比，计算为宽度除以高度。
    - Comfy dtype: NUMBER
    - Python dtype: float
- aspect_float
    - 'aspect_float'输出是纵横比的另一种表示形式，也是按宽度除以高度计算的，但作为浮点数返回。
    - Comfy dtype: FLOAT
    - Python dtype: float
- is_landscape_bool
    - 'is_landscape_bool'输出是一个布尔值，指示图像是否处于横屏模式。对于横屏返回1，对于竖屏或正方形纵横比返回0。
    - Comfy dtype: NUMBER
    - Python dtype: int
- aspect_ratio_common
    - 'aspect_ratio_common'输出以简化形式表示图像的常见纵横比，例如'16:9'，这是从宽度和高度的最大公约数派生出来的。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str
- aspect_type
    - 'aspect_type'输出根据计算出的纵横比值描述纵横比的类型，可以是'landscape'（横屏）、'portrait'（竖屏）或'square'（正方形）。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Aspect_Ratio:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'image': ('IMAGE',), 'width': ('NUMBER',), 'height': ('NUMBER',)}}
    RETURN_TYPES = ('NUMBER', 'FLOAT', 'NUMBER', TEXT_TYPE, TEXT_TYPE)
    RETURN_NAMES = ('aspect_number', 'aspect_float', 'is_landscape_bool', 'aspect_ratio_common', 'aspect_type')
    FUNCTION = 'aspect'
    CATEGORY = 'WAS Suite/Logic'

    def aspect(self, boolean=True, image=None, width=None, height=None):
        if width and height:
            width = width
            height = height
        elif image is not None:
            (width, height) = tensor2pil(image).size
        else:
            raise Exception('WAS_Image_Aspect_Ratio must have width and height provided if no image tensori supplied.')
        aspect_ratio = width / height
        aspect_type = 'landscape' if aspect_ratio > 1 else 'portrait' if aspect_ratio < 1 else 'square'
        landscape_bool = 0
        if aspect_type == 'landscape':
            landscape_bool = 1
        gcd = math.gcd(width, height)
        gcd_w = width // gcd
        gcd_h = height // gcd
        aspect_ratio_common = f'{gcd_w}:{gcd_h}'
        return (aspect_ratio, aspect_ratio, landscape_bool, aspect_ratio_common, aspect_type)
```