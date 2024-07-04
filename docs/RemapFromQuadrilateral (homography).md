
# Documentation
- Class name: RemapFromQuadrilateral (homography)
- Category: Bmad/CV/Transform
- Output node: False

RemapFromQuadrilateral节点旨在通过使用单应性变换将图像从指定的四边形形状重新映射到矩形形状。这个过程涉及基于源图像的四边形点和目标矩形的尺寸计算单应性矩阵，从而实现图像的透视校正或变换。

# Input types
## Required
- src_mask_with_i_points
    - 指定带有四个定义待变换四边形的点的源图像掩码。这个输入对于确定用于单应性计算的四边形角点至关重要。
    - Comfy dtype: MASK
    - Python dtype: ndarray
- width
    - 定义目标矩形的宽度。这个参数影响变换后图像的比例和宽高比。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 定义目标矩形的高度。与宽度一起，它决定了变换后输出图像的大小和形状。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- remap
    - 输出是经过变换的图像数据，基于计算得到的单应性矩阵，将指定的四边形重新映射为矩形形状。这种变换允许对图像的外观进行透视校正或其他调整。
    - Comfy dtype: REMAP
    - Python dtype: ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapFromQuadrilateral(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "src_mask_with_4_points": ("MASK",),
            # "mode": (s.modes_list, {"default": s.modes_list[0]}),
            "width": ("INT", {"default": 512, "min": 16, "max": 4096}),
            "height": ("INT", {"default": 512, "min": 16, "max": 4096}),
        }
        }

    @staticmethod
    def homography(*args):
        ret, mask, bb = RemapQuadrilateral.homography(*args)
        return ret, mask, None

    def send_remap(self, src_mask_with_4_points, width, height):
        from .utils.remaps import remap_from_quadrilateral
        remap_data = {
            "func": remap_from_quadrilateral,
            "xargs": [tensor2opencv(src_mask_with_4_points, 1), width, height],
            "dims": (width, height),  # seems kinda redundant, not sure if should refactor
            "custom": RemapFromQuadrilateral.homography
        }
        return (remap_data,)

```
