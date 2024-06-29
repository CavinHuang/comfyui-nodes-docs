# Documentation
- Class name: WAS_Image_Analyze
- Category: WAS Suite/Image/Analyze
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Analyze节点旨在执行各种图像分析操作，包括黑白水平调整、RGB通道频率分析和无缝纹理生成。它是一个全面的工具，用于增强图像质量并为进一步处理或可视化准备图像。

# Input types
## Required
- image
    - 输入图像是节点将处理的图像。它作为节点执行的所有分析和转换操作的基本数据。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
## Optional
- mode
    - 模式参数确定要应用于输入图像的特定分析或转换。它影响节点的操作，指导其执行调整黑白水平或分析通道频率等任务。
    - Comfy dtype: COMBO['Black White Levels', 'RGB Levels']
    - Python dtype: str

# Output types
- result_image
    - 结果图像是节点分析或转换过程的输出。它包含了根据指定的模式和参数对输入图像所做的更改。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Analyze:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'mode': (['Black White Levels', 'RGB Levels'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_analyze'
    CATEGORY = 'WAS Suite/Image/Analyze'

    def image_analyze(self, image, mode='Black White Levels'):
        image = tensor2pil(image)
        WTools = WAS_Tools_Class()
        if mode:
            if mode == 'Black White Levels':
                image = WTools.black_white_levels(image)
            elif mode == 'RGB Levels':
                image = WTools.channel_frequency(image)
            else:
                image = image
        return (pil2tensor(image),)
```