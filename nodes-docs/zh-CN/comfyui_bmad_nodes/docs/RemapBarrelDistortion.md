
# Documentation
- Class name: RemapBarrelDistortion
- Category: Bmad/CV/Transform
- Output node: False
- Repo Ref: https://github.com/bmad4ever/ComfyUI-Bmad-Custom-Nodes

RemapBarrelDistortion节点用于调整图像，可用于校正桶形失真或引入桶形失真效果。它允许操纵图像几何形状，以纠正通常由相机镜头引起的失真或创造特定的视觉效果。

# Input types
## Required
- a
    - 系数'a'影响应用于图像的失真程度，在桶形失真校正或引入过程中起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 系数'b'与其他系数一起工作，用于微调失真效果，影响图像的曲率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- c
    - 系数'c'是另一个调整失真效果的参数，对图像转换的整体形状和强度有贡献。
    - Comfy dtype: FLOAT
    - Python dtype: float
- use_inverse_variant
    - 这个布尔参数决定是否使用替代公式来计算失真，影响重映射图像的最终外观。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- d
    - 可选系数'd'可用于进一步调整失真效果，提供对图像转换的额外控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- remap
    - 输出是用于将桶形失真效果应用于图像的变换映射，可用于校正或引入失真。
    - Comfy dtype: REMAP
    - Python dtype: Tuple[np.ndarray, np.ndarray, NoneType]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapBarrelDistortion(RemapBase):
    @staticmethod
    def BARREL_DIST_TYPES():
        return {
            "required":
                {
                    "a": ("FLOAT", {"default": 0, "min": -10, "max": 10, "step": 0.00001}),
                    "b": ("FLOAT", {"default": 0, "min": -10, "max": 10, "step": 0.00001}),
                    "c": ("FLOAT", {"default": 0, "min": -10, "max": 10, "step": 0.00001}),
                    "use_inverse_variant": ("BOOLEAN", {"default": True})
                },
            "optional": {
                "d": ("FLOAT", {"forceInput": True})
            }
        }

    @classmethod
    def INPUT_TYPES(s):
        return RemapBarrelDistortion.BARREL_DIST_TYPES()
        # inputs = RemapBarrelDistortion.BARREL_DIST_F_TYPES()
        # inputs["required"]["use_inverse_variant"] = ("BOOLEAN", {"default": True})
        # return inputs

    def send_remap(self, a, b, c, use_inverse_variant, d=None):
        from .utils.remaps import remap_barrel_distortion
        return ({
                    "func": remap_barrel_distortion,
                    "xargs": [a, b, c, d, use_inverse_variant]
                },)

```
