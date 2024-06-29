# Documentation
- Class name: WAS_Image_Style_Filter
- Category: WAS Suite/Image/Filter
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Style_Filter节点旨在对输入图像应用多种预定义风格，模拟各种模仿流行摄影应用外观的滤镜。它通过根据所选风格调整图像的颜色色调、对比度和其他视觉方面来增强图像，允许在没有详细了解图像处理技术的情况下实现广泛的创意效果。

# Input types
## Required
- image
    - 要应用风格的输入图像。它作为节点执行其风格化操作的基础。图像的内容和属性影响最终的风格化结果，使其成为节点执行的基本参数。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or list[PIL.Image.Image]
- style
    - 要应用于输入图像的风格。每种风格对应一组特定的视觉调整，根据所选的审美标准转换图像。风格的选择至关重要，因为它决定了输出图像的整体外观和感觉。
    - Comfy dtype: COMBO['1977', 'aden', 'brannan', 'brooklyn', 'clarendon', 'earlybird', 'fairy tale', 'gingham', 'hudson', 'inkwell', 'kelvin', 'lark', 'lofi', 'maven', 'mayfair', 'moon', 'nashville', 'perpetua', 'reyes', 'rise', 'slumber', 'stinson', 'toaster', 'valencia', 'walden', 'willow', 'xpro2']
    - Python dtype: str

# Output types
- styled_image
    - 应用风格后的结果是图像。它反映了节点所做的创造性转换，体现了所选风格的视觉效果。此输出很重要，因为它代表了节点功能最终产物。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Style_Filter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'style': (['1977', 'aden', 'brannan', 'brooklyn', 'clarendon', 'earlybird', 'fairy tale', 'gingham', 'hudson', 'inkwell', 'kelvin', 'lark', 'lofi', 'maven', 'mayfair', 'moon', 'nashville', 'perpetua', 'reyes', 'rise', 'slumber', 'stinson', 'toaster', 'valencia', 'walden', 'willow', 'xpro2'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'image_style_filter'
    CATEGORY = 'WAS Suite/Image/Filter'

    def image_style_filter(self, image, style):
        if 'pilgram' not in packages():
            install_package('pilgram')
        import pilgram
        WTools = WAS_Tools_Class()
        tensors = []
        for img in image:
            if style == '1977':
                tensors.append(pil2tensor(pilgram._1977(tensor2pil(img))))
            elif style == 'aden':
                tensors.append(pil2tensor(pilgram.aden(tensor2pil(img))))
            elif style == 'brannan':
                tensors.append(pil2tensor(pilgram.brannan(tensor2pil(img))))
            elif style == 'brooklyn':
                tensors.append(pil2tensor(pilgram.brooklyn(tensor2pil(img))))
            elif style == 'clarendon':
                tensors.append(pil2tensor(pilgram.clarendon(tensor2pil(img))))
            elif style == 'earlybird':
                tensors.append(pil2tensor(pilgram.earlybird(tensor2pil(img))))
            elif style == 'fairy tale':
                tensors.append(pil2tensor(WTools.sparkle(tensor2pil(img))))
            elif style == 'gingham':
                tensors.append(pil2tensor(pilgram.gingham(tensor2pil(img))))
            elif style == 'hudson':
                tensors.append(pil2tensor(pilgram.hudson(tensor2pil(img))))
            elif style == 'inkwell':
                tensors.append(pil2tensor(pilgram.inkwell(tensor2pil(img))))
            elif style == 'kelvin':
                tensors.append(pil2tensor(pilgram.kelvin(tensor2pil(img))))
            elif style == 'lark':
                tensors.append(pil2tensor(pilgram.lark(tensor2pil(img))))
            elif style == 'lofi':
                tensors.append(pil2tensor(pilgram.lofi(tensor2pil(img))))
            elif style == 'maven':
                tensors.append(pil2tensor(pilgram.maven(tensor2pil(img))))
            elif style == 'mayfair':
                tensors.append(pil2tensor(pilgram.mayfair(tensor2pil(img))))
            elif style == 'moon':
                tensors.append(pil2tensor(pilgram.moon(tensor2pil(img))))
            elif style == 'nashville':
                tensors.append(pil2tensor(pilgram.nashville(tensor2pil(img))))
            elif style == 'perpetua':
                tensors.append(pil2tensor(pilgram.perpetua(tensor2pil(img))))
            elif style == 'reyes':
                tensors.append(pil2tensor(pilgram.reyes(tensor2pil(img))))
            elif style == 'rise':
                tensors.append(pil2tensor(pilgram.rise(tensor2pil(img))))
            elif style == 'slumber':
                tensors.append(pil2tensor(pilgram.slumber(tensor2pil(img))))
            elif style == 'stinson':
                tensors.append(pil2tensor(pilgram.stinson(tensor2pil(img))))
            elif style == 'toaster':
                tensors.append(pil2tensor(pilgram.toaster(tensor2pil(img))))
            elif style == 'valencia':
                tensors.append(pil2tensor(pilgram.valencia(tensor2pil(img))))
            elif style == 'walden':
                tensors.append(pil2tensor(pilgram.walden(tensor2pil(img))))
            elif style == 'willow':
                tensors.append(pil2tensor(pilgram.willow(tensor2pil(img))))
            elif style == 'xpro2':
                tensors.append(pil2tensor(pilgram.xpro2(tensor2pil(img))))
            else:
                tensors.append(img)
        tensors = torch.cat(tensors, dim=0)
        return (tensors,)
```