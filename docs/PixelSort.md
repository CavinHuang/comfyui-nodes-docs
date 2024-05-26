# Documentation
- Class name: PixelSort
- Category: postprocessing/Effects
- Output node: False
- Repo Ref: https://github.com/EllangoK/ComfyUI-post-processing-nodes

PixelSort节点为图像引入了创造性的像素排序效果，根据指定的标准如色相、饱和度或明度，重新组织像素数据，增强图像的视觉冲击力。

# Input types
## Required
- image
    - 图像参数是必需的，因为它提供了像素排序过程的源数据，影响最终输出的外观。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 掩码参数对于定义应该受到像素排序效果影响的图像区域至关重要，从而控制变换的范围。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- direction
    - 方向参数决定了像素排序的轴向，可以是水平或垂直，影响效果的整体模式。
    - Comfy dtype: COMBO['horizontal', 'vertical']
    - Python dtype: str
- sort_by
    - sort_by参数决定了像素排序的标准，如色相、饱和度或明度，塑造效果的最终视觉结果。
    - Comfy dtype: COMBO['hue', 'saturation', 'value']
    - Python dtype: str
- order
    - 顺序参数指定了排序的方向，无论是升序（向前）还是降序（向后），改变了像素的排列。
    - Comfy dtype: COMBO['forward', 'backward']
    - Python dtype: str
## Optional
- span_limit
    - 跨度限制参数通过控制每个方向上的跨度数量来细化排序，影响像素排序效果的粒度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出图像是像素排序过程的结果，反映了应用于输入图像的创造性变换。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class PixelSort:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'mask': ('IMAGE',), 'direction': (['horizontal', 'vertical'],), 'span_limit': ('INT', {'default': None, 'min': 0, 'max': 100, 'step': 5}), 'sort_by': (['hue', 'saturation', 'value'],), 'order': (['forward', 'backward'],)}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'sort_pixels'
    CATEGORY = 'postprocessing/Effects'

    def sort_pixels(self, image: torch.Tensor, mask: torch.Tensor, direction: str, span_limit: int, sort_by: str, order: str):
        horizontal_sort = direction == 'horizontal'
        reverse_sorting = order == 'backward'
        sort_by = sort_by[0].upper()
        span_limit = span_limit if span_limit > 0 else None
        batch_size = image.shape[0]
        result = torch.zeros_like(image)
        for b in range(batch_size):
            tensor_img = image[b].numpy()
            tensor_mask = mask[b].numpy()
            sorted_image = pixel_sort(tensor_img, tensor_mask, horizontal_sort, span_limit, sort_by, reverse_sorting)
            result[b] = torch.from_numpy(sorted_image)
        return (result,)
```