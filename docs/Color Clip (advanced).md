
# Documentation
- Class name: Color Clip (advanced)
- Category: Bmad/image
- Output node: False

该节点专门用于根据一组高级标准调整图像中的颜色，包括针对特定颜色进行转换或应用互补色调整的能力。它通过允许对颜色操作进行更细致的控制，扩展了基本的颜色裁剪功能，从而实现高度定制的视觉效果。

# Input types
## Required
- image
    - 待处理进行颜色裁剪的图像。它作为主要输入，用于应用颜色转换，决定了操作的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray
- target
    - 指定图像目标区域所需的颜色转换。它定义了参考色区域应如何被改变。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- complement
    - 决定图像中与参考色不匹配区域的颜色转换。它允许根据颜色匹配对图像区域进行差异化处理。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- color
    - 指导裁剪操作的参考色。用于识别图像中应进行颜色转换的部分。
    - Comfy dtype: COLOR
    - Python dtype: List[int]
## Optional
- color_a
    - 可选的颜色参数，为转换提供额外的颜色选项。它为裁剪操作提供了进一步的定制可能。
    - Comfy dtype: COLOR
    - Python dtype: List[int]
- color_b
    - 另一个可选的颜色参数，为转换提供替代的颜色选项，增强了颜色裁剪过程的灵活性。
    - Comfy dtype: COLOR
    - Python dtype: List[int]

# Output types
- image
    - 颜色裁剪操作后的结果图像。它反映了应用的颜色转换，展示了通过该过程实现的视觉效果。
    - Comfy dtype: IMAGE
    - Python dtype: numpy.ndarray


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ColorClipAdvanced(ColorClip):
    @classmethod
    def INPUT_TYPES(s):
        return super().get_types(advanced=True)

    def color_clip(self, image, color, target, complement, color_a=None, color_b=None):
        image = self.clip(image, color, target, complement, color_a, color_b)
        return (image,)

```
