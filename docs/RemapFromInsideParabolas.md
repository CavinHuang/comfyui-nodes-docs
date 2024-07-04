
# Documentation
- Class name: RemapFromInsideParabolas
- Category: Bmad/CV/Transform
- Output node: False

RemapFromInsideParabolas节点设计用于从两个抛物线内部的视角执行重映射操作，根据指定的抛物线轮廓和尺寸对图像进行变换。它利用几何变换来调整图像的表示，使其与抛物线定义的曲率和方向对齐。

# Input types
## Required
- src_mask_with_i_parabolas
    - 指定包含两个抛物线的源掩码，用于定义变换几何形状。这个掩码对于确定图像如何根据抛物线轮廓进行重映射至关重要。
    - Comfy dtype: MASK
    - Python dtype: numpy.ndarray
- width
    - 定义重映射后输出图像的宽度。此参数允许调整变换后图像的比例。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 指定重映射后输出图像的高度，能够控制变换后图像的垂直比例。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- remap
    - 重映射操作的结果，是一个根据指定抛物线轮廓和尺寸对齐变换后的图像。
    - Comfy dtype: REMAP
    - Python dtype: Tuple[numpy.ndarray, numpy.ndarray, Tuple[int, int, int, int]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapFromInsideParabolas(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "src_mask_with_2_parabolas": ("MASK",),
            "width": ("INT", {"default": 512, "min": 16, "max": 4096}),
            "height": ("INT", {"default": 512, "min": 16, "max": 4096}),
        }
        }

    def send_remap(self, src_mask_with_2_parabolas, width, height):
        from .utils.remaps import remap_from_inside_parabolas
        return ({
                    "func": remap_from_inside_parabolas,
                    "xargs": [tensor2opencv(src_mask_with_2_parabolas, 1), width, height],
                    "dims": (width, height)
                },)

```
