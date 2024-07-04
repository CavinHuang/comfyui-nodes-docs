
# Documentation
- Class name: RemapInsideParabolasAdvanced
- Category: Bmad/CV/Transform
- Output node: False

RemapInsideParabolasAdvanced节点专门用于基于给定遮罩中两个抛物线的几何形状来重新映射图像。它允许对重映射过程进行高级调整，包括沿曲线方向和正交方向的调整，以及翻转正交方向的选项，从而对重映射输出提供高度的控制能力。

# Input types
## Required
- dst_mask_with_i_parabolas
    - 指定包含两个抛物线的目标遮罩。该遮罩用于指导重映射过程，决定像素如何重新定位。
    - Comfy dtype: MASK
    - Python dtype: numpy.ndarray
- curve_wise_adjust
    - 调整沿抛物线曲线方向的重映射强度，允许对重映射图像中的曲率效果进行更精细的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ortho_wise_adjust
    - 调整正交于抛物线曲线方向的重映射强度，使得能够控制垂直于抛物线曲率的重映射效果的扩散。
    - Comfy dtype: FLOAT
    - Python dtype: float
- flip_ortho
    - 决定是否翻转正交调整方向，为重映射效果提供额外的定制层。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- remap
    - 输出是基于指定抛物线和调整参数的重映射图像。它反映了根据输入参数所指定的像素位置变化，提供原始图像的视觉修改版本。
    - Comfy dtype: REMAP
    - Python dtype: Dict[str, numpy.ndarray]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapInsideParabolasAdvanced(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "dst_mask_with_2_parabolas": ("MASK",),
            "curve_wise_adjust": ("FLOAT", {"default": 1, "min": .3, "max": 2, "step": .01}),
            "ortho_wise_adjust": ("FLOAT", {"default": 1, "min": 1, "max": 3, "step": .01}),
            "flip_ortho": ("BOOLEAN", {"default": False})
        }
        }

    def send_remap(self, dst_mask_with_2_parabolas, curve_wise_adjust, ortho_wise_adjust, flip_ortho):
        from .utils.remaps import remap_inside_parabolas_advanced
        return ({
                    "func": remap_inside_parabolas_advanced,
                    "xargs": [tensor2opencv(dst_mask_with_2_parabolas, 1),
                              curve_wise_adjust, ortho_wise_adjust, flip_ortho],
                    "dims": RemapBase.get_dims(dst_mask_with_2_parabolas)
                },)

```
