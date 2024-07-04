
# Documentation
- Class name: RemapInsideParabolas
- Category: Bmad/CV/Transform
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

RemapInsideParabolas节点旨在根据图像中两条抛物线的几何形状执行重映射操作。它根据指定的抛物线调整图像像素，目的是以与这些曲线一致的方式转换或校正图像的透视或失真。

# Input types
## Required
- dst_mask_with_i_parabolas
    - 指定包含抛物线的目标蒙版。该蒙版对于确定变换的几何形状和指导重映射过程至关重要。
    - Comfy dtype: MASK
    - Python dtype: numpy.ndarray

# Output types
- remap
    - 输出是输入图像的变换版本，根据指定抛物线的几何形状进行调整。
    - Comfy dtype: REMAP
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapInsideParabolas(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "dst_mask_with_2_parabolas": ("MASK",),
        }
        }

    def send_remap(self, dst_mask_with_2_parabolas):
        from .utils.remaps import remap_inside_parabolas_simple
        return ({
                    "func": remap_inside_parabolas_simple,
                    "xargs": [tensor2opencv(dst_mask_with_2_parabolas, 1)],
                    "dims": RemapBase.get_dims(dst_mask_with_2_parabolas)
                },)

```
