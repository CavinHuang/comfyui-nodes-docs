
# Documentation
- Class name: Color Clip
- Category: Bmad/image
- Output node: False

Color Clip节点旨在根据特定的目标和补充操作修改图像中的颜色，可能还会使用额外的颜色参数进行高级调整。它抽象了颜色操作的复杂性，提供了一种简单直接的方式来实现所需的视觉效果。

# Input types
## Required
- image
    - 待处理的图像是颜色操作的主要输入，决定了节点的视觉输出。图像颜色的变化直接受到指定的操作和颜色参数的影响。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- target
    - 指定颜色操作的目标，如转换为黑色或白色，或不做任何改变。它定义了对图像颜色执行的主要操作，直接影响视觉效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- complement
    - 定义与目标互补的操作，提供额外的颜色调整层。该参数与目标配合使用，用于细化实现的颜色效果，影响图像的最终外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- color
    - 用于图像操作的基础颜色。它在决定颜色裁剪操作的结果中起着关键作用，因为它为颜色调整设置了参考标准。
    - Comfy dtype: COLOR
    - Python dtype: List[int]

# Output types
- image
    - 颜色操作后的结果图像。它反映了基于指定的目标、补充和颜色参数所做的更改，展示了应用的操作和调整的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorClipSimple(ColorClip):
    @classmethod
    def INPUT_TYPES(s):
        return super().get_types(advanced=False)

    def color_clip(self, image, color, target, complement):
        image = self.clip(image, color, target, complement)
        return (image,)

```
