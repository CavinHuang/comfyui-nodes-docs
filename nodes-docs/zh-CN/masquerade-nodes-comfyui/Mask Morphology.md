# Documentation
- Class name: MaskMorphologyNode
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

MaskMorphologyNode 类旨在对图像掩码执行形态学操作。它提供了膨胀、腐蚀、开运算和闭运算的功能，这些对于图像处理任务（如去噪和特征增强）至关重要。

# Input types
## Required
- image
    - 图像参数是一个张量，表示输入图像掩码。它对节点的操作至关重要，因为形态学变换直接应用于此图像数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- distance
    - 距离参数确定了形态学操作的范围，例如用于膨胀或腐蚀的核的大小。它显著影响节点处理的结果。
    - Comfy dtype: INT
    - Python dtype: int
- op
    - 操作参数指定要执行的形态学操作类型，可以是膨胀、腐蚀、开运算或闭运算。这个选择直接影响应用于图像掩码的转换。
    - Comfy dtype: COMBO['dilate', 'erode', 'open', 'close']
    - Python dtype: str

# Output types
- output_image
    - 输出图像是将选定的形态学操作应用于输入图像的结果。它是原始图像掩码的转换版本，反映了所选操作的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class MaskMorphologyNode:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'distance': ('INT', {'default': 5, 'min': 0, 'max': 128, 'step': 1}), 'op': (['dilate', 'erode', 'open', 'close'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'morph'
    CATEGORY = 'Masquerade Nodes'

    def morph(self, image, distance, op):
        image = tensor2mask(image)
        if op == 'dilate':
            image = self.dilate(image, distance)
        elif op == 'erode':
            image = self.erode(image, distance)
        elif op == 'open':
            image = self.erode(image, distance)
            image = self.dilate(image, distance)
        elif op == 'close':
            image = self.dilate(image, distance)
            image = self.erode(image, distance)
        return (image,)

    def erode(self, image, distance):
        return 1.0 - self.dilate(1.0 - image, distance)

    def dilate(self, image, distance):
        kernel_size = 1 + distance * 2
        image = image.unsqueeze(1)
        out = torchfn.max_pool2d(image, kernel_size=kernel_size, stride=1, padding=kernel_size // 2).squeeze(1)
        return out
```