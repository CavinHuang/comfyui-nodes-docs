# Documentation
- Class name: AsciiArt
- Category: postprocessing/Effects
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

AsciiArt节点对输入图像应用ASCII艺术效果，将其转换成使用预定义字符集的样式化表示。它利用像素强度来选择适当的字符，从而创建图像内容的文本表示。

# Input types
## Required
- image
    - 要应用ASCII艺术效果的输入图像。它应该是表示图像数据的张量。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- char_size
    - ASCII艺术表示中使用的字符大小。此参数决定了ASCII艺术效果的粒度。
    - Comfy dtype: int
    - Python dtype: int
- font_size
    - 用于ASCII艺术字符的字体大小。这影响最终ASCII艺术图像的外观。
    - Comfy dtype: int
    - Python dtype: int

# Output types
- result
    - 应用ASCII艺术效果后的结果图像。它是表示输入图像样式化ASCII艺术版本的张量。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class AsciiArt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image': ('IMAGE',), 'char_size': ('INT', {'default': 12, 'min': 0, 'max': 64, 'step': 2}), 'font_size': ('INT', {'default': 12, 'min': 0, 'max': 64, 'step': 2})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'apply_ascii_art_effect'
    CATEGORY = 'postprocessing/Effects'

    def apply_ascii_art_effect(self, image: torch.Tensor, char_size: int, font_size: int):
        (batch_size, height, width, channels) = image.shape
        result = torch.zeros_like(image)
        for b in range(batch_size):
            img_b = image[b] * 255.0
            img_b = Image.fromarray(img_b.numpy().astype('uint8'), 'RGB')
            result_b = ascii_art_effect(img_b, char_size, font_size)
            result_b = torch.tensor(np.array(result_b)) / 255.0
            result[b] = result_b
        return (result,)
```