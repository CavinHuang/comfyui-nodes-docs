# Documentation
- Class name: MixColorByMask
- Category: Masquerade Nodes
- Output node: False
- Repo Ref: https://github.com/BadCafeCode/masquerade-nodes-comfyui

MixColorByMask 节点的 'mix' 方法旨在根据提供的遮罩将输入图像与纯色混合。它通过将图像的颜色通道调整为指定的 RGB 值，然后应用遮罩来选择性地组合原始图像与新颜色层。这个节点特别适用于创建合成图像，在这些图像中，某些区域需要用特定的色调突出或修改。

# Input types
## Required
- image
    - 'image' 参数是要由节点操作的输入图像。它至关重要，因为它是颜色混合操作的基础。节点结合提供的颜色值和遮罩处理此图像，以实现所需的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- r
    - 'r' 参数指定要与图像混合的颜色中的红色通道强度。它在确定将根据遮罩覆盖图像的最终颜色方面起着关键作用。此参数直接影响节点操作的颜色输出。
    - Comfy dtype: INT
    - Python dtype: int
- g
    - 'g' 参数定义颜色覆盖的绿色通道强度。它与红色和蓝色通道一起工作，创建将通过遮罩应用于图像的所需颜色。绿色强度的选择对于实现目标颜色效果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 'b' 参数设置要应用于图像的颜色的蓝色通道强度。它是颜色混合过程中的关键组件，确保颜色混合与创意视觉一致。蓝色通道的值对于准确呈现最终颜色至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- mask
    - 'mask' 参数是一个二进制图像，它指示输入图像的哪些部分将接收颜色覆盖。它是一个关键元素，因为它控制着图像中将受到颜色混合影响的区域。遮罩的模式决定了新颜色将可见的区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- output_image
    - 'output_image' 是颜色混合过程的结果，其中原始图像根据遮罩的指导与指定颜色结合。它代表了节点操作的最终视觉结果，展示了对图像特定区域的颜色创意应用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class MixColorByMask:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'r': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'g': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'b': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'mask': ('IMAGE',)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'mix'
    CATEGORY = 'Masquerade Nodes'

    def mix(self, image, r, g, b, mask):
        (r, g, b) = (r / 255.0, g / 255.0, b / 255.0)
        image_size = image.size()
        image2 = torch.tensor([r, g, b]).to(device=image.device).unsqueeze(0).unsqueeze(0).unsqueeze(0).repeat(image_size[0], image_size[1], image_size[2], 1)
        (image, image2) = tensors2common(image, image2)
        mask = tensor2batch(tensor2mask(mask), image.size())
        return (image * (1.0 - mask) + image2 * mask,)
```