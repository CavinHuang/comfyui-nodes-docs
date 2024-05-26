# Documentation
- Class name: NewLayer
- Category: ♾️Mixlab/Layer
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

NewLayer节点旨在根据特定的位置和缩放属性操作和组合图像层。它允许创建一个分层结构，其中每个层可以单独定位并根据提供的参数进行缩放。节点的功能集中在通过精确控制它们的外观和排列，增强视觉展示，从而实现多个图像的叠加。

# Input types
## Required
- x
    - 参数'x'指定了画布内层的水平位置。它至关重要，因为它决定了层从画布左侧的确切放置位置，影响整体构图。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - 参数'y'定义了画布内层的垂直位置。它是决定层从画布顶部如何对齐的关键因素，影响最终的视觉效果。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - 参数'width'设置层的宽度。它在层的缩放中起着重要作用，允许控制视觉内容的水平尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 参数'height'决定了层的垂直尺寸。它对于控制层在垂直轴上的缩放至关重要，影响层的视觉突出程度。
    - Comfy dtype: INT
    - Python dtype: int
- z_index
    - 参数'z_index'建立层相对于其他层的堆叠顺序。值越高，表示该层将放置在其他层的前面，这对于管理层的可见性和深度至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- scale_option
    - 参数'scale_option'决定如何缩放层。它对于保持纵横比或均匀调整层的大小很重要，这可以显著改变视觉输出。
    - Comfy dtype: COMBO['width', 'height', 'overall']
    - Python dtype: str
- image
    - 参数'image'是层的视觉内容来源。它是基本的，因为它提供了将在画布内操作和显示的实际像素。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- mask
    - 可选参数'mask'可以用来定义图像中应该可见或被修改的特定区域。它为图像操作过程增加了复杂性，允许对最终输出进行创造性控制。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- layers
    - 可选参数'layers'允许将额外的现有层包含到组合中。这对于在现有视觉结构上构建或整合多个视觉元素非常有用。
    - Comfy dtype: LAYER
    - Python dtype: List[Dict[str, Union[int, str, torch.Tensor, PIL.Image.Image]]]
- canvas
    - 可选参数'canvas'提供了一个基础图像，层将被放置在该图像上。它对于设置新层将被整合的初始视觉环境很重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image

# Output types
- layers
    - 输出'layers'是代表视觉元素最终组合的层对象集合。它封装了节点操作的结果，详细说明了分层图像的结构和外观。
    - Comfy dtype: LAYER
    - Python dtype: Tuple[List[Dict[str, Union[int, str, torch.Tensor, PIL.Image.Image]]], ...]

# Usage tips
- Infra type: CPU

# Source code
```
class NewLayer:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'x': ('INT', {'default': 0, 'min': -1024, 'max': 8192, 'step': 1, 'display': 'number'}), 'y': ('INT', {'default': 0, 'min': -1024, 'max': 8192, 'step': 1, 'display': 'number'}), 'width': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 1, 'display': 'number'}), 'height': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 1, 'display': 'number'}), 'z_index': ('INT', {'default': 0, 'min': 0, 'max': 100, 'step': 1, 'display': 'number'}), 'scale_option': (['width', 'height', 'overall'],), 'image': ('IMAGE',)}, 'optional': {'mask': ('MASK', {'default': None}), 'layers': ('LAYER', {'default': None}), 'canvas': ('IMAGE', {'default': None})}}
    RETURN_TYPES = ('LAYER',)
    RETURN_NAMES = ('layers',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Layer'
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)

    def run(self, x, y, width, height, z_index, scale_option, image, mask=None, layers=None, canvas=None):
        if mask == None:
            im = tensor2pil(image[0])
            mask = im.convert('L')
            mask = pil2tensor(mask)
        else:
            mask = mask[0]
        layer_n = [{'x': x[0], 'y': y[0], 'width': width[0], 'height': height[0], 'z_index': z_index[0], 'scale_option': scale_option[0], 'image': image[0], 'mask': mask}]
        if layers != None:
            layer_n = layer_n + layers
        return (layer_n,)
```