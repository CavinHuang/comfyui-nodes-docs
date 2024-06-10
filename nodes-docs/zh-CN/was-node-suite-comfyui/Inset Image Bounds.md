# Documentation
- Class name: WAS_Inset_Image_Bounds
- Category: WAS Suite/Image/Bound
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Inset_Image_Bounds 节点旨在通过插入值调整图像的边界，确保修改后的图像保持其结构完整性。它通过增加或减少指定的边界来操作，注意验证生成的图像边界是否逻辑上合理，并且不会超过原始尺寸。

# Input types
## Required
- image_bounds
    - image_bounds 参数定义了将要应用插入值的图像的初始边界。这对于确定图像尺寸修改的起始点至关重要。
    - Comfy dtype: IMAGE_BOUNDS
    - Python dtype: List[Tuple[int, int, int, int]]
- inset_left
    - inset_left 参数指定了图像左侧边界应该插入的数量。它在确定处理后图像的新左边缘时起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- inset_right
    - inset_right 参数规定了图像右侧边界应该插入的数量。这对于建立调整后图像的新右边缘很重要。
    - Comfy dtype: INT
    - Python dtype: int
- inset_top
    - inset_top 参数指示了图像顶部边界应该插入的数量。在应用插入后设置图像的新顶部边缘至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- inset_bottom
    - inset_bottom 参数确定图像底部边界应该插入的数量。这对于定义调整后图像的新底部边缘至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- inset_bounds
    - inset_bounds 输出表示应用插入后图像的新边界。它很重要，因为它反映了处理后图像的最终尺寸。
    - Comfy dtype: IMAGE_BOUNDS
    - Python dtype: List[Tuple[int, int, int, int]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Inset_Image_Bounds:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'image_bounds': ('IMAGE_BOUNDS',), 'inset_left': ('INT', {'default': 64, 'min': 0, 'max': 18446744073709551615}), 'inset_right': ('INT', {'default': 64, 'min': 0, 'max': 18446744073709551615}), 'inset_top': ('INT', {'default': 64, 'min': 0, 'max': 18446744073709551615}), 'inset_bottom': ('INT', {'default': 64, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('IMAGE_BOUNDS',)
    FUNCTION = 'inset_image_bounds'
    CATEGORY = 'WAS Suite/Image/Bound'

    def inset_image_bounds(self, image_bounds, inset_left, inset_right, inset_top, inset_bottom):
        inset_bounds = []
        for (rmin, rmax, cmin, cmax) in image_bounds:
            rmin += inset_top
            rmax -= inset_bottom
            cmin += inset_left
            cmax -= inset_right
            if rmin > rmax or cmin > cmax:
                raise ValueError('Invalid insets provided. Please make sure the insets do not exceed the image bounds.')
            inset_bounds.append((rmin, rmax, cmin, cmax))
        return (inset_bounds,)
```