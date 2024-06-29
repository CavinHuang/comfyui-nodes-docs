# Documentation
- Class name: WAS_Image_Make_Seamless
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

make_seamless 方法旨在处理一组图像，将它们转换成无缝纹理。它通过对图像边缘应用混合技术来实现这一点，经过处理的图像可以平铺而不显示可见的接缝。这个功能特别适用于创建可以在游戏开发、合成和3D建模等各种图形应用程序中使用的纹理。

# Input types
## Required
- images
    - 需要被处理成无缝纹理的输入图像。这些图像是节点将要处理以创建无缝输出的原始材料。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]
- blending
    - 混合因子决定了要在图像边缘应用的混合程度。值越高，过渡越平滑，但同时也会减小图像大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- tiled
    - tiled 参数指示输出应该是单个无缝图像还是2x2平铺版本，以便更好地可视化无缝效果。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: bool
- tiles
    - 平铺输出中每个方向（水平和垂直）上的平铺数量。当 tiled 参数设置为 true 时使用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- images
    - 处理后的无缝纹理图像结果。这些图像可以平铺而不显示可见的接缝，使它们适合在各种图形应用程序中使用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Make_Seamless:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'blending': ('FLOAT', {'default': 0.4, 'max': 1.0, 'min': 0.0, 'step': 0.01}), 'tiled': (['true', 'false'],), 'tiles': ('INT', {'default': 2, 'max': 6, 'min': 2, 'step': 2})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('images',)
    FUNCTION = 'make_seamless'
    CATEGORY = 'WAS Suite/Image/Process'

    def make_seamless(self, images, blending, tiled, tiles):
        WTools = WAS_Tools_Class()
        seamless_images = []
        for image in images:
            seamless_images.append(pil2tensor(WTools.make_seamless(tensor2pil(image), blending, tiled, tiles)))
        seamless_images = torch.cat(seamless_images, dim=0)
        return (seamless_images,)
```