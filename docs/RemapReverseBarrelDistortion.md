
# Documentation
- Class name: RemapReverseBarrelDistortion
- Category: Bmad/CV/Transform
- Output node: False
- Repo Ref: https://github.com/Suzie1/ComfyUI_Bmad_Nodes

RemapReverseBarrelDistortion节点旨在对图像应用反向桶形畸变效果。它利用参数来调整畸变效果，从而校正因镜头不完美而产生桶形畸变的图像。这种校正可以有效地消除由于广角镜头或其他光学元件引起的图像变形，使图像恢复到更加自然和准确的状态。

# Input types
## Required
- a
    - 系数'a'影响主要的畸变效果，在反向桶形畸变校正过程中起着至关重要的作用。它的值直接改变图像的曲率，影响所应用校正的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 系数'b'与'a'和'c'一起修改畸变效果，有助于微调反向桶形畸变。它调整中程畸变，平衡中心和边缘之间的校正。
    - Comfy dtype: FLOAT
    - Python dtype: float
- c
    - 系数'c'与'a'和'b'协同工作以调整畸变效果，对于实现所需的反向桶形畸变校正至关重要。它主要影响边缘畸变，微调校正的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- use_inverse_variant
    - 这个布尔参数决定是否使用畸变公式的反向变体，影响整体畸变校正。选择反向变体可以改变校正方法，可能导致不同的视觉效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- d
    - 一个可选的系数，进一步细化畸变效果，为反向桶形畸变校正提供额外的控制。当指定时，它为校正过程提供更高程度的自定义。
    - Comfy dtype: FLOAT
    - Python dtype: float | None

# Output types
- remap
    - 输出是一个重新映射的图像，其中应用了反向桶形畸变，校正了原始畸变。这个处理后的图像应该显示出更直的线条和更准确的几何形状，特别是在图像的边缘区域。
    - Comfy dtype: REMAP
    - Python dtype: ndarray


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapReverseBarrelDistortion(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return RemapBarrelDistortion.BARREL_DIST_TYPES()

    def send_remap(self, a, b, c, use_inverse_variant, d=None):
        from .utils.remaps import remap_reverse_barrel_distortion
        return ({
                    "func": remap_reverse_barrel_distortion,
                    "xargs": [a, b, c, d, use_inverse_variant]
                },)

```
