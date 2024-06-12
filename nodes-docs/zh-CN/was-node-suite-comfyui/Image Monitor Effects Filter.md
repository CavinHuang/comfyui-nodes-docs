# Documentation
- Class name: WAS_Image_Monitor_Distortion_Filter
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Monitor_Distortion_Filter 节点旨在对图像应用各种失真效果，模拟不同类型的监视器或信号失真。它根据所选模式处理输入图像，可以是'Digital Distortion'、'Signal Distortion'或'TV Distortion'，并使用振幅和偏移等参数来控制失真的强度。该节点非常多功能，适用于从视觉效果到艺术图像转换的广泛应用。

# Input types
## Required
- image
    - 将要经历失真处理的输入图像。它作为节点应用所选失真效果的基础，其质量和特性对最终输出有显著影响。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- mode
    - 确定要应用于图像的失真效果类型。每种模式代表不同的失真风格，影响处理后图像的整体外观和感觉。
    - Comfy dtype: COMBO['Digital Distortion', 'Signal Distortion', 'TV Distortion']
    - Python dtype: str
- amplitude
    - 控制失真效果的强度。较高的振幅值会导致更明显的失真，而较低的值则产生更微妙的效果。
    - Comfy dtype: INT
    - Python dtype: int
- offset
    - 调整失真效果的位置，允许微调失真的外观。它移动失真图案，可以改变最终结果的视觉动态。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是经过处理的图像，应用了失真效果。它反映了输入图像的特性，同时展示了所选择的失真风格，可供进一步使用或展示。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Monitor_Distortion_Filter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'mode': (['Digital Distortion', 'Signal Distortion', 'TV Distortion'],), 'amplitude': ('INT', {'default': 5, 'min': 1, 'max': 255, 'step': 1}), 'offset': ('INT', {'default': 10, 'min': 1, 'max': 255, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'image_monitor_filters'
    CATEGORY = 'WAS Suite/Image/Filter'

    def image_monitor_filters(self, image, mode='Digital Distortion', amplitude=5, offset=5):
        image = tensor2pil(image)
        WTools = WAS_Tools_Class()
        if mode:
            if mode == 'Digital Distortion':
                image = WTools.digital_distortion(image, amplitude, offset)
            elif mode == 'Signal Distortion':
                image = WTools.signal_distortion(image, amplitude)
            elif mode == 'TV Distortion':
                image = WTools.tv_vhs_distortion(image, amplitude)
            else:
                image = image
        return (pil2tensor(image),)
```